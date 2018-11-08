using System.Collections.Generic;
using System.Linq;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.CoreEnum;

namespace AppSourceGenerator
{
    public class FakeDataProvider
    {
        public List<Model> Models = new List<Model>();
        public List<SubSystem> SubSystems = new List<SubSystem>();
        public List<DefineController> Controllers = new List<DefineController>();
        public List<DefineService> Services = new List<DefineService>();
        public List<Query> Queries = new List<Query>();


        
        
         public Model MakeRent(Model u,Model b)
        {
            var rent = new Model();
            rent.Name = "rent";
            rent.TableName = "dbo.rent";
            rent.Id = 1;

            
            var id=new Property();
            id.Name = "id";
            id.NameInModel = "id";
            id.NameInTable = "id";
            id.PK = true;
            id.PropertyType = PropertyType.Long;

            var userid=new Property();
            userid.Name = "userid";
            userid.NameInModel = "userid";
            userid.NameInTable = "userid";
            userid.NavigationProperty=new NavigationProperty();
            userid.NavigationProperty.Model = u;
            userid.FK = true;
            userid.PropertyType = PropertyType.Long;

            var bookid=new Property();
            bookid.Name = "bookid";
            bookid.NameInModel = "bookid";
            bookid.NameInTable = "bookid";
            bookid.NavigationProperty=new NavigationProperty();
            bookid.NavigationProperty.Model = b;
            bookid.FK = true;
            bookid.PropertyType = PropertyType.Long;


            rent.Properties.Add(id);
            rent.Properties.Add(bookid);
            rent.Properties.Add(userid);
            return rent;
        }
        public Model MakeBook()
        {
            var user = new Model();
            user.Name = "book";
            user.TableName = "dbo.book";
            user.Id = 1;

            var id=new Property();
            id.Name = "id";
            id.NameInModel = "id";
            id.NameInTable = "id";
            id.PK = true;
            id.PropertyType = PropertyType.Long;

            
            var Name=new Property();
            Name.Name = "Name";
            Name.NameInModel = "Name";
            Name.NameInTable = "Name";
            id.PropertyType = PropertyType.String;

            
            var Author=new Property();
            Author.Name = "Author";
            Author.NameInModel = "Author";
            Author.NameInTable = "Author";
            id.PropertyType = PropertyType.String;

            user.Properties.Add(Name);
            user.Properties.Add(Author);
            user.Properties.Add(id);
            return user;
        }
        public Model MakeUser()
        {
            var user = new Model();
            user.Name = "user";
            user.TableName = "dbo.user";
            user.Id = 1;

    
            var id=new Property();
            id.Name = "id";
            id.NameInModel = "id";
            id.NameInTable = "id";
            id.PK = true;
            id.PropertyType = PropertyType.Long;
  
            
            var Name=new Property();
            Name.Name = "Name";
            Name.NameInModel = "Name";
            Name.NameInTable = "Name";
            Name.PropertyType = PropertyType.String;

            
            var LName=new Property();
            LName.Name = "LName";
            LName.NameInModel = "LName";
            LName.NameInTable = "LName";
            LName.PropertyType = PropertyType.String;

            user.Properties.Add(Name);
            user.Properties.Add(LName);
            user.Properties.Add(id);
            return user;
        }

