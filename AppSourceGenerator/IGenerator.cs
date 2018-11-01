using System.Collections.Generic;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.Core;

namespace AppSourceGenerator
{
    public interface IGenerator : IMVCProjectGeneratorBase
    {
        void LoadProject(string path);
        void MakeSubsystems(List<SubSystem> subSystems);
        void MakeControllers(List<DefineController> controllers);
        void MakeServices(List<DefineService> services);
        void MakeModels(List<Model> models);
        void MakeApiControllers(List<DefineController> controllers);
    }
    
    
    public interface IClassMaker
    {
        void SetPath(string path);
        //void CreateClassWithName(string className, bool isAuthorized);
    }

    
    public interface ICSharpClassMaker:IClassMaker
    {
        void CreateRegistrationClass(string areaClassName,string path);
    }

    
}