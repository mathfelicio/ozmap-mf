import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SyncBoxesOzmapCommand } from "../../../boxes/application/commands/sync-boxes-ozmap.command";
import { RunOzmapSyncCommandPayload } from "../commands/run-ozmap-sync.command";

@Injectable()
export class RunOzmapSyncUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(payload: RunOzmapSyncCommandPayload): Promise<void> {
    await this.commandBus.execute(new SyncBoxesOzmapCommand(payload.boxes));
  }
}
