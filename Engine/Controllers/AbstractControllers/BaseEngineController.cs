using Engine.Attributes;
using Engine.Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;
using System.Reflection;
using System.Threading.Tasks;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.ICore;
using WebAppIDEEngine.Models;

namespace Engine.Controllers.AbstractControllers
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