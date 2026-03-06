import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SyncCablesOzmapUseCase } from "../use-cases/sync-cables-ozmap.use-case";
import { SyncCablesOzmapCommand } from "./sync-cables-ozmap.command";

@CommandHandler(SyncCablesOzmapCommand)
export class SyncCablesOzmapHandler implements ICommandHandler<
  SyncCablesOzmapCommand,
  void
> {
  constructor(
    private readonly syncCablesOzmapUseCase: SyncCablesOzmapUseCase,
  ) {}

  async execute(command: SyncCablesOzmapCommand): Promise<void> {
    await this.syncCablesOzmapUseCase.execute(command.payload);
  }
}
