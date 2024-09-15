using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Linq.Dynamic.Core;
using Engine.Areas.ImportExport.ServiceTests;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.ViewModel;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Entities.Data.Absence.Models;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.Core.QueryBuild;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Migrations;
using Engine.ServiceLayer.Engine;
using Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Entities.Data
{
    public class EngineContext : IdentityDbContext<ApplicationUser>
    {
        //  public EngineContext() : base(EngineUtility.ContextName())
        public EngineContext() : base("EngineContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<EngineContext, Configuration>());
            //   Database.SetInitializer(new DropCreateDatabaseIfModelChanges<EngineContext>());

            this.Configuration.LazyLoadingEnabled = false;


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

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.Query>().HasMany(f => f.Actions).WithOptional(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.Query>().HasMany(f => f.addParameterFields)
                .WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.Query>().HasMany(f => f.models).WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.Query>().HasMany(f => f.selectedProperties)
                .WithRequired(f => f.Query)
                .HasForeignKey(f => f.QueryId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.Property>().HasMany(f => f.UsedInQueries)
                .WithRequired(f => f.Property)
                .HasForeignKey(f => f.PropertyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.QueryModel>().HasMany(f => f.RightJoinTables)
                .WithOptional(f => f.rightTable)
                .HasForeignKey(f => f.rightTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.QueryModel>().HasMany(f => f.LeftJoinTables)
                .WithOptional(f => f.leftTable)
                .HasForeignKey(f => f.leftTableId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.QueryProperty>().HasMany(f => f.JoinRightTables)
                .WithOptional(f => f.rightProperty)
                .HasForeignKey(f => f.rightPropertyId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WebAppIDEEngine.Models.Core.QueryProperty>().HasMany(f => f.JoinLeftTables)
                .WithOptional(f => f.leftProperty)
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


            #region Absence

            modelBuilder.Entity<PersonnelMachine>().HasRequired(f => f.Personnel)
                .WithMany(f => f.PersonnelMachines).HasForeignKey(f => f.PersonnelId).WillCascadeOnDelete(false);

            modelBuilder.Entity<PersonnelMachine>().HasRequired(f => f.Machine)
                .WithMany(f => f.PersonnelMachines).HasForeignKey(f => f.MachineId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ObligatedRange>().HasMany(f => f.ObligatedRangeWeeks)
                .WithRequired(f => f.ObligatedRange).HasForeignKey(f => f.ObligatedRangeId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ObligatedRangeWeeks>().HasMany(f => f.ObligatedRangeDayTimes)
                .WithRequired(f => f.ObligatedRangeWeek).HasForeignKey(f => f.ObligatedRangeWeekId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkGroup>().HasMany(f => f.Personnels)
                .WithOptional(f => f.WorkGroup).HasForeignKey(f => f.WorkGroupId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkGroupObligatedRange>().HasRequired(f => f.WorkGroup)
                .WithMany(f => f.WorkGroupObligatedRanges).HasForeignKey(f => f.WorkGroupId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkGroupObligatedRange>().HasRequired(f => f.ObligatedRange)
                .WithMany(f => f.WorkGroupObligatedRanges).HasForeignKey(f => f.ObligatedRangeId)
                .WillCascadeOnDelete(false);

            #endregion


            #region filters

            #endregion

            #region ExcelImporter

            modelBuilder.Entity<ExcelStructreTable>().HasMany(f => f.Nodes)
                .WithRequired(f => f.StructureTable)
                .HasForeignKey(f => f.StructureTableId).WillCascadeOnDelete(false);

            #endregion

            #region Mobile

            modelBuilder.Entity<Workplace>().HasMany(f => f.WorkplacePersonnels)
                .WithRequired(f => f.Workplace)
                .HasForeignKey(f => f.WorkplaceId).WillCascadeOnDelete(false);


            modelBuilder.Entity<WorkplacePersonnel>()
                .HasOptional(f => f.Personnel)
                .WithMany(f => f.WorkplacePersonnels)
                .HasForeignKey(f => f.PersonnelId).WillCascadeOnDelete(false);


            modelBuilder.Entity<ClockInViewModel>()
                .HasMany(f => f.location)
                .WithOptional(f => f.ClockInViewModel)
                .HasForeignKey(f => f.ClockInViewModelId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ClockInViewModel>()
                .HasMany(f => f.scanResults)
                .WithOptional(f => f.ClockInViewModel)
                .HasForeignKey(f => f.ClockInViewModelId).WillCascadeOnDelete(false);


            modelBuilder.Entity<BiometricData>()
                .HasMany(f => f.BiometricDataTimes)
                .WithRequired(f => f.BiometricData)
                .HasForeignKey(f => f.BiometricDataId).WillCascadeOnDelete(false);

            modelBuilder.Entity<BiometricData>()
                .HasOptional(f => f.PersonnelMachine)
                .WithMany(f => f.BiometricDatas)
                .HasForeignKey(f => f.PersonnelMachineId).WillCascadeOnDelete(false);

            modelBuilder.Entity<BiometricData>()
                .HasOptional(f => f.WorkplacePersonnel)
                .WithMany(f => f.BiometricDatas)
                .HasForeignKey(f => f.WorkplacePersonnelId).WillCascadeOnDelete(false);


            modelBuilder.Entity<BiometricDataTime>()
                .HasMany(f => f.ClockInViewModels)
                .WithRequired(f => f.BiometricDataTime)
                .HasForeignKey(f => f.BiometricDataTimeId).WillCascadeOnDelete(false);


            modelBuilder.Entity<WorkplaceSetting>()
                .HasMany(f => f.location)
                .WithOptional(f => f.WorkplaceSetting)
                .HasForeignKey(f => f.WorkplaceSettingId).WillCascadeOnDelete(false);

            modelBuilder.Entity<WorkplaceSetting>()
                .HasMany(f => f.scanResults)
                .WithOptional(f => f.WorkplaceSetting)
                .HasForeignKey(f => f.WorkplaceSettingId).WillCascadeOnDelete(false);

            modelBuilder.Entity<Workplace>()
                .HasMany(f => f.WorkplaceSettings)
                .WithOptional(f => f.Workplace)
                .HasForeignKey(f => f.WorkplaceId).WillCascadeOnDelete(false);


            modelBuilder.Entity<WorkplacePersonnel>()
                .HasMany(f => f.WorkplaceSettings)
                .WithOptional(f => f.WorkplacePersonnel)
                .HasForeignKey(f => f.WorkplacePersonnelId).WillCascadeOnDelete(false);


            modelBuilder.Entity<Workplace>()
                .HasMany(f => f.Locations)
                .WithOptional(f => f.Workplace)
                .HasForeignKey(f => f.WorkplaceId).WillCascadeOnDelete(false);

            #endregion

            this.Database.Log = s => Debug.WriteLine(s);

            #region ApplicationUsers

            modelBuilder.Entity<Machine>().ToTable("Machines", "dbo");

            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.Children).WithOptional(f => f.Parent)
                .HasForeignKey(f => f.ParentId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.Machines).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.ObligatedRanges).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.ObligatedRangeWeekss)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.ObligatedRangeDayTimess)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.Personnels).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.PersonnelMachines)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.WorkGroups).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.WorkGroupObligatedRanges)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.Workplaces).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.WorkplacePersonnels)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.WorkplaceSettings)
                .WithRequired(f => f.ApplicationUser).HasForeignKey(f => f.ApplicationUserId)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.BiometricDatas).WithRequired(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);
   
            
            
            modelBuilder.Entity<ApplicationUser>().HasMany(f => f.ClockInViewModel)
                .WithOptional(f => f.ApplicationUser)
                .HasForeignKey(f => f.ApplicationUserId).WillCascadeOnDelete(false);

            #endregion

            base.OnModelCreating(modelBuilder);
        }


        public DbSet<Panel> Panels { get; set; }

        //  public DbSet<WebAppIDEEngine.Models.Core.MethodParameter> MethodParameters { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Form> Forms { get; set; }
        public DbSet<WebAppIDEEngine.Models.Core.Field> Fields { get; set; }

        public DbSet<WebAppIDEEngine.Models.Core.Action> Actions { get; set; }
        //  public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Column> Columns { get; set; }

        #region Absence

        public DbSet<Machine> Machines { get; set; }
        public DbSet<ObligatedRange> ObligatedRanges { get; set; }
        public DbSet<ObligatedRangeWeeks> ObligatedRangeWeekss { get; set; }
        public DbSet<ObligatedRangeDayTimes> ObligatedRangeDayTimes { get; set; }
        public DbSet<Personnel> Personnels { get; set; }
        public DbSet<PersonnelMachine> PersonnelMachines { get; set; }
        public DbSet<WorkGroup> WorkGroups { get; set; }

        public DbSet<WorkGroupObligatedRange> WorkGroupObligatedRanges { get; set; }
        //  public DbSet<BiometryCalculatedDetail> BiometryCalculatedDetails { get; set; }

        #endregion

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
        public DbSet<BiometricData> BiometricDatas { get; set; }
        public DbSet<BiometricDataTime> BiometricDataTimes { get; set; }
        public DbSet<BiometricRawData> BiometricRawDatas { get; set; }

        #endregion


        #region ExcelImporter

        public DbSet<ExcelStructreTable> ExcelStructreTables { get; set; }
        public DbSet<ExcelStructreTableNode> ExcelStructreTableNode { get; set; }

        #endregion


        #region Mobile

        public DbSet<Workplace> Workplaces { get; set; }
        public DbSet<WorkplacePersonnel> WorkplacePersonnels { get; set; }
        public DbSet<ClockInViewModel> ClockInViewModels { get; set; }
        public DbSet<WorkplaceSetting> WorkplaceSettings { get; set; }

        #endregion

        //  public DbSet<WebAppIDEEngine.Models.Core.Parameter> Parameters { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Result> Results { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.SelectColumn> SelectColumns { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Sort> Sorts { get; set; }
        //public DbSet<WebAppIDEEngine.Models.Core.QueryBuild.Where> Wheres { get; set; }

        public static EngineContext Create()
        {
            return new EngineContext();
        }

        public Personnel GetCurrentUserPersonnel(string userId, bool includeWorkplace = false)
        {
            var applicationUser =  Users.Find(userId);
            if (userId != null)
            {
                var personnelQuery = Personnels
                    .Where(s => s.ApplicationUserId == applicationUser.Id);

                if (includeWorkplace)
                {
                    personnelQuery = personnelQuery.Include(s => s.WorkplacePersonnels)
                        .Include(s => s.WorkplacePersonnels.Select(d => d.Workplace));
                }

                var personnel = personnelQuery.FirstOrDefault();

                if (personnel == null)
                {
                    personnel = new Personnel
                    {
                        ApplicationUserId = applicationUser.Id,
                        Name = applicationUser.FirstName,
                        LastName = applicationUser.LastName,
                        Code = applicationUser.Code,
                    };
                    Personnels.Add(personnel);

                    SaveChanges();
                }

                return personnel;
            }

            return null;
        }
    }
}