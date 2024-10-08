﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Engine.Entities.Models.ICore;
using WebAppIDEEngine.Models.CoreEnum;

namespace WebAppIDEEngine.Models.Core
{

    /// <summary>
    /// اتصال فیلد ها به عملیات ها
    /// </summary>
    public class FieldAction : BaseEntity
    {
        public override string Name { get; set; }


        public long FieldId { get; set; }
        public long ActionId { get; set; }
        public Action Action { get; set; }
        public Field Field { get; set; }

    }
}
