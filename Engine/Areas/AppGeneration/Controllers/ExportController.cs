using System;
using System.Linq;
using System.Web.Mvc;
using AppSourceGenerator;
using Engine.Entities.Models.Core.AppGeneration;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class ExportController : AppController<SubSystem, CommonParameter>
    {
        IGenerator g = new MvcProjectGenerator();
  
        public ExportController()
        {
            this._engineService = new SubSystemService();
        }


        [HttpPost]
        public ActionResult Export(string filepath, long subsystemId,
            int type)
        {
            if (string.IsNullOrEmpty(filepath))
            {
                ViewBag.alertmsg = "مسیر را انتخاب کنید";
                return View("GetDataTable");
            }

            try
            {

                var path = filepath;
                g.CreateIsNotExist(path);
                g.LoadProject(path);

                var subsystem = _engineService.EngineContext.SubSystem.Where(d => d.Id == subsystemId).ToList();

                if (type == 1)
                {
                    g.MakeSubsystems(subsystem);
                    
                    var d = subsystem.Select(s => s.DefineControllers.ToList()).FirstOrDefault();
                    g.MakeControllers(d);
                   
                    var d1 = subsystem.Select(s => s.DefineServices.ToList()).FirstOrDefault();
                    g.MakeServices(d1);
                   
                    var d3 = subsystem.Select(s => s.DefineControllers.ToList()).FirstOrDefault();
                    g.MakeApiControllers(d3);
                    
                    var d4 = _engineService.EngineContext.Models.ToList();
                    g.MakeModels(d4);

                    ViewBag.successmsg = "با موفقیت ایجاد شد";
                    return View("GetDataTable");

                }
                else if (type == 2)
                {
                    throw new Exception("این نوع پیاده سازی نشده است");
                }
                else
                {
                    throw new Exception("ساپورت نشده");
                }

            }
            catch (Exception e)
            {
                ViewBag.alertmsg = e.Message;
                return View("GetDataTable");
            }
        }
    }
}