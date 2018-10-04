using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.ActionTypes
{
    public interface IActionParameter
    {
    }
    public interface ITreeParameter : IActionParameter
    {
        // todo:remain
        #region Tree 
        int? NodeId { get; set; }
        #endregion
    }
    public interface IDropDownParameter : IActionParameter
    {
        #region DropDown
        long? Id { get; set; }
        #endregion
    }

    public interface IMultiSelectParameter : IActionParameter
    {
        #region DropDown
        long? Id { get; set; }
        #endregion
    }


    public interface IDataTableParameter : IActionParameter
    {
        #region index
        int? LastIndex { get; set; }
        int? Count { get; set; }
        #endregion
    }


    public interface IModelPostParameter<T> : IActionParameter
    {
        #region Save
        T Model { get; set; }
        long? Id { get; set; }
        #endregion
    }

    public class ModelPostParameter<T> : IModelPostParameter<T>
    {
        #region Save
        public T Model { get; set; }
        public long? Id { get; set; }
        #endregion
    }

}
