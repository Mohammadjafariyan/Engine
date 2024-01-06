using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Engine.Entities.Models.Core.AppGeneration;
using StructureMap.Query;
using WebAppIDEEngine.Models.Core;
using IModel = Engine.Entities.Models.ICore.IModel;

namespace Engine.Utitliy
{

    public class ModelRegistery : Registry
    {
        public ModelRegistery()
        {
            
            For<IModel>().Add<SubSystem>();

        }
    }
}