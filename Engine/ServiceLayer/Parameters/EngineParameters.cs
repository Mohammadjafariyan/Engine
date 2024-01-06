using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.ICore;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.Core;

namespace ViewModel.Parameters
{
    public class FormParameter : ModelPostParameter<Form>
    {
    }
    
    public class SubsystemParameter : ModelPostParameter<SubSystem>
    {
    }

    
    public class CommonParameter : ModelPostParameter<IModel>
    {
    }

    public class PanelParameter : ModelPostParameter<Form>
    {
    }

    public class ActionParameter : ModelPostParameter<Form>
    {
    }
}
