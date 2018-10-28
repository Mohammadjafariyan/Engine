using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Service.AbstractControllers;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.Core;
using System.Data.Entity;

namespace ServiceLayer.Systems
{
    public class CommonService<M> : BaseEngineService<M> where M : class, WebAppIDEEngine.Models.ICore.IModel
    {
    }


    public class FormService : CommonService<Form>
    {

        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.Forms.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
              .ToListAsync();
        }
    }
    public class ActionService : CommonService<WebAppIDEEngine.Models.Core.Action>
    {
        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.Actions.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
              .ToListAsync();
        }
    }
    public class PropertyService : CommonService<WebAppIDEEngine.Models.Core.Property>
    {
        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.Properties.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.NameInModel })
              .ToListAsync();
        }
    }

    public class NavigationPropertyService : CommonService<WebAppIDEEngine.Models.Core.NavigationProperty>
    {
        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.NavigationProperties.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
              .ToListAsync();
        }
    }


    public class ModelService : CommonService<WebAppIDEEngine.Models.Core.Model>
    {
        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.Models.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
              .ToListAsync();
        }
    }
    public class PanelService : CommonService<Panel>
    {

        public async override Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await EngineContext.Panels.Select(f =>
             new IDropDownOption { Id = f.Id.ToString(), Value = f.Name })
              .ToListAsync();
        }
    }



}
