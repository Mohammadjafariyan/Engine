using System.Collections.Generic;
using System.Linq;
using AppSourceGenerator;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.CoreEnum;

namespace AppSourceGenerator
{
    public interface IUtility
    {
    }


    public class MVCUtility
    {
        public static string ModelsNamespace = "Models";
        public static string ControllersNamespace = "Engine";

        public static string[] ControllerUsigs =
        {
            "using Engine.Areas.ReportGenerator.Controllers;",
            "using System.Linq;",
            "using " + ModelsNamespace + ";",
        };


        public static string[] ServiceUsigs =
        {
            "using System.Linq;",
            "using " + ModelsNamespace + ";",
        };

        public static string GetRegisterAreaContent(string areaName)
        {
            return @"
 using System.Web.Mvc;

namespace Engine.Areas.AppGeneration
{
        public class " + areaName + @"AreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return """ + areaName + @" "";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
              ""  " + areaName + @"_default "",
            ""    " + areaName + @"/{controller}/{action}/{id} "",
                new { action ="" " + "Index" + @" "", id = UrlParameter.Optional }
            );
        }
    }
    }

";
        }

        public static string GetServiceContent(string translate,
            string description, string serviceName, string serviceContent
            , string genericModel, string baseClassName, string baseInterfaces,
            string subSystemName)
        {
            baseClassName = baseClassName != null ? ":" + baseClassName : "";
            baseClassName = baseClassName + (genericModel != null ? "<" + genericModel + ">" : "");

            if (baseClassName.Contains(":"))
            {
                baseClassName += baseInterfaces == null ? "" : "," + baseInterfaces;
            }
            else
            {
                baseClassName += baseInterfaces == null ? "" : ":" + baseInterfaces;
            }


            string content = @"
using " + ModelsNamespace + ";\n" + @"
" + string.Join("\n", ServiceUsigs) + @"
using ServiceLayer.Systems;
namespace ServiceLayer." + subSystemName + @"
{
/// <summary>
    /// " + translate + @"
    /// " + description + @"
    /// </summary>
    public class " + serviceName + " " + baseClassName + @"
    { " + serviceContent + @"}";

            return content;
        }

        public static string GetServiceMethod(string serviceMethodName,
            ServiceItemReturnType serviceMethodServiceItemReturnType
            , ServiceReturnMethodType serviceMethodServiceReturnMethodType
            , Query serviceMethodQuery, string context = "EngineContext")
        {
            string returnType = "";
            string inputParameters = "";

            inputParameters = getInputParameters(serviceMethodQuery);
            var SqlinputParameters = getSQLParameters(serviceMethodQuery);

            returnType = GetDetermineReturnType
                (serviceMethodServiceReturnMethodType, serviceMethodServiceItemReturnType, serviceMethodQuery);

            var itemType = GetDetermineReturnItemType(serviceMethodServiceReturnMethodType, serviceMethodQuery);

            var s1 = $@"public {returnType} {serviceMethodName}({inputParameters}) " + "{" +
                     $@"var dt={context}.Database.SqlQuery<{itemType}>("" {SqlinputParameters+"\n"}  {serviceMethodQuery.SQL}"");";
            switch (serviceMethodServiceItemReturnType)
            {
                case ServiceItemReturnType.List:
                    s1 += $@"var res=dt.toList();";
                    break;
                case ServiceItemReturnType.IQueryable:
                    s1 += $@"var res=dt.AsQueryable();";
                    break;
                case ServiceItemReturnType.First:
                    s1 += $@"var res=dt.First();";
                    break;
                case ServiceItemReturnType.FirstOrDefault:
                    s1 += $@"var res=dt.FirstOrDefault();";
                    break;
                case ServiceItemReturnType.Last:
                    s1 += $@"var res=dt.Last();";
                    break;
                case ServiceItemReturnType.LastOrDefault:
                    s1 += $@"var res=dt.LastOrDefault();";
                    break;
                default:
                    s1 += $@"var res=dt";
                    break;
            }

            s1 += "return res; \n }";


            string viewModel = "";
            if (serviceMethodServiceReturnMethodType == ServiceReturnMethodType.ViewModel)
            {
                viewModel = CreateViewModelClass(returnType, serviceMethodQuery.selectedProperties);
            }

            s1 += viewModel + "}";
            return s1;
        }

        private static string getSQLParameters(Query serviceMethodQuery)
        {
            var paramerters = "";
            for (int i = 0; i < serviceMethodQuery.addParameterFields.Count; i++)
            {
                var addParameterField = serviceMethodQuery.addParameterFields.ElementAt(i);
                var type = addParameterField.typeInSQL.ToString();
                paramerters += $@"DECLARE {addParameterField.nameInSQL} {type}{addParameterField.range};"+"\n";

            }

            return paramerters;
        }


        private static string getInputParameters(Query serviceMethodQuery)
        {
            var paramerters = "";
            for (int i = 0; i < serviceMethodQuery.addParameterFields.Count; i++)
            {
                var addParameterField = serviceMethodQuery.addParameterFields.ElementAt(i);
                var isnullable = addParameterField.nullable ? "?" : "";
                var type = DetermineType(addParameterField.typeInModel);

                paramerters += $@"{type}{isnullable} {addParameterField.nameInMethod}";

                if (i != serviceMethodQuery.addParameterFields.Count - 1)
                {
                    paramerters += ",";
                }
            }

            return paramerters;
        }

        private static string GetDetermineReturnItemType(ServiceReturnMethodType
            serviceMethodServiceReturnMethodType, Query serviceMethodQuery)
        {
            var returnType = "";
            switch (serviceMethodServiceReturnMethodType)
            {
                case ServiceReturnMethodType.Dynamic:
                    returnType = "dynamic";
                    break;
                case ServiceReturnMethodType.Model:
                    returnType = serviceMethodQuery.models.Where(m=>m.IsMainTable).Select(m=>m.Name).FirstOrDefault();
                    break;
                case ServiceReturnMethodType.INT:
                    returnType = "int";
                    break;
                case ServiceReturnMethodType.LONG:
                    returnType = "long";
                    break;
                case ServiceReturnMethodType.STRING:
                    returnType = "string";
                    break;
                case ServiceReturnMethodType.BOOLEAN:
                    returnType = "bool";
                    break;
                case ServiceReturnMethodType.OBJECT:
                    returnType = "object";
                    break;
                case ServiceReturnMethodType.ViewModel:
                    returnType = serviceMethodQuery.Name + "ViewModel";
                    break;
            }

            return returnType;
        }

        private static string GetDetermineReturnType
        (ServiceReturnMethodType serviceMethodServiceReturnMethodType,
            ServiceItemReturnType serviceMethodServiceItemReturnType,
            Query serviceMethodQuery)
        {
            string returnType = "";

            returnType = GetDetermineReturnItemType(serviceMethodServiceReturnMethodType, serviceMethodQuery);

            if (serviceMethodServiceItemReturnType ==
                ServiceItemReturnType.List)
            {
                returnType = $@"List<{returnType}>";
            }
            else if (serviceMethodServiceItemReturnType ==
                     ServiceItemReturnType.IQueryable)
            {
                returnType = $@"IQueryable<{returnType}>";
            }

            return returnType;
        }

        private static string CreateViewModelClass(string Name, ICollection<QueryProperty> properties)
        {
            var str = @"
        public class " + Name + "{";
            string props = "";
            foreach (var queryProperty in properties)
            {
                props +=
                    $@"public {queryProperty.Property.PropertyType.ToString()}  {queryProperty.Property.ModelName}" +
                    "{get;set;}";
            }

            str += "}";

            return str;
        }

        public static string GetControllerMethod(DefineControllerMethod controllerMethod)
        {
            string inputParameters = "";
            inputParameters = getInputParameters(controllerMethod.ServiceMethod.Query);

            var s1 = $@" 
[HttpGet]
public ActionResult {controllerMethod.Name}({inputParameters}) " + "{";
            s1 += @"
try{
";
            s1 +=
                $@"var res=_{controllerMethod.ServiceMethod.DefineService.Name.ToLower()}.{controllerMethod.ServiceMethod.Name}();";

            s1 += @"
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }";
            s1 += "}}";
            return s1;
        }

        public static string GetControllerContent(DefineController controller, string translate, string serviceName,
            string baseClassName, object baseInterfaces, string serviceContent, string description, object genericModel,
            string subSystemName, bool isMVC = true)
        {
            baseClassName = baseClassName != null ? ":" + baseClassName : "";
            baseClassName = baseClassName + (genericModel != null ? "<" + genericModel + ">" : "");

            if (baseClassName.Contains(":"))
            {
                baseClassName += baseInterfaces == null ? "" : "," + baseInterfaces;
            }
            else
            {
                baseClassName += baseInterfaces == null ? "" : ":" + baseInterfaces;
            }

            var fields = controller.DefineControllerMethod.Select(m => m.ServiceMethod.DefineService).Distinct();
            var fieldsStr = "";

            var constructure = $@"public {controller.Name}(";

            var defineServices = fields as DefineService[] ?? fields.ToArray();

            foreach (var field in defineServices)
            {
                fieldsStr += $@" private {field.Name} {"_" + field.Name.ToLower()}" + "{get;set;} \n";
            }

            constructure += string.Join(",",
                                defineServices.Select(f => f.Name + " " + "_" + f.Name.ToLower().Trim()).ToArray()) +
                            "){ \n";
            constructure += string.Join(",",
                                defineServices.Select(f =>
                                    "this._" + f.Name.ToLower() + "=_" + f.Name.ToLower() + "; \n ").ToArray()) + "}\n";
            var serviceUsings = string.Join(",",
                defineServices.Select(f => "using ServiceLayer." + f.SubSystem.Name + ";").Distinct().ToArray());

            serviceUsings = !string.IsNullOrEmpty(serviceUsings) ? serviceUsings + "\n" : "";


            var mvcOrapi = isMVC ? "using System.Web.Mvc;" : "using System.Web.Http;";
            string content = serviceUsings + @"

" + string.Join("\n", ControllerUsigs) + @"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebAppIDEEngine.Models;
" + mvcOrapi + @"




namespace " + ControllersNamespace + @".Areas." + subSystemName + @".Controllers
{
/// <summary>
    /// " + translate + @"
    /// " + description + @"
    /// </summary>
    public class " + serviceName + " " + baseClassName + @"
    { ";

            content += fieldsStr + "\n";
            content += constructure + "\n";
            content += serviceContent + "\n";

            content += @"} " + "\n";

            return content;
        }

        public static string DetermineType(PropertyType PropertyType)
        {
            var type = "";
            switch (PropertyType)
            {
                case PropertyType.Boolean:
                    type = "bool";
                    break;
                case PropertyType.Long:
                    type = "long";
                    break;
                case PropertyType.Byte:
                    type = "byte";
                    break;
                case PropertyType.Char:
                    type = "Char";
                    break;
                case PropertyType.Decimal:
                    type = "decimal";
                    break;
                case PropertyType.Double:
                    type = "double";
                    break;
                case PropertyType.Int:
                    type = "int";
                    break;
                case PropertyType.String:
                    type = "string";
                    break;
                default:
                    type = PropertyType.ToString();
                    break;
            }

            return type;
        }

        public static string GetProperty(Property property)
        {
            var type = "";
            type = DetermineType(property.PropertyType);

            var prop = "public" + " " + type + " " + property.Name +
                       "{get;set;}" + "\n";
            return prop;
        }


        /*public static string GetProperty(NavigationProperty property)
        {
            var prop="public" + " " + property.Model.Name + " " + property.Name + "{get;set;}";
            return prop;
        }*/
        public static string GetModelContent(Model model, string baseClassName, string serviceContent,
            string description)
        {
            baseClassName = baseClassName != null ? ":" + baseClassName : "";

            var str = @"
using Engine.Attributes;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace " + ModelsNamespace + @"
{

        /// <summary>
        /// " + description + @"
        /// </summary>
        public class " + model.Name + " " + baseClassName + "{";
            str += serviceContent;

            str += "} \n }";
            return str;
        }

        public static string GetControllerApiMethod(DefineControllerMethod controllerMethod)
        {
            string inputParameters = "";
            string returnType = GetDetermineReturnType(controllerMethod.ServiceMethod.ServiceReturnMethodType,
                controllerMethod.ServiceMethod.ServiceItemReturnType, controllerMethod.ServiceMethod.Query);

            var s1 = $@" 
[HttpGet]
public {returnType} {controllerMethod.Name}({inputParameters}) " + "{";
            s1 += @"
try{

";
            s1 +=
                $@"var res=_{controllerMethod.ServiceMethod.DefineService.Name.ToLower()}.{controllerMethod.ServiceMethod.Name}();";

            s1 += @"
      return res;
            }
            catch (Exception e)
            {
                throw e;
        }";
            s1 += "}}";
            return s1;
        }
    }
}