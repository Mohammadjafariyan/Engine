﻿using Engine.DomainLayer.Models.Core.QueryBuild;
using Entities.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;

namespace WebAppIDEEngine.Models
{
    public class EngineContext : DbContext
    {
        public EngineContext()
        {
            Database.Connection.ConnectionString = ConnectionProvider.GetEntityConnectionString();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {



            modelBuilder.Entity<Form>().HasMany(f => f.Panels).
         WithRequired(f => f.Form).HasForeignKey(f => f.FormId);

            modelBuilder.Entity<Form>().HasMany(f => f.Actions).
         WithRequired(f => f.Form).HasForeignKey(f => f.FormId);


            //   modelBuilder.Entity<Core.Action>().HasMany(f => f.Parameters).
            //WithRequired(f => f.Action).HasForeignKey(f => f.ActionId);


            //   modelBuilder.Entity<Core.Parameter>().HasMany(f => f.MethodParameters).
            //WithRequired(f => f.Parameter).HasForeignKey(f => f.ParameterId);


            modelBuilder.Entity<Panel>().HasMany(f => f.Children).
         WithOptional(f => f.Parent).HasForeignKey(f => f.ParentId);



            #region QueryGenerator 

            modelBuilder.Entity<Model>().HasMany(f => f.Forms).WithOptional(f => f.Model).HasForeignKey(f => f.ModelId);


            modelBuilder.Entity<Model>().HasMany(f => f.NavigationProperties).
         WithRequired(f => f.Model).HasForeignKey(f => f.ModelId);


            modelBuilder.Entity<Model>().HasMany(f => f.Properties).
         WithRequired(f => f.Model).HasForeignKey(f => f.ModelId);


            //   modelBuilder.Entity<Model>().HasMany(f => f.MethodParameters).
            //WithRequired(f => f.Model).HasForeignKey(f => f.ModelId);

            //   modelBuilder.Entity<Property>().HasOptional(f => f.NavigationProperty).WithOptionalDependent(f => f.Property);


            modelBuilder.Entity<Core.Query>().HasMany(f => f.Actions).
       WithOptional(f => f.Query).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.Query>().HasMany(f => f.addParameterFields).
         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);


            modelBuilder.Entity<Core.Query>().HasMany(f => f.joinTables).
         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);


            modelBuilder.Entity<Core.Query>().HasRequired(f => f.mainTable).
         WithMany(f => f.MainTableQueries).HasForeignKey(f => f.mainTableId).WillCascadeOnDelete(false);


            modelBuilder.Entity<Core.Query>().HasMany(f => f.models).
         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);


            modelBuilder.Entity<Core.Query>().HasMany(f => f.selectedProperties).
         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);




            modelBuilder.Entity<JoinTable>().HasRequired(f => f.rightTable).
    WithMany(f => f.JoinRightTables).HasForeignKey(f => f.rightTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<JoinTable>().HasRequired(f => f.leftTable).
    WithMany(f => f.JoinLeftTables).HasForeignKey(f => f.leftTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<JoinTable>().HasRequired(f => f.rightProperty).
    WithMany(f => f.JoinRightTables).HasForeignKey(f => f.rightPropertyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<JoinTable>().HasRequired(f => f.leftProperty).
    WithMany(f => f.JoinLeftTables).HasForeignKey(f => f.leftPropertyId).WillCascadeOnDelete(false);

            #endregion
            


            //            modelBuilder.Entity<Core.Query>().HasMany(f => f.SelectColumns).
            //         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId);

            //            modelBuilder.Entity<Core.Query>().HasMany(f => f.Sorts).
            //         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId);

            //            modelBuilder.Entity<Core.Query>().HasMany(f => f.Wheres).
            //         WithRequired(f => f.Query).HasForeignKey(f => f.QueryId);


            //            modelBuilder.Entity<Core.Query>().HasMany(f => f.Parameters).
            //WithOptional(f => f.Query).HasForeignKey(f => f.QueryId);




            modelBuilder.Entity<Field>().HasMany(f => f.UpdateOnChange).
                WithOptional(f => f.UpdateOnChangeParent).HasForeignKey(f => f.UpdateOnChangeParentId);

            modelBuilder.Entity<Field>().HasMany(f => f.HideOnSelect).
                WithOptional(f => f.HideOnSelectParent).HasForeignKey(f => f.HideOnSelectParentId);

            modelBuilder.Entity<Field>().HasMany(f => f.UpdateOnChange).
                WithOptional(f => f.UpdateOnChangeParent).HasForeignKey(f => f.UpdateOnChangeParentId);



            modelBuilder.Entity<Panel>().HasMany(f => f.Fields).
                WithOptional(f => f.OpenInModalPanel).HasForeignKey(f => f.OpenInModalPanelId);



            //modelBuilder.Entity<Property>().HasMany(f => f.Columns).
            //    WithOptional(f => f.Property).HasForeignKey(f => f.PropertyId);


            //modelBuilder.Entity<NavigationProperty>().HasMany(f => f.Columns).
            //    WithOptional(f => f.NavigationProperty).HasForeignKey(f => f.NavigationPropertyId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Panel> Panels { get; set; }
      //  public DbSet<WebAppIDEEngine.Models.Core.MethodParameter> MethodParameters { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Form> Forms { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Field> Fields { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Action> Actions { get; set; }
        //  public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Column> Columns { get; set; }



        #region ReportGenerator

        public DbSet<AddParameterForm> AddParameterForms { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Query> Queries { get; set; }
        public DbSet<QueryProperty> QueryProperties { get; set; }
        public DbSet<QueryModel> QueryModels { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Property> Properties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.NavigationProperty> NavigationProperties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Model> Models { get; set; }
        #endregion




        //  public DbSet<WebAppIDEEngine.Models.Core.Parameter> Parameters { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Result> Results { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.SelectColumn> SelectColumns { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Sort> Sorts { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Where> Wheres { get; set; }
    }
}
