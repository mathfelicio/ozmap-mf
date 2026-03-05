import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBoxesTable1741202000000 implements MigrationInterface {
  name = "CreateBoxesTable1741202000000";

  private readonly table = new Table({
    name: "boxes",
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
        name: "type",
        type: "varchar",
        length: "40",
      },
      {
        name: "lat",
        type: "double",
      },
      {
        name: "lng",
        type: "double",
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
