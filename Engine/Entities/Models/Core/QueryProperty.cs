using System.Collections.Generic;
using System.Xml.Serialization;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Entities.Models.ICore;
using Newtonsoft.Json;

namespace WebAppIDEEngine.Models.Core
{
    public class QueryProperty:BaseEntity
    {
        public override string Name { get; set; }
        public long PropertyId { get; set; }
        public long QueryId { get; set; }
        public long uniqId { get; set; }
        public string NameInTableAsName { get; set; }
        
        
        

        public virtual Property Property { get; set; }
        public  Query Query { get; set; }
            
        public bool onOutPut { get; set; }
        
        [JsonIgnore]
        [XmlIgnore]
        public ICollection<JoinTable> JoinRightTables { get; set; }
      
       
        [JsonIgnore]
        [XmlIgnore] 
        public ICollection<JoinTable> JoinLeftTables { get; set; }

    }
}