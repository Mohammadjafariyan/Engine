using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Entities.Models.ICore;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.Core;

namespace ServiceLayer.Base
{

    /// <summary>
    /// هر سرویس دارای متد های زیر که در engine استفاده می شود
    /// </summary>
    public interface IBaseService
    {
        IDataTable GetDataTable(IActionParameter p = null);
        List<IDropDownOption> GetDropDown(IActionParameter p = null);
        ITreeNode GetTree(IActionParameter p = null);

    }

    public interface IBaseDataService<T> where T : IModel
    {
        IModel GetById(long id);

        IQueryable<IModel> GetAll();

    }
}
