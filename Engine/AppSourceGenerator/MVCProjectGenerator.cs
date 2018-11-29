using System.Collections.Generic;
using System.Linq;
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


        public void MakeViews(List<DefineController> controllers)
        {
            var methods = controllers.SelectMany(c => c.DefineControllerMethods);
            
            /// ایجاد ویو های دیفالت 
            foreach (var controller in controllers)
            {
                var subsytemName = controller.SubSystem.Name;
                var controllerName = controller.Name;
                var modelName = controller.Model.Translate;

                controllerName=controllerName.Replace("ApiController", "");
                controllerName = controllerName.Replace("Controller", "");

                CreateIsNotExist(Path + "\\Areas\\" +  subsytemName+ "\\Views\\" + controllerName);

                CreateClass("GetDataTable", Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                    , ".cshtml", MVCUtility.GetDataTableView($@" جدول {modelName} ها"));
                CreateClass("ForEdit", Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                    , ".cshtml", MVCUtility.GetForEditView($@" ویرایش {modelName} "));
                CreateClass("Delete", Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                    , ".cshtml", MVCUtility.GetDeleteView());

            }

            // ایجاد ویو برای متد های دیگر 
            foreach (var method in methods)
            {
                var controllerName = method.DefineController.Name;

                controllerName=controllerName.Replace("ApiController", "");
                controllerName = controllerName.Replace("Controller","");

                var subsytemName = method.DefineController.SubSystem.Name;
                CreateIsNotExist(Path + "\\Areas\\" + subsytemName + "\\Views");
                CreateIsNotExist(Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName);

                if (method.MethodType == MethodType.GetDataTable)
                {
                    CreateClass(method.Name, Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                        , ".cshtml", MVCUtility.GetDataTableView(method.Translate));
                }

                if (method.MethodType == MethodType.GetForEdit)
                {
                    CreateClass(method.Name, Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                        , ".cshtml", MVCUtility.GetForEditView(method.Translate));
                }

                if (method.MethodType == MethodType.Delete)
                {
                    CreateClass(method.Name, Path + "\\Areas\\" + subsytemName + "\\Views\\" + controllerName + "\\"
                        , ".cshtml", MVCUtility.GetDeleteView());
                }
            }
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
                CreateClass("web", Path + "\\Areas\\" + subSystem.Name + "\\Views\\", ".config",
                    MVCUtility.GetWebConfigContent());
            }
        }


        public void MakeApiControllers(List<DefineController> controllers)
        {
            foreach (var controller in controllers)
            {
                var areaPath = "\\Areas\\" + controller.SubSystem.Name + "\\Controllers";
                CreateIsNotExist(Path + areaPath);

                string controllerContent = "";
                foreach (var controllerMethod in controller.DefineControllerMethods)
                {
                    if (!controllerMethod.InParent)
                    {
                        controllerContent += MVCUtility.GetControllerApiMethod(controllerMethod);
                    }
                }

                if (controller.Name.ToLower().Contains("controller"))
                {
                    var start = controller.Name.ToLower().IndexOf("controller");
                    controller.Name = controller.Name.Substring(0,
                        start);
                }

                controller.Name += "ApiController";

                CreateClass(controller.Name, Path + areaPath + "\\", ".cs"
                    , MVCUtility.GetControllerContent(controller: controller, translate: controller.Name,
                        serviceName: controller.Name,
                        baseClassName: $@"BaseApiController<{controller.Model.Name},CommonParameter>",
                        baseInterfaces: null,
                        serviceContent: controllerContent,
                        description: controller.Name,
                        genericModel: null,
                        subSystemName: controller.SubSystem.Name, isNormalController: false,
                        isMVC: false));
            }
        }

        public void RegisterServices(List<DefineService> services, string serviceBase)
        {
            string serviceContent = "";
            string serviceGlobalNames = "";
            foreach (var service in services)
            {
                var serviceAreaPath = "\\Registery\\" + service.SubSystem.Name;
                CreateIsNotExist(Path + serviceAreaPath);

                serviceContent += MVCUtility.GetRegisterService(service, serviceBase);
                serviceGlobalNames += MVCUtility.GetGlobalName(service, serviceBase);
            }

            CreateClass("ServiceRegistery", Path + "Registery" + "\\", ".cs"
                , MVCUtility.GetRegieryContent(baseClassName: "Registry",
                    serviceContent: serviceContent));

            CreateClass("ServiceGlobalNames", Path + "Global" + "\\", ".cs"
                , MVCUtility.GetGlobalNamesContent(serviceGlobalNames: serviceGlobalNames));
        }

        public void MakeControllers(List<DefineController> controllers)
        {
            foreach (var controller in controllers)
            {
                var areaPath = "\\Areas\\" + controller.SubSystem.Name + "\\Controllers";
                CreateIsNotExist(Path + areaPath);

                string controllerContent = "";
                foreach (var controllerMethod in controller.DefineControllerMethods)
                {
                    if (!controllerMethod.InParent)
                    {
                        controllerContent += CreateControllerMethod(controllerMethod);
                    }
                }


                //   controller.Name += "Controller";
                CreateClass(controller.Name, Path + areaPath + "\\", ".cs"
                    , MVCUtility.GetControllerContent(controller: controller, translate: controller.Name,
                        serviceName: controller.Name,
                        baseClassName: $@"EBaseAppController<{controller.Model.Name},CommonParameter>",
                        baseInterfaces: null,
                        serviceContent: controllerContent,
                        description: controller.Name,
                        genericModel: null,
                        subSystemName: controller.SubSystem.Name, isNormalController: true));
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
                serviceMethod.Query, serviceMethod: serviceMethod);
        }

        public void CreateRegistrationClass(string areaClassName, string p)
        {
            _cSharpClassMaker.CreateRegistrationClass(areaClassName, p);
        }
    }
}