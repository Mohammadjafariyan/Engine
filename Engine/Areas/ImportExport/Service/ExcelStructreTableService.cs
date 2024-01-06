using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Engine.Areas.ImportExport.ServiceTests;
using Engine.Entities.Data;
using Microsoft.Ajax.Utilities;
using ServiceLayer.Absence;
using ServiceLayer.Systems;
using WebAppIDEEngine.Models;

namespace Engine.Areas.ImportExport.Service
{
    public class ExcelStructreTableService : CommonService<ExcelStructreTable>
    {
        public override void Delete(long id)
        {
            using (var db = new EngineContext())
            {
                var model = db.ExcelStructreTables.Find(id);
                if (model == null)
                {
                    throw new Exception("مدل یافت نشد");
                }

                model.Nodes.ToList().ForEach(n => db.Entry(n).State = EntityState.Deleted);

                db.Entry(model).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }

        public override void Save(ExcelStructreTable model)
        {
            if (model.Nodes.Count==0)
            {
                throw new Exception("هیچ نودی ارسال نشده است");
            }
            if (model.Nodes.DistinctBy(n => n.NumberInExcel).Count() != model.Nodes.Count)
            {
                throw new Exception("شماره ستون نود ها دیستینکنت نیستند");
            }

            if (model.Nodes.DistinctBy(n => n.ColumnName).Count() != model.Nodes.Count)
            {
                throw new Exception("نام ستون نود ها دیستینکنت نیستند");
            }

            if (model.Nodes.Any(n => string.IsNullOrEmpty(n.ColumnName)))
            {
                throw new Exception("نام ستون نود ها نال است");
            } 
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("نام ساختار خالی است");
            }


            using (var db = new EngineContext())
            {
                if (model.Id == 0)
                {
                    if (model.Nodes.Any(n => n.IsRemoved))
                    {
                        throw new Exception("در داخل نود های ارسال شده ، نود با علامت حذف شده موجود است");
                    }

                    db.ExcelStructreTables.Add(model);
                }
                else
                {
                    //edit
                    var record = db.ExcelStructreTables.Find(model.Id);

                    if (record == null)
                    {
                        throw new JServiceException("رکورد موجود نیست");
                    }

                    db.Entry(record).CurrentValues.SetValues(model);
                    SaveRemoveableList(record, model.Nodes, db);
                }

                db.SaveChanges();
            }
        }
    }
}