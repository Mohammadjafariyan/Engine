using Engine.DomainLayer.Models.Core.QueryBuild;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;

namespace WebAppIDEEngine.Models
{
    public class ReportGeneratorContext : DbContext
    {
        public ReportGeneratorContext()
            : base("DefaultConnection")
        {
        }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

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

            modelBuilder.Entity<Property>().HasOptional(f => f.NavigationProperty).
WithOptionalDependent(f => f.Property);
            
            base.OnModelCreating(modelBuilder);
        }



        #region ReportGenerator

        public DbSet<AddParameterForm> AddParameterForms { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Query> Queries { get; set; }
        public DbSet<QueryProperty> QueryProperties { get; set; }
        public DbSet<QueryModel> QueryModels { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Property> Properties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.NavigationProperty> NavigationProperties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Model> Models { get; set; }
        #endregion


    }
}
