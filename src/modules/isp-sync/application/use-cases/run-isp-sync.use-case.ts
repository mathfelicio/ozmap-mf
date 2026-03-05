import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { firstValueFrom } from "rxjs";
import { CreateBoxCommand } from "../../../boxes/application/commands/create-box.command";
import { IspBoxResponse } from "../../infrastructure/interfaces/isp-box-response.interface";

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

    await this.commandBus.execute(new CreateBoxCommand(boxResponses));
  }
}
