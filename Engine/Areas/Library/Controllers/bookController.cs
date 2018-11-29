using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebAppIDEEngine.Models;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Utitliy;
using Entities;
using ServiceLayer.Systems.Library;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;


namespace Engine.Areas.Library.Controllers
{
    /// <summary>
    /// bookController
    /// bookController
    /// </summary>
    ///
    public class bookController : EBaseAppController<Book,CommonParameter>
    {
        private Injector _injector = new Injector();
        private BookService _bookservice;

        public bookController()
        {
            this._bookservice = _injector.Inject<BookService>();
            this._engineService = _injector.Inject<BookService>();
      
        }
        

        [HttpPost]
        public ActionResult getAll(long id)
        {
            try
            {
                var res = _bookservice.GetAll(5);
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}