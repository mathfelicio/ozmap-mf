import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RunOzmapSyncUseCase } from "../use-cases/run-ozmap-sync.use-case";
import { RunOzmapSyncCommand } from "./run-ozmap-sync.command";

@CommandHandler(RunOzmapSyncCommand)
export class RunOzmapSyncHandler implements ICommandHandler<
  RunOzmapSyncCommand,
  void
> {
  constructor(private readonly runOzmapSyncUseCase: RunOzmapSyncUseCase) {}

  async execute(command: RunOzmapSyncCommand): Promise<void> {
    await this.runOzmapSyncUseCase.execute(command.payload);
  }
}
