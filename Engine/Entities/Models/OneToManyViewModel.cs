using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Engine.Entities.Models
{
    public class OneToManyViewModel
    {
        public long OneId { get; set; }
        
        public List<long> Many { get; set; }
        public List<bool> ManyBool { get; set; }

    }
    
    
    public class WorkGroupObligatedRangeOneToManyViewModel:OneToManyViewModel
    {
        [RegularExpression(@"^$|^([1۱][۰-۹ 0-9]{3}[/\/]([0 ۰][۱-۶ 1-6])[/\/]([0 ۰][۱-۹ 1-9]|[۱۲12][۰-۹ 0-9]|[3۳][01۰۱])|[1۱][۰-۹ 0-9]{3}[/\/]([۰0][۷-۹ 7-9]|[1۱][۰۱۲012])[/\/]([۰0][1-9 ۱-۹]|[12۱۲][0-9 ۰-۹]|(30|۳۰)))$", ErrorMessage = "تاریخ وارد شده نامعتبر است.")]
        public string DateTimeIran { get; set; }
    }
}