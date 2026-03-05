import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateDropCablesTable1741202000003
  implements MigrationInterface
{
  name = "CreateDropCablesTable1741202000003";

  private readonly table = new Table({
    name: "drop_cables",
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
        name: "box_id",
        type: "int",
      },
      {
        name: "customer_id",
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
        name: "IDX_drop_cables_box_id",
        columnNames: ["box_id"],
      },
      {
        name: "IDX_drop_cables_customer_id",
        columnNames: ["customer_id"],
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

  private readonly foreignKeyCustomer = new TableForeignKey({
    referencedTableName: "customers",
    columnNames: ["customer_id"],
    referencedColumnNames: ["id"],
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.foreignKeyBox,
      this.foreignKeyCustomer,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
