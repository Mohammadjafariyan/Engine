using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TypeLite;

namespace Engine.Entities.Data.Absence.Models
{
    [TsClass]
    public class WorkGroupObligatedRange: Engine.Entities.Models.ICore.BaseEntity,AbsenceBase
    {
        public   long ObligatedRangeId { get; set; }
        public   long   WorkGroupId{ get; set; }

        public virtual  ObligatedRange ObligatedRange { get; set; }
        public virtual  WorkGroup    WorkGroup{ get; set; }
        
        /// <summary>
        /// تاریخ شروع به کار
        /// </summary>
        
        public DateTime? DateTime { get; set; }


        [RegularExpression(@"^$|^([1۱][۰-۹ 0-9]{3}[/\/]([0 ۰][۱-۶ 1-6])[/\/]([0 ۰][۱-۹ 1-9]|[۱۲12][۰-۹ 0-9]|[3۳][01۰۱])|[1۱][۰-۹ 0-9]{3}[/\/]([۰0][۷-۹ 7-9]|[1۱][۰۱۲012])[/\/]([۰0][1-9 ۱-۹]|[12۱۲][0-9 ۰-۹]|(30|۳۰)))$", ErrorMessage = "تاریخ وارد شده نامعتبر است.")]
        public string DateTimeIran { get; set; }

        public  ApplicationUser ApplicationUser { get; set; }

    }
}