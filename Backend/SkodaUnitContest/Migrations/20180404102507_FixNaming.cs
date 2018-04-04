using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SkodaUnitWebApi.Migrations
{
    public partial class FixNaming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Articles_ArrticleId",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "ArrticleId",
                table: "Images",
                newName: "ArticleId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ArrticleId",
                table: "Images",
                newName: "IX_Images_ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Articles_ArticleId",
                table: "Images",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Articles_ArticleId",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "ArticleId",
                table: "Images",
                newName: "ArrticleId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ArticleId",
                table: "Images",
                newName: "IX_Images_ArrticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Articles_ArrticleId",
                table: "Images",
                column: "ArrticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
