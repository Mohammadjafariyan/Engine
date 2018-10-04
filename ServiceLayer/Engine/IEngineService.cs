using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Engine.Attributes;
using ViewModel.ActionTypes;
using ServiceLayer.Engine;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Controllers.AbstractControllers
{
    public interface IEngineService<M>:ICRUDService<M> where M:IModel
    {
        Task<Dictionary<string, IQueryable<IDataTable>>> GetDataTableDataAsync(Dictionary<string, DataTableAttribute> datatables);
        Task<Dictionary<string, List<IDropDownOption>>> GetDropdownDataAsync(Dictionary<string, DropDownAttribute> dropdowns);
        Dictionary<string, DropDownAttribute> GetModelDropdownAttributes<T>();
        Dictionary<string, MultiSelectAttribute> GetModelMultiSelectAttributes<T>();
        Dictionary<string, DataTableAttribute> GetModelTableAttributes<T>();
        Dictionary<string, TreeAttribute> GetModelTreeAttributes<T>();
        Task<Dictionary<string, List<IDropDownOption>>> GetMultiSelectDataAsync(object multiselect);
        Task<Dictionary<string, ITreeNode>> GetTreeDataAsync(Dictionary<string, TreeAttribute> trees);
        void SetData<T>(string[] v, dynamic[] dataTableAttribute, IDictionary<string, object> r);
    }
}