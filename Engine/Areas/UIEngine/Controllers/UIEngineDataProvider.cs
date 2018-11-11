using System;
using System.Linq;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiEngine;
using WebAppIDEEngine.Models;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.App.Controllers
{
    public class UIEngineDataProvider
    {
        
        public Table GetTable(string tableName)
        {
            using (var db=new EngineContext())
            {
                var table=db.Tables.FirstOrDefault(t => t.Name == tableName);
                if (table == null)
                    throw new UIEngineException("جدول یافت نشد");
                return table;
            }
        }

        public dynamic CallDefineControllerMethod(long methodId)
        {
            DefineControllerMethod method = null;
            using (var db=new EngineContext())
            {
                 method = db.DefineControllerMethodes.Find(methodId);
                if (method == null)
                    throw new UIEngineException("جدول یافت نشد");
            }
            
        }
    }

    public class UIEngineException : Exception
    {
        public UIEngineException(string msg):base(msg)
        {
        }
    }
}