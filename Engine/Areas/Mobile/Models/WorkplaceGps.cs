using System.Collections.Generic;

namespace Engine.Areas.Mobile.Models
{
    public class WorkplaceGps
    {
        public string id { get; set; }
        public Data data { get; set; }
        public double area { get; set; }
    }
    public class Properties
    {
    }

    public class Geometry
    {
        public IList<IList<IList<double>>> coordinates { get; set; }
        public string type { get; set; }
    }

    public class Feature
    {
        public string id { get; set; }
        public string type { get; set; }
        public Properties properties { get; set; }
        public Geometry geometry { get; set; }
    }

    public class Data
    {
        public string type { get; set; }
        public IList<Feature> features { get; set; }
    }

   
}