using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.ActionTypes
{
    public interface ITreeNode
    {
        string Name { get; set; }
        string Id { get; set; }

        List<ITreeNode> ChildNodes { get; set; }
    }
}
