using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AppSourceGenerator;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using ServiceLayer.Systems;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class AutoGenerationController : AppController<Model, CommonParameter>
    {
        IGenerator g = new MvcProjectGenerator();

        public AutoGenerationController()
        {
            this._engineService = new ModelService();
        }


        [HttpPost]
        public ActionResult Create(long modelId, string subSystemName)
        {
            try
            {
                using (var db = new EngineContext())
                {
                    var model = db.Models.Find(modelId);
                    if (model == null)
                    {
                        throw new Exception("model is null");
                    }

                    if (model.DefineControllers.Count > 0)
                        throw new Exception("قبلا برای این مدل کنترلر تعریف شده است");

                    var subsystem = new SubSystem();
                    subsystem.Name = subSystemName;

                    var service = new DefineService();
                    service.Name = model.Name + "sService";
                    service.ModelId = model.Id;
                    service.Translate = model.Translate + " سرویس ";

                    service.ServiceMethods = GetDefaultServices();

                    subsystem.DefineServices.Add(service);

                    var controller = new DefineController();
                    controller.Name = model.Name + "sController";
                    controller.ModelId = model.Id;
                    controller.Translate = model.Translate + " کنترولر ";

                    controller.DefineControllerMethods = GetDefaultControllers();

                    subsystem.DefineControllers.Add(controller);


                    var table = new EjTable();
                    table.Name = model.Name + "sTable";
                    table.Translate = model.Translate + " جدول ";
                    table.UiTableItems = GetDefaultItemsForTable();
                    table.TableMethods.Add(new TableMethod
                    {
                        DefineControllerMethod = controller.DefineControllerMethods.First(d =>
                            d.MethodType == MethodType.GetDataTable),
                    });

                    var form = new UiForm();
                    form.Name = model.Name + "sForm";
                    form.Translate = model.Translate + " ثبت ";
                    form.UiFormControllerMethods.Add(new UiFormControllerMethod
                    {
                        DefineControllerMethod = controller.DefineControllerMethods.First(d =>
                            d.MethodType == MethodType.Save),
                        Type = UiFormControllerMethodType.Save,
                        Translate = "ثبت"
                    });
                    form.UiFormControllerMethods.Add(new UiFormControllerMethod
                    {
                        DefineControllerMethod = controller.DefineControllerMethods.First(d =>
                            d.MethodType == MethodType.Save),
                        Type = UiFormControllerMethodType.Search,
                        Translate = "جستجو"
                    });

                    var tableSearchForm = new UiTableForm();
                    tableSearchForm.UiForm = form;
                    tableSearchForm.EjTable = table;
                    tableSearchForm.Translate = form.Translate;
                    tableSearchForm.Name = tableSearchForm.Name;
                }

                return View();
            }
            catch (Exception e)
            {
                ViewBag.alertmsg = e.Message;
                return View("GetDataTable");
            }
        }

        private ICollection<UiTableItem> GetDefaultItemsForTable()
        {
            throw new NotImplementedException();
        }

        private ICollection<DefineControllerMethod> GetDefaultControllers()
        {
            var names = Enum.GetNames(typeof(MethodType));
            List<DefineControllerMethod> methosList = new List<DefineControllerMethod>();
            foreach (var name in names)
            {
                var method = new DefineControllerMethod
                {
                    Name = name,
                    MethodType =
                        (MethodType) Enum.Parse(typeof(MethodType), name),
                    Translate = name,
                };
                methosList.Add(method);
            }

            return methosList;
        }

        private ICollection<ServiceMethod> GetDefaultServices()
        {
            var names = Enum.GetNames(typeof(MethodType));
            List<ServiceMethod> methosList = new List<ServiceMethod>();
            foreach (var name in names)
            {
                var method = new ServiceMethod
                {
                    Name = name,
                    MethodType =
                        (MethodType)Enum.Parse(typeof(MethodType), name),
                    Translate = name,
                };
                methosList.Add(method);
            }

            return methosList;
        }
    }
}