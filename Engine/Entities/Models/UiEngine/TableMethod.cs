using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiEngine
{
    
    /// <summary>
    /// متد های استفاده شده توسط جدول
    /// </summary>
    public class TableMethod:BaseEntity
    {
        public override string Name { get; set; }
        public long DefineControllerMethodId { get; set; }
        public long TableId { get; set; }
        public DefineControllerMethod DefineControllerMethod { get; set; }
        public Table Table { get; set; }
        
    }
}