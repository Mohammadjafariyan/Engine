using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Service.AbstractControllers;
using Engine.Utitliy;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core.QueryBuild;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiEngineDataProvider
    {
        private Injector _injector = new Injector();

        public Table GetTable(string tableName)
        {
            using (var db = new EngineContext())
            {
                var table = db.Tables.FirstOrDefault(t => t.Name == tableName);
                if (table == null)
                    throw new UiEngineException("جدول یافت نشد");
                return table;
            }
        }

        public dynamic CallServiceMethod(long methodId, NameValueCollection formParams,
            NameValueCollection requestParams)
        {
            DefineControllerMethod method = null;
            string serviceName;
            List<AddParameterForm> queryAddParameterFields;
            using (var db = new EngineContext())
            {
                method = db.DefineControllerMethodes.Find(methodId);
                if (method == null)
                    throw new UiEngineException("جدول یافت نشد");
                serviceName = method.ServiceMethod.DefineService.Name;
                queryAddParameterFields =
                    method.ServiceMethod.Query.addParameterFields.ToList();
            }

            foreach (var field in queryAddParameterFields)
            {
              var formInput=  formParams.AllKeys.FirstOrDefault(a => a == field.Name);
              var queryParam=  requestParams.AllKeys.FirstOrDefault(a => a == field.Name);

                field.Value = formParams[formInput];
                field.Value = requestParams[queryParam];
            }

            var vals=queryAddParameterFields.OrderBy(q=>q.Order).Select(q => q.Value).ToList();

            return InjectAndCall(serviceName, method.Name,vals);
        }

        public dynamic InjectAndCall(string serviceName, string actionName, params object[] prameters)
        {
            var service = _injector.Inject<IBaseEngineService>(serviceName) as IBaseEngineService;

            if (service == null)
                throw new Exception("service is null");
            var methodInfo = service.GetType().GetMethods().First(m => m.Name == actionName);
            return (IDataTable) methodInfo.Invoke(service, prameters);
        }
    }


    public class UiEngineException : Exception
    {
        public UiEngineException(string msg) : base(msg)
        {
        }
    }
}