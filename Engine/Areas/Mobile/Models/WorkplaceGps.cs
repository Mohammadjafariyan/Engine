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

        [NotMapped]
        [JsonProperty("data")]
        public Datum[][][] Data { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }
        
        [JsonProperty("MapData")]
        public string MapData { get;  set; }


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
    
    
    public partial class Map
    {
        public string Type { get; set; }
        public Feature[] Features { get; set; }
    }

    public partial class Feature
    {
        public FeatureType Type { get; set; }
        public Properties Properties { get; set; }
        public Geometry Geometry { get; set; }
    }

    public partial class Geometry
    {
        public GeometryType Type { get; set; }
        public Coordinate[] Coordinates { get; set; }
    }

    public partial class Properties
    {
        public double? Radius { get; set; }
    }

    public enum GeometryType { Point, Polygon };

    public enum FeatureType { Feature };

    public partial struct Coordinate
    {
        public double? Double;
        public double[][] DoubleArrayArray;

        public static implicit operator Coordinate(double Double) => new Coordinate { Double = Double };
        public static implicit operator Coordinate(double[][] DoubleArrayArray) => new Coordinate { DoubleArrayArray = DoubleArrayArray };
    }

   
}