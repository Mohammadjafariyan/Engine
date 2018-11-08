using System;
using System.Collections.Generic;
using System.Linq;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace Engine.DomainLayer.Models.Core.QueryBuild
{

    /// <summary>
    /// جوین های انتخاب شده
    /// </summary>
    public class JoinTable:BaseEntity
    {
        
        public long uniqId { get; set; }
        public  WebAppIDEEngine.Models.Core.QueryModel leftTable { get; set; }
        public  WebAppIDEEngine.Models.Core.QueryModel rightTable { get; set; }
        public long? rightTableId { get; set; }
        public long? leftTableId { get; set; }
        public long? rightPropertyId { get; set; }
        public long? leftPropertyId { get; set; }
        
        public long leftTableUniqId { get; set; }
        public long rightTableUniqId { get; set; }
        
        
        public  virtual QueryProperty rightProperty { get; set; }
        public virtual QueryProperty leftProperty { get; set; }
        public JoinTableType joinType { get; set; }
        
        

/*

        public long? QueryId { get; set; }
        public virtual Query Query { get; set; }*/

    }
}