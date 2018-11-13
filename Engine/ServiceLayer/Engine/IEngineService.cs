using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Engine.Attributes;
using ViewModel.ActionTypes;
using ServiceLayer.Engine;
using WebAppIDEEngine.Models.ICore;
using System.Collections.Specialized;
using System.Web.Mvc;
using System;
using WebAppIDEEngine.Models;

namespace Engine.Service.AbstractControllers
{
    public interface IEngineService<M> : IBaseEngineService, ICRUDService<M> where M : IModel
    {
    }

    public interface IBaseEngineService
    {
    //    IDataTable Search<T>(NameValueCollection nameValues) where T : IModel, new();

        EngineContext EngineContext { get; set; }

        Dictionary<string, List<SelectListItem>> GetEnumsAttributes<TEnum>(object model);

        Task<Dictionary<string, IQueryable<IDataTable> >> GetDataTableDataAsync(Dictionary<string, DataTableAttribute> datatables, IDataTableParameter @params);
        Task<Dictionary<string, List<IDropDownOption>>> GetDropdownDataAsync(Dictionary<string, DropDownAttribute> dropdowns, IDropDownParameter @params);
        Dictionary<string, DropDownAttribute> GetModelDropdownAttributes<T>();
        Dictionary<string, MultiSelectAttribute> GetModelMultiSelectAttributes<T>();
        Dictionary<string, DataTableAttribute> GetModelTableAttributes<T>();
        Dictionary<string, TreeAttribute> GetModelTreeAttributes<T>();
        Task<Dictionary<string, List<IDropDownOption>>> GetMultiSelectDataAsync(Dictionary<string, MultiSelectAttribute> multiselect, IMultiSelectParameter @params);
        Task<Dictionary<string, ITreeNode>> GetTreeDataAsync(Dictionary<string, TreeAttribute> trees, ITreeParameter @params);
        void SetData(string[] v, dynamic[] dataTableAttribute, ViewDataDictionary r) ;

    }
}