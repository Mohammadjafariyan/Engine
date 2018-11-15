using System;
using System.Linq;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiHomeController : Controller
    {
        private UiFormDataProvider _uiFormprovider = new UiFormDataProvider();
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
                if (string.IsNullOrEmpty(tableName))
                {
                    throw new Exception("tableName is null");
                }

                tableName = tableName.ToLower().TrimEnd();

                var table = _provider.GetTable(tableName);

                var searchForm = table.UiTableForms.FirstOrDefault();
                if (searchForm != null)
                    _uiFormprovider.GetForm(searchForm.Name, ViewData, isTableForm: true,
                        postType: UiFormControllerMethodType.Search);

                var methodId = table.TableMethods.Select(t => t.DefineControllerMethodId).First();

                string SubSystemName = "";
                string ControllerName = "";
                string ControllerMethod = "";
                string ServiceMethodName = "";

                var debatable = _provider.CallServiceMethod(methodId, Request.Form, Request.Params,
                    out SubSystemName, out ControllerName, out ControllerMethod
                    , out ServiceMethodName);

                ControllerName = ControllerName.Replace("Controller", "");

                ViewData[ApiActionURL] = Request.ApplicationPath +
                                         $@"{SubSystemName}/api/{ControllerName}/{ControllerMethod}" +
                                         Request.Url.Query;
                ViewData[ActionURL] = Request.ApplicationPath +
                                      $@"{SubSystemName}/{ControllerName}/{ControllerMethod}" + Request.Url.Query;
                ViewData[TableObject] = table;
                ViewData[DataTable] = debatable;
                ViewData[UiTableItems] = table.UiTableItems;

                return View(table);
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