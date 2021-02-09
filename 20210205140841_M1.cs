using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatWebServer.Migrations
{
    public partial class M1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fabrika",
                columns: table => new
                {
                    ID_F = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fabrika", x => x.ID_F);
                });

            migrationBuilder.CreateTable(
                name: "Silos",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oznaka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kapacitet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrenutnaKolicina = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FabrikaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Silos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Silos_Fabrika_FabrikaID",
                        column: x => x.FabrikaID,
                        principalTable: "Fabrika",
                        principalColumn: "ID_F",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Silos_FabrikaID",
                table: "Silos",
                column: "FabrikaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Silos");

            migrationBuilder.DropTable(
                name: "Fabrika");
        }
    }
}
