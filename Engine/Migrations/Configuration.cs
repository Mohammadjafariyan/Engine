using System.Collections.Generic;
using Engine.Entities.Data;
using Engine.Entities.Models.Core.AppGeneration;
using Entities;

namespace Engine.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EngineContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(EngineContext context)
        {

            var r=new Rent {Name = "Rent  in Mount"};
            var b = new Book {Name = "willpower is not enough"};
            var s = new Student {Name = "Mohammad jafariyan"};
            r.Book = b;
            r.Student = s;
         
            context.Books.Add(b);
            context.Rents.Add(r);
            context.Students.Add(s);
            context.SaveChanges();
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }

    internal class DataSeeder
    {
        
        /// <summary>
        /// هر کنترولر ور سرویس دارای متد های دیفالت است که کاربر میتواند استفاده کند
        /// </summary>
        /// <exception cref="NotImplementedException"></exception>
        public void GetControllersDefaultMethods()
        {
            List<ServiceMethod> defineServices = new List<ServiceMethod>();
            var sm1 = new ServiceMethod {Name = "GetDataTableAsync"};
            defineServices.Add(sm1);

            
            List<DefineControllerMethod> methods = new List<DefineControllerMethod>();
            methods.Add(new DefineControllerMethod{Name = "GetDataTable",ServiceMethod = sm1});
        }
        
       
    }
}
