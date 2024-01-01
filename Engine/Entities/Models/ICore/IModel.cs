using System.ComponentModel.DataAnnotations;

namespace Engine.Entities.Models.ICore
{
    public interface IModel
    {
        [Key]
        long Id { get; set; }
        
        string Name { get; set; }
         string ApplicationUserId { get; set; }

    }

    public abstract class BaseEntity : IModel
    {
        [Key]
        public long Id { get; set; }

        virtual public string Name { get; set; }
        
        public virtual string ApplicationUserId { get; set; }

    }


}
