using System;
using System.Collections.Generic;
using System.Linq;
using Engine.Entities.Models.ICore;

namespace Engine.DomainLayer.Models.Core.ViewGeneration
{
    public class RelationshipLink:BaseEntity
    {
        public string Controller { get; set; }
        public string Method { get; set; }
        public string Area { get; set; }
        public string Action { get; set; }
        public string Order { get; set; }
        public override string Name { get; set; }
        public string Icon { get; set; }
        public bool InModal { get; set; }
        public bool SetFormValues{ get; set; }
        public string Form { get;  set; }
    }
}