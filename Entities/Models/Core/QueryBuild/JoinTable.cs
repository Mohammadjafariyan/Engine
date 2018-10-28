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
        public WebAppIDEEngine.Models.Core.Model leftTable { get; set; }
        public WebAppIDEEngine.Models.Core.Model rightTable { get; set; }
        public long rightTableId { get; set; }
        public long leftTableId { get; set; }
        public long rightPropertyId { get; set; }
        public long leftPropertyId { get; set; }
        public virtual Property rightProperty { get; set; }
        public virtual Property leftProperty { get; set; }
        public JoinTableType joinType { get; set; }


        public long QueryId { get; set; }
        public virtual Query Query { get; set; }

    }
}