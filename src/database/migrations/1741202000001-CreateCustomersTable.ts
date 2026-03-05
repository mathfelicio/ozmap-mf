import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCustomersTable1741202000001 implements MigrationInterface {
  name = "CreateCustomersTable1741202000001";

  private readonly table = new Table({
    name: "customers",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "code",
        type: "varchar",
        length: "32",
      },
      {
        name: "name",
        type: "varchar",
        length: "120",
      },
      {
        name: "address",
        type: "varchar",
        length: "255",
      },
      {
        name: "box_id",
        type: "int",
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
    indices: [
      {
        name: "IDX_customers_box_id",
        columnNames: ["box_id"],
      },
    ],
  });

  private readonly foreignKeyBox = new TableForeignKey({
    referencedTableName: "boxes",
    columnNames: ["box_id"],
    referencedColumnNames: ["id"],
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreignKeyBox);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
