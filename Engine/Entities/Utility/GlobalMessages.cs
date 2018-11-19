using System;
using ServiceLayer.Systems;

namespace Engine.Service.AbstractControllers
{
    public class GlobalMessages
    {
        public const string InjectedServiceIsNull = "سرویس اینجکت شده نال است";
        public const string MethodNameIsNull = "متد نال است";
        public const string DropDownIsNull = "دروپ داون نال است";
        public const string MethodNameInReflectionIsNull = "متد در رفلکشن  نال است";

        public const string SetDataParametersNull = "پارامتر های نال";
        public const string LengthsNotEqual = "سایز ها برابر نیست|";

    }

    public class GlobalNames
    {
        public const string GetDropDown = "GetDropDown";
        public const string GetDropDownAsync = "GetDropDownAsync";
        public const string GetDataTableAsync = "GetDataTableAsync";
        public const string GetDataTable = "GetDataTable";
        


        public const string ActionService = "ActionService";
        public const string PanelService = "PanelService";
        public const string FormService = "FormService";
        public const string ModelService = "ModelService";
        public const string NavigationPropertiesService = "NavigationPropertiesService";
        
        public const string SubSystemServiceName = nameof(SubSystemService);
     //   public const string SubSystemServiceServiceName = nameof(SubSystemServiceService);
        public const string QueryServiceName = nameof(QueryService);
        public const string DefineControllerServiceName = nameof(DefineControllerService);
        public const string DefineServiceMethodService = nameof(ServiceMethodService);
        public const string DefineServiceServiceName = nameof(DefineServiceService);
        public const string TablesServiceName = nameof(TablesService);
        public const string TableMethodServicesName = nameof(TableMethodsService);
        public const string DefineControllerMethodServiceName = nameof(DefineControllerMethodService);
        public const string UiInputServiceName = nameof(UiInputService);
        public const string UiFormServiceName = nameof(UiFormService);
        public const string PropertyServiceName = nameof(PropertyService);
        public const string UiItemsServiceName = nameof(UiItemsService);
        public const string UiFormInputServiceName = nameof(UiFormInputService);
        public const string UiFormItemServiceName = nameof(UiFormItemService);
        public const string UiTableItemServiceName = nameof(UiTableItemService);
        public const string UiTableFormServiceName = nameof(UiTableFormService);
        public const string UiInputMethodServiceName = nameof(UiInputMethodService);

        

        public const string EnumType = "EnumType";

        public const string RelationshipLink = "relationshipLink";


        public const string FormsController = nameof(Areas.App.Controllers.FormsController);
        public const string PropertiesController = nameof(Areas.App.Controllers.PropertiesController);
        public const string UiFormControllerMethodController = nameof(Areas.AppGeneration.Controllers.UiFormMethodController);

        public const string AppArea = "AppArea";
    }

    public class GlobalUtilities
    {
        public static object MakeNew(object o)
        {
            if (o == null)
                return null;
            
            return Activator.CreateInstance(o.GetType());
        }
    }
}