using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Engine.Areas.ReportGenerator.Controllers
{
   // [Authorize]
    public class RHomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
