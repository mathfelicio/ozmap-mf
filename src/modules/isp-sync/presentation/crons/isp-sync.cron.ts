import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RunIspSyncCommand } from "../../application/commands/run-isp-sync.command";

@Injectable()
export class IspSyncCron {
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    await this.commandBus.execute(new RunIspSyncCommand("cron"));
    console.log("Cron executed successfully.");
  }
}
