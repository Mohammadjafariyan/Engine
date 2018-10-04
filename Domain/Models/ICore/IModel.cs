using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppIDEEngine.Models.ICore
{
    public interface IModel
    {
        [Key]
        long Id { get; set; }

    }
}
