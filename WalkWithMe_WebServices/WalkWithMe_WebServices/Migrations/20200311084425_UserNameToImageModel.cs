using Microsoft.EntityFrameworkCore.Migrations;

namespace WalkWithMe_ImageService.Migrations
{
    public partial class UserNameToImageModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Images",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Images");
        }
    }
}
