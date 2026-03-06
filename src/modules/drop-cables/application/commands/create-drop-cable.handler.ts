import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DropCable } from "../../domain/entities/drop-cable.entity";
import { CreateDropCableUseCase } from "../use-cases/create-drop-cable.use-case";
import { CreateDropCableCommand } from "./create-drop-cable.command";

@CommandHandler(CreateDropCableCommand)
export class CreateDropCableHandler implements ICommandHandler<
  CreateDropCableCommand,
  DropCable[]
> {
  constructor(
    private readonly createDropCableUseCase: CreateDropCableUseCase,
  ) {}

  async execute(command: CreateDropCableCommand): Promise<DropCable[]> {
    return this.createDropCableUseCase.execute(command.payload);
  }
}
