using System;
using System.Linq;
using System.Web.Mvc;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiHomeController : Controller
    {
        private UiEngineDataProvider _provider = new UiEngineDataProvider();
        public static readonly string DataTable = "DataTable";
        public static readonly string TableObject = "TableObject";
        public static readonly string ActionURL = "ActionURL";
        public static readonly string ApiActionURL = "ApiActionURL";

        // GET
        public ActionResult ShowView(string tableName)
        {
            try
            {
                if (string.IsNullOrEmpty(tableName))
                {
                    throw new Exception("tableName is null");
                }

                tableName = tableName.ToLower().TrimEnd();

                var table = _provider.GetTable(tableName);

                var methodId = table.TableMethods.Select(t => t.DefineControllerMethodId).First();

                string SubSystemName = "";
                string ControllerName = "";
                string ControllerMethod = "";
                string ServiceMethodName = "";

                var debatable = _provider.CallServiceMethod(methodId, Request.Form, Request.Params,
                    out SubSystemName, out ControllerName, out ControllerMethod
                    , out ServiceMethodName);

                ControllerName=ControllerName.Replace("Controller", "");
                
                ViewData[ApiActionURL] =Request.ApplicationPath+ $@"{SubSystemName}/api/{ControllerName}/{ControllerMethod}"+Request.Url.Query;
                ViewData[ActionURL] =Request.ApplicationPath+ $@"{SubSystemName}/{ControllerName}/{ControllerMethod}"+Request.Url.Query;
                ViewData[TableObject] = table;
                ViewData[DataTable] = debatable;
            }
            catch (UiEngineException e)
            {
                throw e;
            }

            return View();
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