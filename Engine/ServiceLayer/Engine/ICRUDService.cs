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
        List<IDropDownOption> GetMultiSelect(IDropDownParameter p);



        Task<ObjectDataTable<T>> GetDataTableAsync(IDataTableParameter p);
        Task<ITreeNode> GetTreeAsync(ITreeParameter p);
        Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p);
        Task<List<IDropDownOption>> GetMultiSelectAsync(IMultiSelectParameter p);


          void Insert(T p);

          void Update(T p);
        T Delete(long id);
        T GetForEdit(long id);
        T GetById(long id);
        
    }
}
