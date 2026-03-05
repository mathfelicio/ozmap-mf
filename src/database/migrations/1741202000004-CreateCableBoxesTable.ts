import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCableBoxesTable1741202000004 implements MigrationInterface {
  name = "CreateCableBoxesTable1741202000004";

  private readonly table = new Table({
    name: "cable_boxes_connected",
    columns: [
      {
        name: "cable_id",
        type: "int",
      },
      {
        name: "box_id",
        type: "int",
      },
    ],
    indices: [
      {
        name: "IDX_cable_boxes_cable_id",
        columnNames: ["cable_id"],
      },
      {
        name: "IDX_cable_boxes_box_id",
        columnNames: ["box_id"],
      },
      {
        name: "UQ_cable_boxes_cable_id_box_id",
        columnNames: ["cable_id", "box_id"],
        isUnique: true,
      },
    ],
  });

  private readonly foreignKeyCable = new TableForeignKey({
    referencedTableName: "cables",
    columnNames: ["cable_id"],
    referencedColumnNames: ["id"],
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
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
    await queryRunner.createForeignKeys(this.table, [
      this.foreignKeyCable,
      this.foreignKeyBox,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
