namespace Engine.Areas.printer.Models
{
    public interface IDocData
    {
        DocType DocType { get; set; }
        string Name { get; set; }
        string Value { get; set; }
    }

    public class DocData : IDocData
    {
        public DocType DocType { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }


    public enum DocType
    {
        Text,
        Image,
        Table
    }
}