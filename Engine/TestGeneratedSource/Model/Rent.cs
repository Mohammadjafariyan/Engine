
using Engine.Attributes;
using Engine.DomainLayer.Models.Core.QueryBuild;
using Engine.Service.AbstractControllers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.Core.QueryBuild;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace Models
{

        /// <summary>
        /// Rent
        /// </summary>
        public class Rent :BaseEntity{public long UserId{get;set;}
public long BookId{get;set;}
public bool IsBack{get;set;}
public DateTime BackDate{get;set;}
public long Penalty{get;set;}
public bool IsPayed{get;set;}
} 
 }