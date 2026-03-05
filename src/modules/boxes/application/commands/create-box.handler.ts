import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Box } from "../../domain/entities/box.entity";
import { CreateBoxUseCase } from "../use-cases/create-box.use-case";
import { CreateBoxCommand } from "./create-box.command";

@CommandHandler(CreateBoxCommand)
export class CreateBoxHandler implements ICommandHandler<
  CreateBoxCommand,
  Box[]
> {
  constructor(private readonly createBoxUseCase: CreateBoxUseCase) {}

  async execute(command: CreateBoxCommand): Promise<Box[]> {
    return this.createBoxUseCase.execute(command.payload);
  }
}
