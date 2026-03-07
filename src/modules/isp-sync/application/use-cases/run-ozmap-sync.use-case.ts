import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SyncCablesOzmapCommand } from "../../../cables/application/commands/sync-cables-ozmap.command";
import { RunOzmapSyncCommandPayload } from "../commands/run-ozmap-sync.command";
import { SyncBoxesOzmapCommand } from "../../../boxes/application/commands/sync-boxes-ozmap.command";
import { SyncCustomersOzmapCommand } from "../../../customers/application/commands/sync-customers-ozmap.command";
import { SyncDropCablesOzmapCommand } from "../../../drop-cables/application/commands/sync-drop-cables-ozmap.command";

@Injectable()
export class RunOzmapSyncUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(payload: RunOzmapSyncCommandPayload): Promise<void> {
    await this.commandBus.execute(new SyncBoxesOzmapCommand(payload.boxes));
    await this.commandBus.execute(new SyncCablesOzmapCommand(payload.cables));
    await this.commandBus.execute(
      new SyncCustomersOzmapCommand(payload.customers),
    );
    await this.commandBus.execute(
      new SyncDropCablesOzmapCommand(payload.dropCables),
    );
  }
}
