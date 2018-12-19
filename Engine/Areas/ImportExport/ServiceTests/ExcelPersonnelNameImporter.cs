using System;
using System.Collections.Generic;
using System.Linq;
using Engine.Absence.Models;
using ServiceLayer.Absence;
using WebAppIDEEngine.Models;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public class ExcelPersonnelNameImporter : BaseExcelImporter<Personnel, PersonnelService>
    {
        public override void ValidateModels()
        {
            base.ValidateModels();

            // گروه کاری زده نشده
            var workupNematodes = Models.Where(m => m.WorkGroupId == 0).ToList();
            //گروه کاری زده شده
            var hasWorkgroup = Models.Where(m => m.WorkGroupId != 0).ToList();
            
            if(Table==null)
                throw new Exception("جدول نال است");

            // کاربر تایید کرده آنهایی که صفر دارند گروه کاری جدید زده شود
            if (Table.Confirmed)
            {
                // Valided does workgroupIds is exist ?
                using (var db = new EngineContext())
                {
                    var groupIds = hasWorkgroup.Select(g => g.WorkGroupId).ToList();

                    if(groupIds.Count>0)
                    if (!db.WorkGroups.Any(g => groupIds.Any(groupId => groupId == g.Id)))
                    {
                        throw new ExcelImporterException(
                            "کد های گروه کاری ثبت شده اشتباه است ، برای ایجاد گروه کاری جدید صفر یا خالی وارد نمایید ");
                    }
                    
                }

                WorkGroup @group;
                if (workupNematodes.Count() > 0)
                {
                    using (var db = new EngineContext())
                    {
                        @group = new WorkGroup();
                        @group.Name = DateTime.Now.TimeOfDay + " گروه کاری ایجاد شده توسط سیستم ";
                        db.WorkGroups.Add(@group);
                        db.SaveChanges();
                    }

                    foreach (var model in workupNematodes)
                    {
                        model.WorkGroupId = @group.Id;
                    }
                }
            }
            else
            {
                var msg = string.Join("<br>",
                    workupNematodes.Select(w => w.Code + " " + w.Name + " " + w.LastName).ToArray());
                throw new ExcelImporterException("فیلد های زیر دارای ستون گروه کاری نیستند میتوانید آن ردیف هایی که دارای گروه کاری نیستند یک گروه کاری ایجاد شود "+ "<br>"+msg );
            }
        }
    }

    public class ExcelImporterException : Exception
    {
        public ExcelImporterException(string msg):base(msg)
        {
            
        }
    }
}