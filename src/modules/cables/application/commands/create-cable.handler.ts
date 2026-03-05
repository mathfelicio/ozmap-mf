import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Cable } from "../../domain/entities/cable.entity";
import { CreateCableUseCase } from "../use-cases/create-cable.use-case";
import { CreateCableCommand } from "./create-cable.command";

@CommandHandler(CreateCableCommand)
export class CreateCableHandler implements ICommandHandler<
  CreateCableCommand,
  Cable[]
> {
  constructor(private readonly createCableUseCase: CreateCableUseCase) {}

  async execute(command: CreateCableCommand): Promise<Cable[]> {
    return this.createCableUseCase.execute(command.payload);
  }
}
