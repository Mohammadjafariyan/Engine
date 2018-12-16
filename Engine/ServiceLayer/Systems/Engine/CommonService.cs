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
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace ServiceLayer.Systems
{
    public class CommonService<M> : BaseEngineService<M> where M : class, WebAppIDEEngine.Models.ICore.IModel
    { 
        
        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            using (var EngineContext = new EngineContext())
            {
                var dt=EngineContext.Set<M>();
                return await dt.Select(f =>
                        new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
                    .ToListAsync();
            }

           
        }
    }
    /// <summary>
    /// تعریف سرویس
    /// </summary>
    public class DefineServiceService : CommonService<DefineService>
    {

        
    }

    
    /// <summary>
    /// اتصال ورودی  ها به فرم
    /// </summary>
    public class UiFormInputService : CommonService<UiFormInput>
    {

    }
    /// <summary>
    /// اتصال متد ها به جداول
    /// </summary>
    public class TableMethodsService : CommonService<TableMethod>
    {
        
    }
    
      
    /// <summary>
    /// تعریف جداول یو آی
    /// </summary>
    public class TablesService : CommonService<EjTable>
    {
        
    }
    
    
    /// <summary>
    /// سرویس متد ورودی
    /// </summary>
    public class UiInputMethodService : CommonService<UiInputMethod>
    {
        
    }
    
    
    /// <summary>
    /// سرویس متد سرویس زیر سیستم
    /// </summary>
    public class DefineControllerMethodService : CommonService<DefineControllerMethod>
    {
        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {

            using (var EngineContext = new EngineContext())
            {

                var dt = EngineContext.Set<DefineControllerMethod>();
                return await dt.Select(f =>
                    new IDropDownOption { Id = f.Id.ToString(), Value = f.DefineController.Name  + "(" + f.Name + ")" }).ToListAsync();

            }
  }

    } 
    /// <summary>
    /// سرویس تعریف کنترولر
    /// </summary>
    public class DefineControllerService : CommonService<DefineController>
    {
    }

    /// <summary>
    /// سرویس Input ها
    /// </summary>
    public class UiInputService : CommonService<UiInput>
    {
    }


    /// <summary>
    /// اتصال فرم به متد 
    /// </summary>
    public class UiFormControllerMethodService : CommonService<UiFormControllerMethod>
    {
    }

    /// <summary>
    /// اتصال آیتم به فرم 
    /// </summary>
    public class UiFormItemService : CommonService<UiFormItem>
    {
    }
    

    /// <summary>
    /// سرویس فرم ها
    /// </summary>
    public class UiFormService : CommonService<UiForm>
    {
    }

    


    /// <summary>
    /// سرویس تعریف متد سرویس
    /// </summary>
    public class ServiceMethodService : CommonService<ServiceMethod>
    {

        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {

            using (var EngineContext = new EngineContext())
            {

                var dt=EngineContext.Set<ServiceMethod>();
                return await dt.Select(f =>
                    new IDropDownOption { Id = f.Id.ToString(), Value = f.Name + "("+f.DefineService.Name+")"}).ToListAsync();

            }

          }
    }

    
    /// <summary>
    /// سرویس اتصال فرم ها ی جدول
    /// </summary>
    public class UiTableFormService : CommonService<UiTableForm>
    {

    }
    public class FormService : CommonService<Form>
    {

    }


    /// <summary>
    /// سرویس ایتم های جدول
    /// </summary>
    public class UiTableItemService : CommonService<UiTableItem>
    {


    }






    /// <summary>
    /// کوئری
    /// </summary>
    public class QueryService : CommonService<Query>
    {

      
    }
    
    

    /*

    /// <summary>
    /// سرویس زیر سیسیتم
    /// </summary>
    public class SubSystemServiceService : CommonService<DefineService>
    {

    }*/
    
    /// <summary>
    ///  زیر سیسیتم
    /// </summary>
    public class SubSystemService : CommonService<SubSystem>
    {

    }
    public class ActionService : CommonService<WebAppIDEEngine.Models.Core.Action>
    {
        
    }
    /// <summary>
    /// سرویس آیتم های سیستم
    /// </summary>
    public class UiItemsService : CommonService<UiItem>
    {
    }
    
    public class PropertyService : CommonService<WebAppIDEEngine.Models.Core.Property>
    {
        public override async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {

            using (var EngineContext = new EngineContext())
            {
                         
                var dt = EngineContext.Set<Property>();
                return await dt.Select(f =>
                    new IDropDownOption { Id = f.Id.ToString(), Value = f.Model.Name  + "(" + f.NameInModel + ")" }).ToListAsync();

                
            }
                
        }
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
