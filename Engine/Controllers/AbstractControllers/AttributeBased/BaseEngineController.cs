using System;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Entities.Models.ICore;
using ViewModel.ActionTypes;

namespace Engine.Controllers.AbstractControllers.AttributeBased
{
    [Authorize(Roles = "SuperUser,SystemAdmin")]
    public abstract class BaseEngineController<T,Parameter> : Controller where Parameter : IActionParameter where T:IModel
    {
        protected Service.AbstractControllers.IEngineService<T> _engineService;
        protected Utitliy.Injector _injector;

        /*
        protected override void OnException(ExceptionContext filterContext)
        {
            // Log the exception
            //Logger.LogError(filterContext.Exception);

            // Redirect to the error view
            filterContext.Result = new ViewResult
            {
                ViewName = "Error"
            };

            ViewData["errorMessage"] = filterContext.Exception?.Message;
            ViewData["stackTrace"] = filterContext.Exception?.StackTrace;
            // Mark the exception as handled
            filterContext.ExceptionHandled = true;
        }
        */
        
        [HttpGet]
        public virtual ActionResult GetDropDown(IDropDownParameter p)
        {
            return Json(_engineService.GetDropDown(p),JsonRequestBehavior.AllowGet);
        }

        protected virtual Task<IDataTable> GetDataTableDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }

        protected virtual Task<ITreeNode> GetTreeDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }

        protected virtual Task<IDropDownOption> GetMultiSelectDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }

       

    }

    [Serializable]
    internal class BaseEngineException : Exception
    {
        public BaseEngineException()
        {
        }

        public BaseEngineException(string message) : base(message)
        {
        }

        public BaseEngineException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected BaseEngineException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}