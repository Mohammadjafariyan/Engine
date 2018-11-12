using System.Linq;
using System.Web.Mvc;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiHomeController : Controller
    {
        private UiEngineDataProvider _provider = new UiEngineDataProvider();
        public static readonly string DataTable = "DataTable";
        public static readonly string TableObject = "TableObject";

        // GET
        public ActionResult ShowView(string tableName)
        {
            try
            {
                var table = _provider.GetTable(tableName);

                var methodId = table.TableMethods.Select(t => t.DefineControllerMethodId).First();
                var debatable = _provider.CallServiceMethod(methodId, Request.Form, Request.Params);


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