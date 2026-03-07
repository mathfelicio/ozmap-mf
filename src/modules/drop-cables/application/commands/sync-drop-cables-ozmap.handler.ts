import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SyncDropCablesOzmapUseCase } from "../use-cases/sync-drop-cables-ozmap.use-case";
import { SyncDropCablesOzmapCommand } from "./sync-drop-cables-ozmap.command";

@CommandHandler(SyncDropCablesOzmapCommand)
export class SyncDropCablesOzmapHandler implements ICommandHandler<
  SyncDropCablesOzmapCommand,
  void
> {
  constructor(
    private readonly syncDropCablesOzmapUseCase: SyncDropCablesOzmapUseCase,
  ) {}

  async execute(command: SyncDropCablesOzmapCommand): Promise<void> {
    await this.syncDropCablesOzmapUseCase.execute(command.payload);
  }
}
