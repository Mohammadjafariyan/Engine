using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations.Schema;

namespace Engine.Areas.Mobile.Models
{
    

    public class WorkplaceGps
    {
        [JsonProperty("WorkplaceId")]
        public long WorkplaceId { get; set; }

        [JsonProperty("data")]
        public Datum[][][] Data { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [NotMapped]
        public string token { get;  set; }
        [NotMapped]
        public DateTime tokenTime { get;  set; }
        
    }

    public partial class Datum
    {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }
    
    /*
    public class WorkplaceGps
    {

        public virtual  Data data { get; set; }
        public double area { get; set; }
        public string Name { get; set; }
        public long WorkplaceId { get; set; }
    }
    
    public class Properties
    {
      
    }
    
    public class Geometry
    {
        public Geometry()
        {
            coordinates=new List<ICollection<ICollection<double>>>();
        }

        
        public virtual ICollection<ICollection<ICollection<double>>> coordinates { get; set; }
        public string type { get; set; }
        public virtual Feature Feature { get; set; }
    }

    
    public class Feature 
    {

        
        public Feature()
        {
        }

        public string id { get; set; }
        public string type { get; set; }
        public virtual  Properties properties { get; set; }
        public virtual  Geometry geometry { get; set; }
        public virtual Data Data { get; set; }
    }

    
    public class Data
    {

        public Data()
        {
            features=new List<Feature>();
        }
        public string type { get; set; }
        public virtual  ICollection<Feature> features { get; set; }
    }
*/

   
}