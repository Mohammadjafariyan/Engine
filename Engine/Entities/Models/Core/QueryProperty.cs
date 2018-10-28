using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core
{
    public class QueryProperty:BaseEntity
    {

        public long ModelId { get; set; }
        public long QueryId { get; set; }

        public virtual Property Property { get; set; }
        public virtual Query Query { get; set; }
    }
}