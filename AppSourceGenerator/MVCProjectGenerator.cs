using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.Core;

namespace AppSourceGenerator
{
    public class MvcProjectGenerator : MvcProjectGeneratorBase, IGenerator
    {
        private ICSharpClassMaker _cSharpClassMaker = new MvcClassMaker();

        public void LoadProject(string path)
        {
            Path = path;
            _cSharpClassMaker.SetPath(path);
        }

        public void MakeSubsystems(List<SubSystem> subSystems)
        {
            foreach (var subSystem in subSystems)
            {
                CreateIsNotExist(Path + "\\Areas\\");
                CreateIsNotExist(Path + "\\Areas\\" + subSystem.Name);
                CreateIsNotExist(Path + "\\Areas\\" + subSystem.Name + "\\Controllers");
                CreateIsNotExist(Path + "\\Areas\\" + subSystem.Name + "\\Models");
                CreateIsNotExist(Path + "\\Areas\\" + subSystem.Name + "\\Views");
                CreateRegistrationClass(subSystem.Name, Path + "\\Areas\\" + subSystem.Name);
            }
        }
        
        
        public void MakeApiControllers(List<DefineController> controllers)
        {
            foreach (var controller in controllers)
            {
                var areaPath = "\\Areas\\" + controller.SubSystem.Name + "\\Controllers";
                CreateIsNotExist(Path + areaPath);

                string controllerContent = "";
                foreach (var controllerMethod in controller.DefineControllerMethod)
                {
                    controllerContent += MVCUtility.GetControllerApiMethod(controllerMethod);
                }

                if (controller.Name.ToLower().Contains("controller"))
                {
                    var start = controller.Name.ToLower().IndexOf("controller");
                    controller.Name = controller.Name.Substring(0,
                        start);
                }
                controller.Name +="ApiController";

                CreateClass(controller.Name, Path + areaPath + "\\", ".cs"
                    , MVCUtility.GetControllerContent(controller: controller, translate: controller.Name,
                        serviceName: controller.Name,
                        baseClassName:"ApiController",
                        baseInterfaces: null,
                        serviceContent: controllerContent,
                        description: controller.Name,
                        genericModel: null,
                        subSystemName: controller.SubSystem.Name,
                        isMVC:false));
            }
        }

        public void MakeControllers(List<DefineController> controllers)
        {
            foreach (var controller in controllers)
            {
                var areaPath = "\\Areas\\" + controller.SubSystem.Name + "\\Controllers";
                CreateIsNotExist(Path + areaPath);

                string controllerContent = "";
                foreach (var controllerMethod in controller.DefineControllerMethod)
                {
                    controllerContent += CreateControllerMethod(controllerMethod);
                }

                
                controller.Name +="Controller";
                CreateClass(controller.Name, Path + areaPath + "\\", ".cs"
                    , MVCUtility.GetControllerContent(controller: controller, translate: controller.Name,
                        serviceName:controller.Name ,
                        baseClassName: "Controller",
                        baseInterfaces: null,
                        serviceContent: controllerContent,
                        description: controller.Name,
                        genericModel: null,
                        subSystemName: controller.SubSystem.Name));
            }
        }

        private string CreateControllerMethod(DefineControllerMethod controllerMethod)
        {
            return MVCUtility.GetControllerMethod(controllerMethod);
        }

        public void MakeServices(List<DefineService> services)
        {
            foreach (var service in services)
            {
                var serviceAreaPath = "\\ServiceLayer\\" + service.SubSystem.Name;
                CreateIsNotExist(Path + serviceAreaPath);

                string serviceContent = "";
                foreach (var serviceMethod in service.ServiceMethods)
                {
                    serviceContent += CreateServiceMethod(serviceMethod);
                }

                CreateClass(service.Name, Path + serviceAreaPath + "\\", ".cs"
                    , MVCUtility.GetServiceContent(translate: service.Name,
                        serviceName: service.Name,
                        baseClassName: "CommonService",
                        baseInterfaces: null,
                        serviceContent: serviceContent,
                        description: service.Name,
                        genericModel: service.Model.Name,
                        subSystemName: service.SubSystem.Name));
            }
        }

        public void MakeModels(List<Model> models)
        {
            foreach (var model in models)
            {
                var serviceAreaPath = "\\Model\\";
                CreateIsNotExist(Path + serviceAreaPath);

                string modelContent = "";
                foreach (var property in model.Properties)
                {
                    modelContent += MVCUtility.GetProperty(property);
                }

                CreateClass(model.Name, Path + serviceAreaPath + "\\", ".cs"
                    , MVCUtility.GetModelContent(model,
                        baseClassName: "BaseEntity",
                        serviceContent: modelContent,
                        description: model.Name));
            }
        }


        private string CreateServiceMethod(ServiceMethod serviceMethod)
        {
            return MVCUtility.GetServiceMethod(serviceMethod.Name,
                serviceMethod.ServiceItemReturnType, serviceMethod.ServiceReturnMethodType,
                serviceMethod.Query);
        }

        public void CreateRegistrationClass(string areaClassName, string p)
        {
            _cSharpClassMaker.CreateRegistrationClass(areaClassName, p);
        }
    }
}