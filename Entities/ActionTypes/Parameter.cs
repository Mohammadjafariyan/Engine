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
    public class ITreeParameter : IActionParameter
    {
        // todo:remain
        #region Tree 
        public int? NodeId { get; set; }
        #endregion
    }
    public class IDropDownParameter : IActionParameter
    {
        #region DropDown
        public long? Id { get; set; }
        #endregion
    }

    public class IMultiSelectParameter : IActionParameter
    {
        #region DropDown
        public long? Id { get; set; }
        #endregion
    }


    public class IDataTableParameter : IActionParameter
    {
        #region index
       public int? LastIndex { get; set; }
        public int? Count { get; set; }

        public string SearchTerm { get; set; }
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
