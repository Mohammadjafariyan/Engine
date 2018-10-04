using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using WebAppIDEEngine.Models.ICore;
using Engine.Code;
using ServiceLayer.Base;
using Engine.Attributes;
using System.Threading.Tasks;
using ViewModel.ActionTypes;

namespace Engine.Controllers.AbstractControllers
{
    public abstract class BaseEngineService<T> : IEngineService<T> where T:IModel
    {
        protected Injector _injector;
        
        public Dictionary<string, TreeAttribute> GetModelTreeAttributes<B>()
        {
            throw new NotImplementedException();
        }
        
        public Dictionary<string, MultiSelectAttribute> GetModelMultiSelectAttributes<B>()
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, DataTableAttribute> GetModelTableAttributes<B>()
        {
            throw new NotImplementedException();
        }

        public Dictionary<string, DropDownAttribute> GetModelDropdownAttributes<B>()
        {
            throw new NotImplementedException();
        }

     
        private IEngineAttribute IsTypeOfMyCustomAttrbutes(object attribute)
        {
            if (attribute is DropDownAttribute)
                return attribute as DropDownAttribute;
            else if (attribute is MultiSelectAttribute)
                return attribute as MultiSelectAttribute;
            else if (attribute is DataTableAttribute)
                return attribute as DataTableAttribute;
            else if (attribute is TreeAttribute)
                return attribute as TreeAttribute;
            else if (attribute is DateTimeAttribute)
                return attribute as DateTimeAttribute;
            return null;
        }

        public void SetData<BT>(string[] v, dynamic[] dataTableAttribute, IDictionary<string, object> r)
        {

        }

        public Task<Dictionary<string, List<IDropDownOption>>> GetMultiSelectDataAsync(object multiselect)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<string, ITreeNode>> GetTreeDataAsync(Dictionary<string, TreeAttribute> trees)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<string, IQueryable<IDataTable>>> GetDataTableDataAsync(Dictionary<string, DataTableAttribute> datatables)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<string, List<IDropDownOption>>> GetDropdownDataAsync(Dictionary<string, DropDownAttribute> dropdowns)
        {
            throw new NotImplementedException();
        }

        public IDataTable GetDataTable(IDataTableParameter p)
        {
            throw new NotImplementedException();
        }

        public ITreeNode GetTree(ITreeParameter p)
        {
            throw new NotImplementedException();
        }

        public List<IDropDownOption> GetDropDown(IDropDownParameter p)
        {
            throw new NotImplementedException();
        }

        public List<IDropDownOption> GetMultiSelect(IMultiSelectParameter p)
        {
            throw new NotImplementedException();
        }

        public Task<IDataTable> GetDataTableAsync(IDataTableParameter p)
        {
            throw new NotImplementedException();
        }

        public Task<ITreeNode> GetTreeAsync(ITreeParameter p)
        {
            throw new NotImplementedException();
        }

        public Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            throw new NotImplementedException();
        }

        public Task<List<IDropDownOption>> GetMultiSelectAsync(IMultiSelectParameter p)
        {
            throw new NotImplementedException();
        }

        public void Save(IModel p)
        {
            throw new NotImplementedException();
        }

        public IModel Delete(long id)
        {
            throw new NotImplementedException();
        }

        public IModel GetForEdit(long id)
        {
            throw new NotImplementedException();
        }

        public IModel GetById(long id)
        {
            throw new NotImplementedException();
        }

        public Task SaveAsync(IModelPostParameter<T> p)
        {
            throw new NotImplementedException();
        }

        public Task<IModel> DeleteAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IModel> GetForEditAsync(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IModel> GetByIdAsync(long id)
        {
            throw new NotImplementedException();
        }
    }

    [Serializable]
    internal class BaseEngineException : Exception
    {
        public BaseEngineException()
        {
        }

        public BaseEngineException(string message) : base(message)
        {
        }

        public BaseEngineException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected BaseEngineException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}