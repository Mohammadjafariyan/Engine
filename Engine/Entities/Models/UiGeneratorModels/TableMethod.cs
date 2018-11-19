using Engine.Attributes;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.UiGeneratorModels
{
    /// <summary>
    /// متد های استفاده شده توسط جدول
    /// </summary>
    public class TableMethod : BaseEntity
    {
        public override string Name { get; set; }

        [DropDown(Name = "متد", Service = GlobalNames.DefineControllerMethodServiceName,
            MethodName = GlobalNames.GetDropDownAsync)]
        public long DefineControllerMethodId { get; set; }

        [DropDown(Name = "جدول", Service = GlobalNames.TablesServiceName, MethodName = GlobalNames.GetDropDownAsync)]
        public long TableId { get; set; }

        public virtual DefineControllerMethod DefineControllerMethod { get; set; }
        public virtual EjTable EjTable { get; set; }
    }
}