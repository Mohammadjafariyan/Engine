using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
using System.Collections.Generic;
using ViewModel.ActionTypes;
using System.Data.SqlClient;
namespace ServiceLayer." + subSystemName + @"
{
/// <summary>
    /// " + translate + @"
    /// " + description + @"
    /// </summary>
    public class " + serviceName + " " + baseClassName + @"
    { " + serviceContent + "} \n }";

            return content;
        }

        public static string GetServiceMethod(string serviceMethodName,
            ServiceItemReturnType serviceMethodServiceItemReturnType
            , ServiceReturnMethodType serviceMethodServiceReturnMethodType
            , Query serviceMethodQuery, ServiceMethod serviceMethod, string context = "EngineContext")
        {
            string returnType = "";
            string inputParameters = "";

            inputParameters = getInputParameters(serviceMethodQuery);
            var SqlinputParameters = getSQLParameters(serviceMethodQuery);

            returnType = GetDetermineReturnType
                (serviceMethodServiceReturnMethodType, serviceMethodServiceItemReturnType, serviceMethodQuery);

            var itemType = GetDetermineReturnItemType(serviceMethodServiceReturnMethodType, serviceMethodQuery);

            if (serviceMethod.MethodType == MethodType.GetDataTable)
            {
                returnType = " IDataTable ";
            }

            List<string> parameters = new List<string>();
            foreach (var parameterField in serviceMethodQuery.addParameterFields)
            {
                parameters.Add($@" new SqlParameter(""{parameterField.nameInSQL}"", {parameterField.nameInMethod})");
            }

            string sqlQueryParamsInStr = "";
            if (parameters.Count > 0)
            {
                sqlQueryParamsInStr = ",";
                sqlQueryParamsInStr+=string.Join(",", parameters);
            }


            var s1 = $@"public {returnType} {serviceMethodName}({inputParameters}) " + "{" +
                     $@"var dt={context}.Database.SqlQuery<{itemType}>( @""  {SqlinputParameters + "\n"}  {
                             serviceMethodQuery.SQL
                         }"" {sqlQueryParamsInStr});";
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

            var headersType = "";
            if (serviceMethodServiceReturnMethodType == ServiceReturnMethodType.ViewModel)
            {
                headersType = $@"GetPropertyNames<{returnType}>()";
            }
            else
            {
                var names = serviceMethodQuery.selectedProperties
                    .Select(s => $@"{{""{s.Property.NameInModel} "",""{s.NameInTableAsName} "" }}").ToArray();
                var joined = string.Join(@",", names);

                s1 += $@"Dictionary<string,string> headers=new Dictionary<string,string>{{
               {joined}
                }}; ";

                headersType = $@"headers";
            }

            s1 += $@" 
            var count = res.Count();
            var l = res.ToList();

            return new DynaDataTable
            {{
                Total = count,
                Filtered = count,
                Headers = {headersType},
                RecordsList = l.Cast<dynamic>().ToList()
            }};
