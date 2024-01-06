using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Entities.Models.ICore;
using ViewModel.ActionTypes;

namespace ServiceLayer.Engine
{
    public interface ICRUDService<T> where T:IModel
    {

        IDataTable GetDataTable(T p,Func<IQueryable<T>,IQueryable<T>> whereExpression=null);
        ITreeNode GetTree(ITreeParameter p);
        List<IDropDownOption> GetDropDown(IDropDownParameter p);
        List<IDropDownOption> GetMultiSelect(IDropDownParameter p);



        Task<IDataTable> GetDataTableAsync(T p,Func<IQueryable<T>,IQueryable<T>> whereExpression=null);
        Task<ITreeNode> GetTreeAsync(ITreeParameter p);
        Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p);
        Task<List<IDropDownOption>> GetMultiSelectAsync(IMultiSelectParameter p);


          void Save(T p);

        void Delete(long id);
        T GetForEdit(long id);
        T GetById(long id);
        
    }
}
