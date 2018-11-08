using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Newtonsoft.Json;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class QueryModel : BaseEntity
    {

        public QueryModel()
        {
            this.LeftJoinTables=new List<JoinTable>();
            this.RightJoinTables=new List<JoinTable>();
        }


        public long uniqId { get; set; }
        public long QueryId { get; set; }

        public  Query Query { get; set; }
        

        public  Model Model { get; set; }
        public long ModelId { get; set; }
        public bool IsMainTable { get; set; }

        public virtual ICollection<JoinTable> LeftJoinTables { get; set; }
        public virtual ICollection<JoinTable> RightJoinTables { get; set; }
        

    }
}