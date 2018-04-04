﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SkodaUnitWebApi.Model;
using System;

namespace SkodaUnitWebApi.Migrations
{
    [DbContext(typeof(DataDbContext))]
    partial class DataDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SkodaUnitWebApi.Model.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("SkodaUnitWebApi.Model.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ArticleId");

                    b.Property<byte[]>("Data");

                    b.Property<string>("Name");

                    b.Property<DateTime>("UpDateTime");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("SkodaUnitWebApi.Model.Image", b =>
                {
                    b.HasOne("SkodaUnitWebApi.Model.Article")
                        .WithMany("Images")
                        .HasForeignKey("ArticleId");
                });
#pragma warning restore 612, 618
        }
    }
}
