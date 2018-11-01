using Engine.DomainLayer.Models.Core.QueryBuild;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.Core.QueryBuild;

namespace Engine.Areas.ReportGenerator.Controllers
{
    public class QueryController : ApiController
    {
        public EngineContext _context = new EngineContext();

        [HttpGet]
        public CustomResult getAll(int? lastIndex, int? count)
        {
            // خخالی بود تمامی را برگردان
            if (lastIndex == null || count == null)
                return new CustomResult {result = _context.Queries.ToList(), Status = CustomResultType.success};

            // مواظب خطا ها باش
            count = count == 0 ? 10 : count;
            var dt = _context.Queries.AsQueryable();
            if (lastIndex == 0)
            {
                dt = dt.Take(count.Value);
            }
            else
            {
                dt = dt.Skip(lastIndex.Value).Take(count.Value);
            }

            // با paging برگردان
            return new CustomResult {result = dt, Status = CustomResultType.success};
        }

        [HttpGet]
        public CustomResult LoadQuery(long id)
        {
            try
            {
                var finded = _context.Queries.Find(id);
                if (finded == null)
                    throw new Exception("کوئری یافت نشد");
                return new CustomResult {result = finded, Status = CustomResultType.success};
            }
            catch (Exception e)
            {
                return new CustomResult {Message = e.Message + " خطا در عملیات ", Status = CustomResultType.fail};
            }

            return new CustomResult
            {
                Message = "عملیات با موفقیت انجام شد ",
                Status = CustomResultType.success
            };
        }


        private void InsertQurey(Query query)
        {
            foreach (var queryJoinTable in query.joinTables)
            {
                queryJoinTable.leftTable = _context.Models.Find(queryJoinTable.leftTable.Id);
                queryJoinTable.rightTable = _context.Models.Find(queryJoinTable.leftTable.Id);

                queryJoinTable.rightProperty = _context.Properties.Find(queryJoinTable.rightProperty.Id);
                queryJoinTable.leftProperty = _context.Properties.Find(queryJoinTable.leftProperty.Id);
            }

            foreach (var queryModel in query.models)
            {
                queryModel.Model = _context.Models.Find(queryModel.Model.Id);
            }

            foreach (var querySelectedProperty in query.selectedProperties)
            {
                querySelectedProperty.Property = _context.Properties.Find(querySelectedProperty.Property.Id);
            }

            query.mainTable = _context.Models.Find(query.mainTable.Id);
            _context.Queries.Add(query);
        }

        [HttpPost]
        public CustomResult SaveQuery(Query query)
        {
            using (var tr = _context.Database.BeginTransaction())
            {
                try
                {
                    if (query.Id == 0)
                    {

                        InsertQurey(query);
                    }
                    else
                    {
                        var indb = _context.Queries.Where(q => q.Id == query.Id).FirstOrDefault();
                        if (indb == null)
                            throw new Exception("پیدا نشد");


                        DeleteList(indb.joinTables);
                        DeleteList(indb.addParameterFields);
                        DeleteList(indb.selectedProperties);
                        _context.Entry(indb).State = EntityState.Deleted;



                        _context.SaveChanges();
                        InsertQurey(query);
                    }

                    _context.SaveChanges();
                    tr.Commit();
                }
                catch (Exception e)
                {
                    tr.Rollback();
                    return new CustomResult {Message = e.Message + "خطا در عملیات ", Status = CustomResultType.fail};
                }
            }

            return new CustomResult {Message = "عملیات با موفقیت انجام شد ", Status = CustomResultType.success};
        }


        public void DeleteList<T>(ICollection<T> list) where T : class
        {
            foreach (var item in list.ToList())
            {
                _context.Entry<T>(item).State = EntityState.Deleted;
            }
        }
    }
}