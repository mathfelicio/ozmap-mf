# Teste Técnico OZmap - Ambiente Docker

Este repositório contém um ambiente Docker para executar o teste técnico de integração de dados ISP com OZmap.

## Serviços do `docker-compose`

- `app`: serviço Node.js + TypeScript para sincronização periódica.
- `isp-mock`: API mock do ISP com `json-server` (porta `4000`).
- `ozmap-mock`: API mock do OZmap (porta `5000`).
- `mongodb`: persistência de fila de falhas/retries (porta `27017`).
- `mysql`: banco relacional principal (porta `3306` no container, `5484` no host).

## Pré-requisitos

- Docker
- Docker Compose

## Comandos

Modo desenvolvimento (`yarn dev` no container da app):

```bash
./app dev
```

**Importante:** Na primeira execução do projeto, após iniciar o ambiente com `./app dev`, é necessário rodar as migrations do banco de dados:

```bash
./app yarn typeorm migration:run
```

## Endpoints úteis

- ISP Mock boxes: `http://localhost:4000/boxes`
- ISP Mock cables: `http://localhost:4000/cables`
- ISP Mock customers: `http://localhost:4000/customers`
- ISP Mock drop_cables: `http://localhost:4000/drop_cables`

## Variáveis de ambiente da app

Definidas no `docker-compose.yml`:

- `NODE_ENV=development`
- `PORT=3050`
- `ISP_API_BASE_URL=http://isp-mock:4000`
- `OZMAP_API_BASE_URL=http://ozmap-mock:5000`
- `MONGODB_URI=mongodb://root:root@mongodb:27017/ozmap_integration?authSource=admin`
- `DATABASE_URL=mysql://root:root@mysql:3306/ozmap_integration`
- `DB_HOST=mysql`
- `DB_PORT=3306`
- `DB_USERNAME=root`
- `DB_PASSWORD=root`
- `DB_DATABASE=ozmap_integration`
- `SYNC_INTERVAL_SECONDS=60`
- `ISP_RATE_LIMIT_PER_MINUTE=50`

## Arquitetura do Projeto

A arquitetura detalhada pode ser encontrada no arquivo [ARCHITECTURE.md](ARCHITECTURE.md).

### Visão Geral

O projeto utiliza uma arquitetura modular em NestJS, seguindo os princípios de separação de responsabilidades em camadas (Apresentação, Aplicação, Domínio e Infraestrutura) e o padrão CQRS para manipulação de comandos.

#### Camadas e Módulos

```mermaid
graph TD
    Presentation[Camada de Apresentação<br/>Crons]
    Application[Camada de Aplicação<br/>Casos de Uso e Command Handlers]
    Domain[Camada de Domínio<br/>Entidades e Contratos de Repositório]
    Infrastructure[Camada de Infraestrutura<br/>TypeORM, Mapeadores e Integrações Externas]

    Presentation --> Application
    Application --> Domain
    Infrastructure -. implementa .-> Domain
    Infrastructure --> Application
```

### Fluxo de Sincronização

1. **Agendamento**: O `IspSyncCron` dispara o processo periodicamente.
2. **Coleta**: O `RunIspSyncUseCase` busca dados da API do ISP.
3. **Persistência**: Os dados são processados e salvos no MySQL (TypeORM).
4. **Integração**: O `RunOzmapSyncUseCase` coordena o envio sequencial para o OZmap (`Boxes` -> `Cables` -> `Customers` -> `Drop Cables`).

### Tecnologias e Ferramentas

- **NestJS**: Framework principal.
- **TypeORM**: Abstração de banco de dados para MySQL e MongoDB.
- **OZMap SDK**: Integração oficial com a API do OZMap.
- **CQRS**: Organização da lógica de escrita/comandos.
- **Docker**: Containerização de todo o ambiente de desenvolvimento e serviços.

## Estrutura

```text
.
|-- ARCHITECTURE.md
|-- Dockerfile
|-- docker-compose.yml
|-- app
|-- src/
|   |-- app.module.ts
|   |-- main.ts
|   |-- database/
|   `-- modules/
|       |-- isp-sync/
|       |-- ozm-sdk/
|       |-- boxes/
|       |-- cables/
|       |-- customers/
|       |-- drop-cables/
|       `-- failure-handler/
`-- mocks/
    |-- isp/db.json
    `-- ozmap/
        |-- db.json
        `-- server.js
```

## Observações do teste

- A integração com o OZmap usa o `@ozmap/ozmap-sdk`, com autenticação no módulo `ozm-sdk`.
- O fluxo principal de sincronização (ISP -> MySQL -> OZmap) está funcional para `boxes`, `cables`, `customers` e `drop-cables`.
- O `failure-handler` foi desenhado para retries centralizados: quando uma chamada para a API OZmap falhar, o erro deve ser gravado no MongoDB (`failure_queue`) e reprocessado; ao esgotar tentativas, deve ir para `failure_dead_letter`.
- Esse fluxo completo do `failure-handler` ficou pendente por falta de tempo.
