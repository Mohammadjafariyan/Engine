using Engine.Attributes;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Entities.Models.Core.AppGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;
using Newtonsoft.Json;

namespace WebAppIDEEngine.Models.Core
{
    public class Model : BaseEntity
    {
        [Text(Name="نام")]
        public override string Name { get; set; }
        [Text(Name = "نام جدول")]
        public string TableName { get; set; }

        [Text(Name = "AsName")]
        public string AsName { get; set; }

        [Enum(Name = "نوع ")]
        public ModelType ModelType { get; set; }

        public int elementX { get; set; }
        public int elementY { get; set; }

        public object element { get; set; }

        



        public Model()
        {
            this.Properties=new List<Property>();
            this.NavigationProperties=new List<NavigationProperty>();
            this.Forms=new List<Form>();
            this.DefineControllerMethods=new List<DefineControllerMethod>();
   
            this.DefineServices = new List<DefineService>();
            this.DefineControllers = new List<DefineController>();
            this.UsedInQueries = new List<QueryModel>();
        }
        /*

                [OpenDataTable(Name = "پروپرتی ها",
                    Controller = GlobalNames.PropertiesController
                    ,Area = GlobalNames.AppArea,Parameters = "Id:ModelId")]*/

      
        public virtual List<Property> Properties { get; set; }

        /*[OpenDataTable(Name = "فرم ها",
            Controller = GlobalNames.FormsController
            ,Area = GlobalNames.AppArea,Parameters = "Id:ModelId")]*/

        [JsonIgnore]
        [XmlIgnore]
        [OpenDataTable(Controller = GlobalNames.FormsController,Area = "App")]
        public virtual List<Form> Forms { get; set; }


        [JsonIgnore]
        [XmlIgnore]
        public virtual List<NavigationProperty> NavigationProperties { get; set; }
        //public List<MethodParameter> MethodParameters { get; set; }

        [JsonIgnore]
        [XmlIgnore]
        public virtual ICollection<QueryModel> UsedInQueries { get; set; }


     
        
        [JsonIgnore]
        [XmlIgnore]
        public virtual ICollection<DefineService> DefineServices { get; set; }

        [JsonIgnore]
        [XmlIgnore]
        public virtual ICollection<DefineController> DefineControllers { get; set; }

        [JsonIgnore]
        [XmlIgnore]
        public virtual ICollection<DefineControllerMethod> DefineControllerMethods { get; set; }
        
        
    }
}
