using System;
using System.Linq;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiHomeController : Controller
    {
        private UiEngineDataProvider _provider = new UiEngineDataProvider();
        public static readonly string DataTable = "DataTable";
        public static readonly string TableObject = "TableObject";
        public static readonly string ActionURL = "ActionURL";
        public static readonly string ApiActionURL = "ApiActionURL";
        public static readonly string Form = "Form";
        public static readonly string UiTableItems = "uiTableItems";

        // GET
        public ActionResult ShowView(string tableName)
        {
            try
            {
                string SubSystemName = "";
                string ControllerName = "";
                string ControllerMethod = "";
                string ServiceMethodName = "";
                _provider.GetTable(tableName, ViewData, Request, SubSystemName,
                    ControllerName, ActionURL, ServiceMethodName);

                return View();
            }
            catch (UiEngineException e)
            {
                throw e;
            }
        }


        /*// GET
        public ActionResult ShowViewPartial(string TableName)
        {
            return PartialView("TablePartial");
        }*/

        /*// GET
        public ActionResult ShowForm()
        {
            return View();
        }*/
    }
}