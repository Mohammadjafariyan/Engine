using System;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Controllers.AbstractControllers.AttributeBased
{
    public abstract class BaseEngineController<T,Parameter> : Controller where Parameter : IActionParameter where T:IModel
    {
        protected Service.AbstractControllers.IEngineService<T> _engineService;
        protected Utitliy.Injector _injector;


        
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