using ServiceLayer.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using ViewModel.ActionTypes;
using Book = Entities.Book;
using Rent = Entities.Rent;

namespace ServiceLayer.Systems.Library
{
    public class RentService : CommonService<Rent>
    {
        public IDataTable GetAllUsers()
        {
            var dt = EngineContext.Database.SqlQuery<Book>(@"  
    
    
    select  User.
      Tel  
      as  
       [Tel] , User.
      LastName  
      as  
       [LastName] , User.
      NationalCode  
      as  
       [NationalCode] , User.
      Id  
      as  
       [Id]  from User as
     _User ");
            var res = dt.AsQueryable();
            Dictionary<string, string> headers = new Dictionary<string, string>
            {
                {"Author ", "[نویسنده] "},
                {"BookPrintDate ", "[تاریخ چاپ] "},
                {"Id ", "[کد کتاب] "}
            };
            var count = res.Count();
            var l = res.ToList();

            return new DynaDataTable
            {
                Total = count,
                Filtered = count,
                Headers = headers,
                RecordsList = l.Cast<dynamic>().ToList()
            };
        }

        public IDataTable GetAllDataTable()
        {
            var dt = EngineContext.Database.SqlQuery<Student>(@"  
    
    
    select  User.
      Tel  
      as  
       [شماره تلفن] , User.
      LastName  
      as  
       [نام خانوادگی] , User.
      NationalCode  
      as  
       [کد ملی] , User.
      Id  
      as  
       [کد اصلی  کاربر] , Rent.
      IsBack  
      as  
       [آیا برگشت داده است] , Rent.
      BackDate  
      as  
       [تاریخ برگشت] , Rent.
      Penalty  
      as  
       [جریمه] , Rent.
      IsPayed  
      as  
       [آیا جریمه پرداخت شده است] , Rent.
      UserId  
      as  
       [کد کاربر] , Rent.
      BookId  
      as  
       [کد کتاب] , Rent.
      Id  
      as  
       [کد اصلی کتاب] , Book.
      Author  
      as  
       [نویسنده] , Book.
      BookPrintDate  
      as  
       [تاریخ چاپ] , Book.
      Id  
      as  
       [کد اصلی امانت]  from User as
     _User    join Rent
          as Rent0 on 
           _Rent.
           UserId=
           Rent0.
           UserId");
            var res = dt.AsQueryable();
            Dictionary<string, string> headers = new Dictionary<string, string>
            {
                {"Id ", " "},
                {"UserId ", " "},
                {"BookId ", " "},
                {"Id ", " "},
                {"Tel ", " "},
                {"LastName ", " "},
                {"NationalCode ", " "},
                {"Id ", " "},
                {"IsBack ", " "},
                {"BackDate ", " "},
                {"Penalty ", " "},
                {"IsPayed ", " "},
                {"UserId ", " "},
                {"BookId ", " "},
                {"Id ", " "},
                {"Author ", " "},
                {"BookPrintDate ", " "},
                {"Id ", " "}
            };
            var count = res.Count();
            var l = res.ToList();

            return new DynaDataTable
            {
                Total = count,
                Filtered = count,
                Headers = headers,
                RecordsList = l.Cast<dynamic>().ToList()
            };
        }

    }
}
