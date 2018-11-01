namespace AppSourceGenerator
{
    public interface IMVCProjectGeneratorBase 
    {
        string CreateIsNotExist(string path);
        string CreateFileIsNotExist(string areaName);
        void WriteContentToFile(string registerAreaContent, string fileNameAndPath);

        void CreateClass(string areaName, string path
            ,string extention,string content);
    }
}