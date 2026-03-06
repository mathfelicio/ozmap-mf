import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SyncBoxesOzmapUseCase } from "../use-cases/sync-boxes-ozmap.use-case";
import { SyncBoxesOzmapCommand } from "./sync-boxes-ozmap.command";

@CommandHandler(SyncBoxesOzmapCommand)
export class SyncBoxesOzmapHandler implements ICommandHandler<
  SyncBoxesOzmapCommand,
  void
> {
  constructor(private readonly syncBoxesOzmapUseCase: SyncBoxesOzmapUseCase) {}

  async execute(command: SyncBoxesOzmapCommand): Promise<void> {
    await this.syncBoxesOzmapUseCase.execute(command.payload);
  }
}
