import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SyncCustomersOzmapUseCase } from "../use-cases/sync-customers-ozmap.use-case";
import { SyncCustomersOzmapCommand } from "./sync-customers-ozmap.command";

@CommandHandler(SyncCustomersOzmapCommand)
export class SyncCustomersOzmapHandler implements ICommandHandler<
  SyncCustomersOzmapCommand,
  void
> {
  constructor(
    private readonly syncCustomersOzmapUseCase: SyncCustomersOzmapUseCase,
  ) {}

  async execute(command: SyncCustomersOzmapCommand): Promise<void> {
    await this.syncCustomersOzmapUseCase.execute(command.payload);
  }
}
