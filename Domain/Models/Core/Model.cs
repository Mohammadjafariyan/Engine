using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class Model : IModel
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string TableName { get; set; }
        public ModelType ModelType { get; set; }
        public List<Property> Properties { get; set; }
        public List<Form> Forms { get; set; }
        public List<NavigationProperty> NavigationProperties { get; set; }
        public List<MethodParameter> MethodParameters { get; set; }

        
    }
}
