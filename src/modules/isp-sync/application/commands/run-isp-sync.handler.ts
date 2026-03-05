import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RunIspSyncUseCase } from "../use-cases/run-isp-sync.use-case";
import { RunIspSyncCommand } from "./run-isp-sync.command";

@CommandHandler(RunIspSyncCommand)
export class RunIspSyncHandler implements ICommandHandler<
  RunIspSyncCommand,
  void
> {
  constructor(private readonly runIspSyncUseCase: RunIspSyncUseCase) {}

  async execute(_: RunIspSyncCommand): Promise<void> {
    await this.runIspSyncUseCase.execute();
  }
}
