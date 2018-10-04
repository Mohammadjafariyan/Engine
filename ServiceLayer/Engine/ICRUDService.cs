using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.ICore;

namespace ServiceLayer.Engine
{
    public interface ICRUDService<T> where T:IModel
    {

        IDataTable GetDataTable(IDataTableParameter p);
        ITreeNode GetTree(ITreeParameter p);
        List<IDropDownOption> GetDropDown(IDropDownParameter p);
        List<IDropDownOption> GetMultiSelect(IMultiSelectParameter p);



        Task<IDataTable> GetDataTableAsync(IDataTableParameter p);
        Task<ITreeNode> GetTreeAsync(ITreeParameter p);
        Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p);
        Task<List<IDropDownOption>> GetMultiSelectAsync(IMultiSelectParameter p);

        void Save(IModel p);
        IModel Delete(long id);
        IModel GetForEdit(long id);
        IModel GetById(long id);

        Task SaveAsync(IModelPostParameter<T> p);
        Task<IModel> DeleteAsync(long id);
        Task<IModel> GetForEditAsync(long id);
        Task<IModel> GetByIdAsync(long id);
    }
}
