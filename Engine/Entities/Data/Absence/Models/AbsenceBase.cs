using System.ComponentModel.DataAnnotations;
using Engine.Entities.Data;
using TypeLite;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Absence.Models
{
    [TsClass]
    public class AbsenceBase :BaseEntity
    {
        
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}