using System;
using Domain.Attributes;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Entities.Models.UiGeneratorModels
{
    public partial class UiForm:BaseEntity
    {
        public class RelatedEntitiesLinkAttribute : BaseAttribute
        {
            public string InverseFieldName { get; set; }
            
        }
    }
}