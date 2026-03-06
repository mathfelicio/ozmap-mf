import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { firstValueFrom } from "rxjs";
import { CreateBoxCommand } from "../../../boxes/application/commands/create-box.command";
import { CreateCableCommand } from "../../../cables/application/commands/create-cable.command";
import { CreateCustomerCommand } from "../../../customers/application/commands/create-customer.command";
import { CreateDropCableCommand } from "../../../drop-cables/application/commands/create-drop-cable.command";
import { RunOzmapSyncCommand } from "../commands/run-ozmap-sync.command";
import { IspBoxResponse } from "../../infrastructure/interfaces/isp-box-response.interface";
import { IspCableResponse } from "../../infrastructure/interfaces/isp-cable-response.interface";
import { IspCustomerResponse } from "../../infrastructure/interfaces/isp-customer-response.interface";
import { IspDropCableResponse } from "../../infrastructure/interfaces/isp-drop-cable-response.interface";

@Injectable()
export class RunIspSyncUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly httpService: HttpService,
  ) {}

  async execute(): Promise<void> {
    const ispApiBaseUrl =
      process.env.ISP_API_BASE_URL ?? "http://isp-mock:4000";

    const { data: boxResponses } = await firstValueFrom(
      this.httpService.get<IspBoxResponse[]>(`${ispApiBaseUrl}/boxes`),
    );

    const boxes = await this.commandBus.execute(
      new CreateBoxCommand(boxResponses),
    );

    const { data: cableResponses } = await firstValueFrom(
      this.httpService.get<IspCableResponse[]>(`${ispApiBaseUrl}/cables`),
    );

    const cables = await this.commandBus.execute(
      new CreateCableCommand(cableResponses),
    );

    const { data: customerResponses } = await firstValueFrom(
      this.httpService.get<IspCustomerResponse[]>(`${ispApiBaseUrl}/customers`),
    );

    const customers = await this.commandBus.execute(
      new CreateCustomerCommand(customerResponses),
    );

    const { data: dropCableResponses } = await firstValueFrom(
      this.httpService.get<IspDropCableResponse[]>(
        `${ispApiBaseUrl}/drop_cables`,
      ),
    );

    const dropCables = await this.commandBus.execute(
      new CreateDropCableCommand(dropCableResponses),
    );

    await this.commandBus.execute(
      new RunOzmapSyncCommand({
        boxes,
        cables,
        customers,
        dropCables,
      }),
    );
  }
}
