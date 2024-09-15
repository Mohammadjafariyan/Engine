using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using Engine.Areas.Absence.Models;
using Engine.Areas.Absence.Service;
using Engine.Entities.Data;
using Engine.Entities.Data.Absence.Models;
using Engine.Models;
using Engine.ServiceLayer.Engine;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Absence.Controllers
{
    public class AttendanceHomeController : EBaseAppController<BiometricData,CommonParameter>
    {
        private PersonnelTaradodInfoService _service = new PersonnelTaradodInfoService();


        // GET
        public ActionResult Index()
        {
          
            /*
            List<BiometryCalculatedDetail> summaries = new List<BiometryCalculatedDetail>();
            using (var db = new EngineContext())
            {

                PersianDateTime iranDateTimeStart = new PersianDateTime(PersianDateTime.Now.Year,PersianDateTime.Now.Month,1);

                var iranDateTimeEnd = iranDateTimeStart.AddMonths(1).AddDays(-1);
                
                var user = db.Users
                    .Where(s => s.UserName == User.Identity.Name)
                    .FirstOrDefault();

                if (user == null)
                {
                    throw new Exception("اکانت شما یافت نشد لطفا مجدد ثبت نام یا دوباره وارد شوید");
                }

                var query = db.Personnels.AsQueryable();

                query = query.Where(s => s.ApplicationUserId == user.Id);

                if (user.PersonnelType == PersonnelTypeEnm.Employee)
                {
                    Personnel personnel = db.GetCurrentUserPersonnel(user.Id, false);

                    query = query.Where(s => s.WorkplacePersonnels.Any(p => p.PersonnelId == personnel.Id));
                }


                var personnels = query.Where(q => q.WorkGroup.WorkGroupObligatedRanges.Count > 0)
                    .ToList();
                foreach (var personnel in personnels)
                {
                    var det = SummaryHelperGetTimeSheetForOnePersonnel(personnel.Id, from_dt, to_dt);
                    det.PersonnelName = personnel.Name + " " + personnel.LastName;
                    det.Id = personnel.Id;
                    summaries.Add(det);
                }
            }
            */

            return View();
        }


        private BiometryCalculatedDetail SummaryHelperGetTimeSheetForOnePersonnel(
            long personnelId, DateTime @from, DateTime to)
        {
            var biometricData = _service.GetBiometricData(personnelId, from, to);

            var obligatedRange = _service.GetObligatedRange(personnelId);

            List<BiometryCalculatedDetail> taradodInfoCalculated =
                _service.CompareAndJoin(from, to, biometricData, obligatedRange);

            BiometryCalculatedDetail totalCalculated = _service.CalculateTotal(taradodInfoCalculated);

            return totalCalculated;
        }
        
    }
}