";
            s1 += "\n }";


            string viewModel = "";
            if (serviceMethodServiceReturnMethodType == ServiceReturnMethodType.ViewModel)
            {
                viewModel = CreateViewModelClass(returnType, serviceMethodQuery.selectedProperties);
                s1 += viewModel + "}";
            }

            return s1;
        }

        private static string getSQLParameters(Query serviceMethodQuery)
        {
            var paramerters = "";
            for (int i = 0; i < serviceMethodQuery.addParameterFields.Count; i++)
            {
                var addParameterField = serviceMethodQuery.addParameterFields.ElementAt(i);
                var type = addParameterField.typeInSQL.ToString();
                paramerters += $@"DECLARE {addParameterField.nameInSQL} {type}{addParameterField.range};" + "\n";
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

                if (addParameterField.nullable)
                {
                    type += "?";
                }

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
                    returnType = serviceMethodQuery.models.Where(m => m.IsMainTable).Select(m => m.Model.Name)
                        .FirstOrDefault();
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
                    $@"public {queryProperty.Property.PropertyType.ToString()}  {queryProperty.Property.NameInModel}" +
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
                $@"var res=_{controllerMethod.ServiceMethod.DefineService.Name.ToLower()}.{
                        controllerMethod.ServiceMethod.Name
                    }();";

            s1 += $@"
            //res.RecordsList =  res.Records.ToList();

            string actionName = ControllerContext.RouteData.Values[""action""].ToString();
            string controllerName = ControllerContext.RouteData.Values[""controller""].ToString();
            string areaName = (string)HttpContext.Request.RequestContext.RouteData.DataTokens[""area""];

            SetDynamicTableViewData(DefaultDataTableName, areaName, controllerName, actionName, res);
            return View(res);

        }}
            catch (Exception e)
            {{
                throw e;
        }}";
            s1 += "}";
            return s1;
        }

        public static string GetControllerContent(DefineController controller, string translate, string serviceName,
            string baseClassName, object baseInterfaces, string serviceContent, string description, object genericModel,
            string subSystemName, bool isNormalController, bool isMVC = true)
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

            var fields = controller.DefineControllerMethods.Select(m => m.ServiceMethod.DefineService).Distinct();
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

            if (isNormalController)
            {
                constructure += $@"
      DefaultSaveName = ""{controller.Name}Save"";
            DefaultDataTableName = ""{controller.Name}DataTable"";";
            }

            constructure += string.Join(";",
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
using Engine.Attributes;
using Engine.Controllers.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.ICore;
using System.Collections.Specialized;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.ServiceLayer.Systems.Engine;
using Engine.Service.AbstractControllers;
using WebGrease.Css.Extensions;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Areas.App.Controllers;
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

            content += "} \n } " + "\n";

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
                case PropertyType.ByteArray:
                    type = "byte[]";
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

            if (property.Nullable)
            {
                type += "?";
            }

            if (property.NameInModel == "Id" || property.NameInModel == "Name")
            {
                return "";
            }

            var prop = "public" + " " + type + " " + property.NameInModel +
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
                $@"var res=_{controllerMethod.ServiceMethod.DefineService.Name.ToLower()}.{
                        controllerMethod.ServiceMethod.Name
                    }();";

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

        public static string GetRegisterService(DefineService service, string Interface)
        {
            return $@"For<{Interface}>().Add<{service.Name}>().Named(ServiceGlobalNames.{service.Name}Name);" + "\n";
        }

        public static string GetRegieryContent(string baseClassName, string serviceContent)
        {
            return $@"using Engine.Service.AbstractControllers;
using ServiceLayer.Base;
using ServiceLayer.Systems;
using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceLayer.Systems.Library;
{string.Join("", ServiceUsigs)}
using GlobalNames;

namespace Engine.Utitliy
{{
    public class ServiceRegistry : {baseClassName}
    {{
        public ServiceRegistry()
        {{
            {serviceContent}
        }}
    }}
}}";
        }

        public static string GetGlobalName(DefineService service, string serviceBase)
        {
            return $@"public const string {service.Name}Name = ""{service.Name}"";";
        }

        public static string GetGlobalNamesContent(string serviceGlobalNames)
        {
            return $@"using System;
                using ServiceLayer.Systems;

                namespace GlobalNames
                {{
                        public class ServiceGlobalNames
                        {{   
                              {serviceGlobalNames}
                        }}

                }}";
        }

        public static string GetWebConfigContent()
        {

            return File.ReadAllText(ExampleFilesRootDirectory+"/Areas/Library/Views/web.config", Encoding.UTF8);
          /*  var dep = $@"<?xml version=""1.0""?>
<configuration>
  <configSections>
    <sectionGroup name=""system.web.webPages.razor"" type=""System.Web.WebPages.Razor.Configuration.RazorWebSectionGroup, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"">
      <section name=""host"" type=""System.Web.WebPages.Razor.Configuration.HostSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"" requirePermission=""false"" />
      <section name=""pages"" type=""System.Web.WebPages.Razor.Configuration.RazorPagesSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"" requirePermission=""false"" />
    </sectionGroup>
  </configSections>

  <system.web.webPages.razor>
    <host factoryType=""System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.2.3.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"" />
    <pages pageBaseType=""System.Web.Mvc.WebViewPage"">
      <namespaces>
        <add namespace=""System.Web.Mvc"" />
        <add namespace=""System.Web.Mvc.Ajax"" />
        <add namespace=""System.Web.Mvc.Html"" />
        <add namespace=""System.Web.Routing"" />
        <add namespace=""System.Web.Optimization"" />
        <add namespace=""Engine"" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>

  <appSettings>
    <add key=""webpages:Enabled"" value=""false"" />
  </appSettings>

  <system.webServer>
    <handlers>
      <remove name=""BlockViewHandler""/>
      <add name=""BlockViewHandler"" path=""*"" verb=""*"" preCondition=""integratedMode"" type=""System.Web.HttpNotFoundHandler"" />
    </handlers>
  </system.webServer>
</configuration>"" ";
            ;*/
        }

        public static string ExampleFilesRootDirectory = "D:\\workplace\\git\\Engine\\Engine\\";

        public static string GetDataTableView(string title)
        {
            return File.ReadAllText(ExampleFilesRootDirectory + "/Areas/Library/Views/Book/GetDataTable.cshtml", Encoding.UTF8);
/*
            var dep =  $@"@using ViewModel.ActionTypes
@using WebAppIDEEngine.Models.ICore
@using Engine.Attributes
@using System.Web.Mvc
@using System.Web.Mvc.Html
@using ViewModel.ActionTypes
@using Domain.Attributes
@using Engine.Areas.JUiEngine.Controllers

@model IDataTable
@{{
                ViewBag.Title = ""{title}"";
            Layout = ""~/Views/Shared/_Layout.cshtml"";
            var datatable = ViewData[UiHomeController.TableObject];
        }}



@Html.Partial(""~/Areas/JUiEngine/Views/UiHome/ShowView.cshtml"", datatable)
";*/
        }

        public static string GetForEditView(string title)
        {
            return File.ReadAllText(ExampleFilesRootDirectory + "/Areas/Library/Views/Book/ForEdit.cshtml", Encoding.UTF8);

            /* var dep= $@"
 @using System.Web.Mvc.Html
 @using Engine.Areas.JUiEngine.Controllers
 @using Engine.Entities.Models.UiGeneratorModels
 @using WebAppIDEEngine.Models.Core
 @model dynamic

 @{{

                 ViewBag.Title = ""{title} "";
             ViewBag.SaveAction = ViewBag.SaveAction ?? ""Save"";
             ViewBag.SaveController = ViewBag.SaveController ?? this.ViewContext.RouteData.Values[""controller""].ToString();
             Layout = ""~/Views/Shared/_Layout.cshtml"";
             ViewData[""inline""] = true;
             var form=ViewData[UiHomeController.Form] as UiForm;
                 }}

 @Html.Partial(""~/Areas/JUiEngine/Views/UiFormEngine/ShowView.cshtml"", form)
 ";*/
        }

        public static string GetDeleteView()
        {
            return File.ReadAllText(ExampleFilesRootDirectory + "/Areas/Library/Views/Book/Delete.cshtml", Encoding.UTF8);
        }
    }
}