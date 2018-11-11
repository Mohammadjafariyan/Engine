using System.Linq;
using System.Web.Mvc;

namespace Engine.Areas.App.Controllers
{
    public class UIEngineController : Controller
    {
        private UIEngineDataProvider _provider=new UIEngineDataProvider(); 
        public static readonly string DataTable = "DataTable";
        public static readonly string TableObject = "TableObject";

        // GET
        public ActionResult ShowView(string TableName)
        {
            try
            {
                var table= _provider.GetTable(TableName);
                _provider.CallDefineControllerMethod(table.TableMethods.FirstOrDefault());
                ViewData[TableObject] = table;
            }
            catch (UIEngineException e)
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