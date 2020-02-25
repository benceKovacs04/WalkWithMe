using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WalkWithMe_ImageService.Migrations
{
    public partial class datetime_points_added_toimage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Images",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "PostDate",
                table: "Images",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "PostDate",
                table: "Images");
        }
    }
}
