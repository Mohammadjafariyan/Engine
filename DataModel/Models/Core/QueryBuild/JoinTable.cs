using System;
using System.Collections.Generic;
using System.Linq;
using WebAppIDEEngine.Models.Core;
using WebAppIDEEngine.Models.CoreEnum;

namespace Engine.DomainLayer.Models.Core.QueryBuild
{
    public class JoinTable
    {
        public WebAppIDEEngine.Models.Core.Model leftTable { get; set; }
        public WebAppIDEEngine.Models.Core.Model rightTable { get; set; }
        public Property rightProperty { get; set; }
        public Property leftProperty { get; set; }
        public JoinTableType joinType { get; set; }

    }
}