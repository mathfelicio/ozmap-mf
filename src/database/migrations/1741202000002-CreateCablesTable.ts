import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCablesTable1741202000002 implements MigrationInterface {
  name = "CreateCablesTable1741202000002";

  private readonly table = new Table({
    name: "cables",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "name",
        type: "varchar",
        length: "120",
      },
      {
        name: "capacity",
        type: "int",
      },
      {
        name: "boxes_connected",
        type: "text",
      },
      {
        name: "path",
        type: "json",
      },
      {
        name: "created_at",
        type: "datetime",
        precision: 6,
        default: "CURRENT_TIMESTAMP(6)",
      },
      {
        name: "updated_at",
        type: "datetime",
        precision: 6,
        isNullable: true,
        default: "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
      },
      {
        name: "deleted_at",
        type: "datetime",
        precision: 6,
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
