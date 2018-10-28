using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class QueryModel : BaseEntity
    {

        public long ModelId { get; set; }
        public long QueryId { get; set; }

        public virtual  Model Model { get; set; }
        public virtual Query Query { get; set; }
    }
}