        public void MakeFakeObjects()
        {
            var subsystem = new SubSystem();
            subsystem.Name = "Library";
            subsystem.Translate = "کتابخانه";
            subsystem.IsInstalled = true;


            var b=this.MakeBook();
            var u=this.MakeUser();
            var r=this.MakeRent(b,u);
            
            Models.Add(b);
            Models.Add(u);
            Models.Add(r);
            
            SubSystems.Add(subsystem);
            
            
            DefineService userService=new DefineService();
            userService.Model = u;
            userService.Name = "userService";
            userService.Translate = "userService";
            userService.SubSystem = subsystem;

            DefineService bookService=new DefineService();
            bookService.Model = b;
            bookService.Name = "bookService";
            bookService.Translate = "bookService";
            bookService.SubSystem = subsystem;

            DefineService RentService=new DefineService();
            RentService.Model = r;
            RentService.Name = "RentService";
            RentService.Translate = "RentService";
            RentService.SubSystem = subsystem;
            
            Services.Add(bookService);
            Services.Add(RentService);
            Services.Add(userService);

            var bookQuery = getBookQuery(b);
            var userQuery = getUserQuery(u);
            var rentQuery = getRentQuery(r);

            var bookServiceGetAll = GetServiceGetAll(bookQuery,bookService);
            var userServiceGetAll = GetServiceGetAll(userQuery,userService);
            var rentServiceGetAll = GetServiceGetAll(rentQuery,RentService);

            Queries.Add(bookQuery);
            Queries.Add(userQuery);
            Queries.Add(rentQuery);
            
            bookService.ServiceMethods.Add(bookServiceGetAll); ;
            RentService.ServiceMethods.Add(userServiceGetAll); ;
            userService.ServiceMethods.Add(rentServiceGetAll); ;
            
            DefineController userController=new DefineController();
            userController.Model = u;
            userController.Name = "user";
            userController.Translate = "user";
            userController.SubSystem = subsystem;

            DefineController bookController=new DefineController();
            bookController.Model = b;
            bookController.Name = "book";
            bookController.Translate = "book";
            bookController.SubSystem = subsystem;

            DefineController RentController=new DefineController();
            RentController.Model = r;
            RentController.Name = "Rent";
            RentController.Translate = "Rent";
            RentController.SubSystem = subsystem;
            
            Controllers.Add(userController);
            Controllers.Add(bookController);
            Controllers.Add(RentController);
            
            userController.DefineControllerMethod.Add(GetControllerGetAll(userController,userServiceGetAll)); ;
            bookController.DefineControllerMethod.Add(GetControllerGetAll(bookController,bookServiceGetAll)); ;
            RentController.DefineControllerMethod.Add(GetControllerGetAll(RentController,rentServiceGetAll)); ;

                        /*
            userQuery.models.Add(new QueryModel{Model = b,Query = userQuery});
            userQuery.models.Add(new QueryModel{Model = r,Query = userQuery});
*/

        }
        public DefineControllerMethod GetControllerGetAll(DefineController c, ServiceMethod m)
        {
            var s=new DefineControllerMethod();
            s.ServiceMethod = m;
            s.Name = "getAll";
            s.Translate = "getAll";
            s.DefineController = c;
            return s;
        }
        public ServiceMethod GetServiceGetAll(Query u,DefineService service)
        {
            var s=new ServiceMethod();
            s.Query = u;
            s.DefineService = service;
            s.Name = "getAll";
            s.Translate = "getAll";
            s.ServiceItemReturnType = ServiceItemReturnType.IQueryable;
            s.ServiceReturnMethodType = ServiceReturnMethodType.Dynamic;
            return s;
        }
        public Query getRentQuery(Model u)
        {
            Query userQuery=new Query();
            userQuery.Name = "RentQuery";
            userQuery.SQL = "select * from dbo.rent";
            userQuery.type = QueryViewModelType.Select;
            userQuery.queryName = "RentQuery";
         //   userQuery.mainTable = new QueryModel{Model = u};
            userQuery.models.Add(new QueryModel{Model = u,Query = userQuery});
          /*  userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[0]});
            userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[1]});
            userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[2]});
*/
            return userQuery;
        }
        public Query getUserQuery(Model u)
        {
            Query userQuery=new Query();
            userQuery.Name = "userQuery";
            userQuery.SQL = "select * from dbo.user";
            userQuery.type = QueryViewModelType.Select;
            userQuery.queryName = "userQuery";
           // userQuery.mainTable = new QueryModel{Model = u};
            userQuery.models.Add(new QueryModel{Model = u,Query = userQuery});
          /*  userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[0]});
            userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[1]});
            userQuery.selectedProperties.Add(new QueryProperty{Query = userQuery,Property = u.Properties[2]});
*/
            return userQuery;
        }

        public Query getBookQuery(Model b)
        {
            Query bookQuery=new Query();
            bookQuery.Name = "bookQuery";
            bookQuery.SQL = "select * from dbo.book";
            bookQuery.type = QueryViewModelType.Select;
            bookQuery.queryName = "bookQuery";
          //  bookQuery.mainTable = new QueryModel{Model = b};
            bookQuery.models.Add(new QueryModel{Model = b,Query = bookQuery});
          /*  bookQuery.selectedProperties.Add(new QueryProperty{Query = bookQuery,Property = b.Properties[0]});
            bookQuery.selectedProperties.Add(new QueryProperty{Query = bookQuery,Property = b.Properties[1]});
           */ return bookQuery;
        }

    }
}