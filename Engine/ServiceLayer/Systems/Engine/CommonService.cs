using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Service.AbstractControllers;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.Core;
using System.Data.Entity;
using Engine.Entities.Models.Core.AppGeneration;

namespace ServiceLayer.Systems
{
    public class CommonService<M> : BaseEngineService<M> where M : class, WebAppIDEEngine.Models.ICore.IModel
    { 
        
        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            var dt=EngineContext.Set<M>();
            return await dt.Select(f =>
                    new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
                .ToListAsync();
        }
    }
    /// <summary>
    /// تعریف سرویس
    /// </summary>
    public class DefineServiceService : CommonService<DefineService>
    {

        
    }
    
    
    /// <summary>
    /// سرویس متد سرویس زیر سیستم
    /// </summary>
    public class DefineControllerMethodService : CommonService<DefineControllerMethod>
    {

        
    } 
    /// <summary>
    /// سرویس تعریف کنترولر
    /// </summary>
    public class DefineControllerService : CommonService<DefineController>
    {

        
    } 
    
   
    
    
    /// <summary>
    /// سرویس تعریف متد سرویس
    /// </summary>
    public class ServiceMethodService : CommonService<ServiceMethod>
    {

        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            var dt=EngineContext.Set<ServiceMethod>();
            return await dt.Select(f =>
                    new IDropDownOption { Id = f.Id.ToString(), Value = f.Name + $@"(${f.DefineService.Name})" })
                .ToListAsync();
        }
    } 
    
    public class FormService : CommonService<Form>
    {

       
    } 
    
    /// <summary>
    /// کوئری
    /// </summary>
    public class QueryService : CommonService<SubSystem>
    {

      
    }
    
    

    
    /// <summary>
    /// سرویس زیر سیسیتم
    /// </summary>
    public class SubSystemServiceService : CommonService<SubSystem>
    {

    }
    
    /// <summary>
    ///  زیر سیسیتم
    /// </summary>
    public class SubSystemService : CommonService<SubSystem>
    {

    }
    public class ActionService : CommonService<WebAppIDEEngine.Models.Core.Action>
    {
        
    }
    public class PropertyService : CommonService<WebAppIDEEngine.Models.Core.Property>
    {
        
    }

    public class NavigationPropertyService : CommonService<WebAppIDEEngine.Models.Core.NavigationProperty>
    {
      
    }


    public class ModelService : CommonService<WebAppIDEEngine.Models.Core.Model>
    {
       
    }
    public class PanelService : CommonService<Panel>
    {

      
    }



}
