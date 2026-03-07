# Arquitetura do Projeto

Este documento descreve a arquitetura atual do **ozmap-mf**.

## Visao Geral do Sistema

O projeto usa arquitetura modular em NestJS, com separacao por camadas (Apresentacao, Aplicacao, Dominio e Infraestrutura), CQRS para comandos e execucao agendada com `@nestjs/schedule`.

### Diagrama 1: Camadas

```mermaid
graph TD
    Presentation[Camada de Apresentacao<br/>Crons]
    Application[Camada de Aplicacao<br/>Casos de Uso e Command Handlers]
    Domain[Camada de Dominio<br/>Entidades e Contratos de Repositorio]
    Infrastructure[Camada de Infraestrutura<br/>TypeORM, Mapeadores e Integracoes Externas]

    Presentation --> Application
    Application --> Domain
    Infrastructure -. implementa .-> Domain
    Infrastructure --> Application
```

### Diagrama 2: Modulos e Integracoes

```mermaid
graph TD
    subgraph ModulosDeNegocio [Modulos de Negocio]
        direction LR
        Boxes[Modulo de Boxes]
        Cables[Modulo de Cables]
        Customers[Modulo de Customers]
        DropCables[Modulo de Drop Cables]
    end

    subgraph Orquestracao [Orquestracao e Integracao]
        IspSync[Modulo IspSync]
        OzmSdk[Modulo OzmSdk]
    end

    AppModule[AppModule]
    Cqrs[CQRS]
    Schedule[Agendador]
    Mysql[(MySQL + TypeORM)]
    Mongo[(MongoDB + TypeORM)]
    IspApi[(ISP API)]
    Ozmap[(OZmap API)]

    AppModule --> IspSync
    AppModule --> OzmSdk
    AppModule --> Boxes
    AppModule --> Cables
    AppModule --> Customers
    AppModule --> DropCables
    AppModule --> Cqrs
    AppModule --> Schedule
    AppModule --> Mysql
    AppModule --> Mongo

    IspSync --> IspApi
    IspSync --> Boxes
    IspSync --> Cables
    IspSync --> Customers
    IspSync --> DropCables
    IspSync --> OzmSdk

    OzmSdk --> Ozmap
    Boxes --> Ozmap
    Cables --> Ozmap
    Customers --> Ozmap
    DropCables --> Ozmap
```

## Fluxo Principal de Sincronizacao

1. `IspSyncCron` dispara `RunIspSyncCommand` a cada **10 segundos**.
2. `RunIspSyncUseCase` consulta ISP API (`boxes`, `cables`, `customers`, `drop_cables`).
3. Cada modulo de dominio executa persistencia/upsert no MySQL.
4. `RunOzmapSyncUseCase` dispara sincronizacao para OZmap em sequencia: `SyncBoxesOzmapCommand` -> `SyncCablesOzmapCommand` -> `SyncCustomersOzmapCommand` -> `SyncDropCablesOzmapCommand`.

## Modulos e Responsabilidades

- `isp-sync`: orquestra a importacao do ISP e aciona o sync OZmap.
- `boxes`: persiste boxes e sincroniza com OZmap.
- `cables`: persiste cabos, relaciona N:N com boxes (`cable_boxes_connected`) e sincroniza com OZmap.
- `customers`: persiste clientes e sincroniza com OZmap.
- `drop-cables`: persiste drop cables e sincroniza com OZmap.
- `ozm-sdk`: encapsula autenticacao/acesso ao SDK da OZmap.
- `failure-handler`: no contexto do teste, a proposta e resolver o problema de retries. Toda vez que uma conversa com a API da OZmap falhar, o erro deve ser gravado no MongoDB (`failure_queue`), e o modulo deve reprocessar as tentativas; ao esgotar o limite, deve mover para `failure_dead_letter`. Esse fluxo foi desenhado, mas nao foi implementado por falta de tempo.

## Persistencia e Relacionamentos

- MySQL (via TypeORM): tabelas principais `boxes`, `cables`, `customers`, `drop_cables`, `cable_boxes_connected`.
- Relacoes de dominio: `Box` 1:N `Customer`, `Box` 1:N `DropCable`, `Customer` 1:N `DropCable`, `Cable` N:N `Box`.
- MongoDB (via TypeORM): colecoes de falhas `failure_queue` e `failure_dead_letter`.

## Observacoes Atuais

- O `AppModule` sobe duas conexoes TypeORM: MySQL (default) e MongoDB (`name: "mongodb"`).
- O fluxo principal atual e orientado a `cron + command bus`; nao ha controllers HTTP expostos no `src`.
- Sincronizacao OZmap ja esta implementada para os quatro dominios: `boxes`, `cables`, `customers` e `drop-cables`.
- O `failure-handler` esta previsto para tratar falhas de integracao com a OZmap API, registrando erros no MongoDB e executando retries de forma centralizada, mas ficou pendente por falta de tempo.
