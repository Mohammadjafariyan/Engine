using System.ComponentModel.DataAnnotations;
using TypeLite;

namespace Engine.Absence.Models
{
    [TsClass]
    public class AbsenceBase
    {
        [Key]
        public long Id { get; set; }
    }
}