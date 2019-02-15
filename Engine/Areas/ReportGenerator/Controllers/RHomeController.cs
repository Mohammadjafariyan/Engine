using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Engine.Areas.ReportGenerator.Controllers
{
    [Authorize(Roles = "SuperUser,SystemAdmin")]
    public class RHomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
