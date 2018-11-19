using Engine.DomainLayer.Models.Core.QueryBuild;
using Entities.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Services.Description;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.Core.QueryBuild;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Migrations;
using Entities;
using ServiceLayer.Systems;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace WebAppIDEEngine.Models
{
    public class EngineContext : DbContext
    {
        public EngineContext() : base("EngineContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<EngineContext, Configuration>());
            //  Database.SetInitializer(new DropCreateDatabaseIfModelChanges<EngineContext>());


            //Database.Connection.ConnectionString = ConnectionProvider.GetEntityConnectionString();
            //  Database.Connection.ConnectionString = new ConnectionProviderFactory().Current.GetConnectionString();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Form>().HasMany(f => f.Panels).WithRequired(f => f.Form).HasForeignKey(f => f.FormId);

            modelBuilder.Entity<Form>().HasMany(f => f.Actions).WithRequired(f => f.Form).HasForeignKey(f => f.FormId);

            modelBuilder.Entity<Panel>().HasMany(f => f.Children).WithOptional(f => f.Parent)
                .HasForeignKey(f => f.ParentId);

            #region QueryGenerator 

            modelBuilder.Entity<Model>().HasMany(f => f.Forms).WithOptional(f => f.Model).HasForeignKey(f => f.ModelId);

            modelBuilder.Entity<QueryModel>().HasRequired(f => f.Model).WithMany(f => f.UsedInQueries)
                .HasForeignKey(f => f.ModelId);

            modelBuilder.Entity<Model>().HasMany(f => f.NavigationProperties).WithRequired(f => f.Model)
                .HasForeignKey(f => f.ModelId);

            modelBuilder.Entity<Model>().HasMany(f => f.Properties).WithRequired(f => f.Model)
                .HasForeignKey(f => f.ModelId);

            modelBuilder.Entity<Core.Query>().HasMany(f => f.Actions).WithOptional(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.Query>().HasMany(f => f.addParameterFields).WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.Query>().HasMany(f => f.models).WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.Query>().HasMany(f => f.selectedProperties).WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.Property>().HasMany(f => f.UsedInQueries).WithRequired(f => f.Property)
                .HasForeignKey(f => f.PropertyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.QueryModel>().HasMany(f => f.RightJoinTables).WithOptional(f => f.rightTable)
                .HasForeignKey(f => f.rightTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.QueryModel>().HasMany(f => f.LeftJoinTables).WithOptional(f => f.leftTable)
                .HasForeignKey(f => f.leftTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.QueryProperty>().HasMany(f => f.JoinRightTables).WithOptional(f => f.rightProperty)
                .HasForeignKey(f => f.rightPropertyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Core.QueryProperty>().HasMany(f => f.JoinLeftTables).WithOptional(f => f.leftProperty)
                .HasForeignKey(f => f.leftPropertyId).WillCascadeOnDelete(false);

            #endregion

            modelBuilder.Entity<Property>().HasOptional(f => f.NavigationProperty)
                .WithOptionalDependent(f => f.Property);

            modelBuilder.Entity<Field>().HasMany(f => f.UpdateOnChange).WithOptional(f => f.UpdateOnChangeParent)
                .HasForeignKey(f => f.UpdateOnChangeParentId);

            modelBuilder.Entity<Field>().HasMany(f => f.HideOnSelect).WithOptional(f => f.HideOnSelectParent)
                .HasForeignKey(f => f.HideOnSelectParentId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Field>().HasMany(f => f.UpdateOnChange).WithOptional(f => f.UpdateOnChangeParent)
                .HasForeignKey(f => f.UpdateOnChangeParentId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Panel>().HasMany(f => f.Fields).WithOptional(f => f.OpenInModalPanel)
                .HasForeignKey(f => f.OpenInModalPanelId).WillCascadeOnDelete(false);
/*

            modelBuilder.Entity<ComputeButton>().HasOptional(f => f.position)
                .WithRequired(f => f.ComputeButton).WillCascadeOnDelete(false);
*/

            modelBuilder.Entity<ComputeButton>().HasRequired(f => f.Query)
                .WithMany(f => f.WhereComputeButtons).HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ComputeButton>().HasMany(f => f.possibleValue)
                .WithRequired(f => f.ComputeButton).HasForeignKey(f => f.ComputeButtonId).WillCascadeOnDelete(false);

            #region appGeneration

            modelBuilder.Entity<SubSystem>().HasMany(f => f.DefineServices).WithRequired(f => f.SubSystem)
                .HasForeignKey(f => f.SubSystemId).WillCascadeOnDelete(false);


            modelBuilder.Entity<DefineService>().HasRequired(f => f.Model).WithMany(f => f.DefineServices)
                .HasForeignKey(f => f.ModelId).WillCascadeOnDelete(false);


            modelBuilder.Entity<DefineService>().HasMany(f => f.ServiceMethods).WithRequired(f => f.DefineService)
                .HasForeignKey(f => f.DefineServiceId)
                .WillCascadeOnDelete(false);


            modelBuilder.Entity<ServiceMethod>().HasOptional(f => f.Query).WithMany(f => f.ServiceMethods)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);


            modelBuilder.Entity<DefineController>().HasRequired(f => f.Model).WithMany(f => f.DefineControllers)
                .HasForeignKey(f => f.ModelId).WillCascadeOnDelete(false);

            modelBuilder.Entity<DefineController>().HasRequired(f => f.SubSystem).WithMany(f => f.DefineControllers)
                .HasForeignKey(f => f.SubSystemId).WillCascadeOnDelete(false);

            modelBuilder.Entity<DefineControllerMethod>().HasRequired(f => f.DefineController)
                .WithMany(f => f.DefineControllerMethods)
                .HasForeignKey(f => f.DefineControllerId).WillCascadeOnDelete(false);


            /*
            modelBuilder.Entity<DefineControllerMethod>().HasRequired(f => f.Model)
                .WithMany(f => f.DefineControllerMethods)
                .HasForeignKey(f => f.DefineControllerId).WillCascadeOnDelete(false);
*/


            modelBuilder.Entity<DefineControllerMethod>().HasOptional(f => f.ServiceMethod)
                .WithMany(f => f.DefineControllerMethods)
                .HasForeignKey(f => f.ServiceMethodId).WillCascadeOnDelete(false);

            modelBuilder.Entity<DefineService>().HasRequired(f => f.Model).WithMany(f => f.DefineServices)
                .HasForeignKey(f => f.ModelId).WillCascadeOnDelete(false);

            /*
            modelBuilder.Entity<DefineService>().HasRequired(f => f.SubSystem).
               WithMany(f => f.DefineServices)
               .HasForeignKey(f => f.SubSystemId);
 */


            /*modelBuilder.Entity<DefineService>().HasMany(f => f.ServiceMethods).WithRequired(f => f.DefineService)
                .HasForeignKey(f => f.DefineServiceId);
*/


            modelBuilder.Entity<TableMethod>().HasRequired(f => f.EjTable)
                .WithMany(f => f.TableMethods)
                .HasForeignKey(f => f.TableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<TableMethod>().HasRequired(f => f.DefineControllerMethod)
                .WithMany(f => f.TableMethods)
                .HasForeignKey(f => f.DefineControllerMethodId).WillCascadeOnDelete(false);


            modelBuilder.Entity<UiFormControllerMethod>().HasRequired(f => f.DefineControllerMethod)
                .WithMany(f => f.UiFormControllerMethods)
                .HasForeignKey(f => f.DefineControllerMethodId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiFormControllerMethod>().HasRequired(f => f.UiForm)
                .WithMany(f => f.UiFormControllerMethods)
                .HasForeignKey(f => f.UiFormId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiFormInput>().HasRequired(f => f.UiForm)
                .WithMany(f => f.UiFormInputs)
                .HasForeignKey(f => f.UiFormId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiFormInput>().HasRequired(f => f.UiInput)
                .WithMany(f => f.UiFormInputs)
                .HasForeignKey(f => f.UiInputId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiFormItem>().HasRequired(f => f.UiItem)
                .WithMany(f => f.UiFormItems)
                .HasForeignKey(f => f.UiItemId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiFormItem>().HasRequired(f => f.UiForm)
                .WithMany(f => f.UiFormItems)
                .HasForeignKey(f => f.UiFormId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiTableItem>().HasRequired(f => f.UiItem)
                .WithMany(f => f.UiTableItems)
                .HasForeignKey(f => f.UiItemId).WillCascadeOnDelete(false);


            modelBuilder.Entity<UiTableItem>().HasRequired(f => f.EjTable)
                .WithMany(f => f.UiTableItems)
                .HasForeignKey(f => f.EjTableId).WillCascadeOnDelete(false);


            modelBuilder.Entity<UiTableForm>().HasRequired(f => f.UiForm)
                .WithMany(f => f.UiTableForms)
                .HasForeignKey(f => f.UiFormId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiTableForm>().HasRequired(f => f.EjTable)
                .WithMany(f => f.UiTableForms)
                .HasForeignKey(f => f.EjTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<UiInputMethod>().HasRequired(f => f.UiInput)
                .WithMany(f => f.UiInputMethods)
                .HasForeignKey(f => f.UiInputId).WillCascadeOnDelete(false);


            modelBuilder.Entity<UiInputMethod>().HasRequired(f => f.DefineControllerMethod)
                .WithMany(f => f.UiInputMethods)
                .HasForeignKey(f => f.DefineControllerMethodId).WillCascadeOnDelete(false);

            
            #endregion


            #region UIEngine

            modelBuilder.Entity<TableMethod>().HasRequired(f => f.EjTable)
                .WithMany(f => f.TableMethods).HasForeignKey(f => f.TableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<TableMethod>().HasRequired(f => f.DefineControllerMethod)
                .WithMany(f => f.TableMethods).HasForeignKey(f => f.DefineControllerMethodId)
                .WillCascadeOnDelete(false);

            #endregion

            #region temporary

            modelBuilder.Entity<Rent>().HasRequired(f => f.Book)
                .WithMany(f => f.Rents).HasForeignKey(f => f.BookId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Rent>().HasRequired(f => f.Student)
                .WithMany(f => f.Rents).HasForeignKey(f => f.StudentId).WillCascadeOnDelete(false);

            #endregion

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
        public DbSet<JoinTable> JoinTables { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Query> Queries { get; set; }
        public DbSet<QueryProperty> QueryProperties { get; set; }
        public DbSet<QueryModel> QueryModels { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Property> Properties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.NavigationProperty> NavigationProperties { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Model> Models { get; set; }

        #endregion

        #region appGeneration

        public DbSet<ComputeButton> ComputeButtons { get; set; }

        //public DbSet<Position> Positions { get; set; }
        public DbSet<SubSystem> SubSystem { get; set; }
        public DbSet<DefineService> DefineServices { get; set; }
        public DbSet<ServiceMethod> ServiceMethods { get; set; }

        public DbSet<DefineController> DefineControllers { get; set; }
        public DbSet<DefineControllerMethod> DefineControllerMethodes { get; set; }


        public DbSet<UiForm> UiForms { get; set; }
        public DbSet<UiFormControllerMethod> UiFormControllerMethods { get; set; }
        public DbSet<UiFormInput> UiFormInputs { get; set; }
        public DbSet<UiFormItem> UiFormItems { get; set; }
        public DbSet<UiInput> UiInputs { get; set; }
        public DbSet<UiTableItem> UiTableItems { get; set; }
        public DbSet<UiItem> UiItems { get; set; }
        public DbSet<UiTableForm> UiTableForms { get; set; }

        #endregion


        #region UIEngine

        public DbSet<EjTable> Tables { get; set; }
        public DbSet<TableMethod> TableMethods { get; set; }

        #endregion


        #region temporary

        public DbSet<Book> Books { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<Student> Students { get; set; }

        #endregion

        //  public DbSet<WebAppIDEEngine.Models.Core.Parameter> Parameters { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Result> Results { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.SelectColumn> SelectColumns { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Sort> Sorts { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Where> Wheres { get; set; }
    }
}