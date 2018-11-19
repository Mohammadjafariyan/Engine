
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
        /// User
        /// </summary>
        public class User :BaseEntity{public string Tel{get;set;}
public string LastName{get;set;}
public string NationalCode{get;set;}
} 
 }