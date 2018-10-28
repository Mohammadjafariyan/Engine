using Engine.Attributes;
using Engine.DomainLayer.Models.Core.QueryBuild;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Model : BaseEntity
    {
        [Text(Name="نام")]
        public string Name { get; set; }
        [Text(Name = "نام جدول")]
        public string TableName { get; set; }

        [Text(Name = "AsName")]
        public string AsName { get; set; }

        [Enum(Name = "نوع ")]
        public ModelType ModelType { get; set; }

        public int elementX { get; set; }
        public int elementY { get; set; }

        public object element { get; set; }

        public virtual List<Property> Properties { get; set; }
        public virtual List<Form> Forms { get; set; }

        public virtual List<NavigationProperty> NavigationProperties { get; set; }
        //public List<MethodParameter> MethodParameters { get; set; }
        public virtual ICollection<QueryModel> UsedInQueries { get; set; }

        public virtual ICollection<JoinTable> JoinRightTables { get; set; }
        public virtual ICollection<JoinTable> JoinLeftTables { get; set; }
        public virtual ICollection<Query> MainTableQueries { get; set; }
    }
}
