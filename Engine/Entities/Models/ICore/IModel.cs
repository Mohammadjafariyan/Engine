using Engine.DomainLayer.Models.Core.ViewGeneration;
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
        
        string Name { get; set; }

    }

    public abstract class BaseEntity : IModel
    {
        [Key]
        public long Id { get; set; }

        virtual public string Name { get; set; }
    }


}
