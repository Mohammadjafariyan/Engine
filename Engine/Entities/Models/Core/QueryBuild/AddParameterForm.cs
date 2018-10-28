using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.ICore;

namespace WebAppIDEEngine.Models.Core.QueryBuild
{


    /// <summary>
    /// پارامتر ورودی برای متد و اس کیو ال
    /// </summary>
    public class AddParameterForm:BaseEntity
    {

        public string nameInSQL { get; set; }

        public string nameInMethod { get; set; }

        public string nameInComment { get; set; }

        public PropertyType typeInModel { get; set; }

        public PropertyInDatabaseType typeInSQL { get; set; }

        public bool range { get; set; }

        public string defaultValue { get; set; }


        public string uniqId { get; set; }

        public bool nullable { get; set; }

        public bool isSelected { get; set; }


        public long QueryId { get; set; }
        public virtual Query Query { get; set; }

        //public bool foredit;
    }
}