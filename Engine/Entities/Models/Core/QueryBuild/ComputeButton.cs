using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAppIDEEngine.Models.Core;

namespace Engine.Entities.Models.Core.QueryBuild
{
    public class ComputeButton
    {
        [Key]
        public long Id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
        public Position position { get; set; }
        public bool isSelected { get; set; }
        public SelectButtonType type { get; set; }

        public Query Query { get; set; }
        public long QueryId { get; set; }
        
        public string fillContent { get; set; }
        public int order{ get; set; }

    public virtual  ICollection<ComputePossibleValue>   possibleValue { get; set; }
    }

    [ComplexType]
    public class Position
    {
        public long x { get; set; }
        public long y { get; set; }
    }
    
    
    
    public class ComputePossibleValue {
        [Key]
        public long Id { get; set; }
        public long ComputeButtonId { get; set; }
        public string   name { get; set; }
        public string  value{ get; set; }
        public object  obj{ get; set; }
        public ComputeButton  ComputeButton{ get; set; }
        
        
    }
    
    /*many: از کوئری یا تمامی مقادیر یک ستون را مقایسه می کند
* one : تنها یکی از مقادیر ستون را انتخاب می کند
* multi : چند مقدار را مقایسه می کند*/
    public enum SelectButtonType {
        one=8, many=9,multi=12
    }
}
/*


export class ComputeButton {
    name;
    position = {x: 0, y: 0};
value;
isSelected: boolean=false;
clone() {
return Object.assign({},this);
}
}*/