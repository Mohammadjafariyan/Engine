using System.IO;

namespace AppSourceGenerator
{
    public abstract  class MvcProjectGeneratorBase : IMVCProjectGeneratorBase
    {
        protected string Path; 
        
     
        public string CreateIsNotExist(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return path;
        }
        
        public string CreateFileIsNotExist(string areaName)
        {
            if (!File.Exists(areaName))
            {
                var f=File.Create(areaName);
                f.Close();
            }
            return areaName ;
        }

        public void WriteContentToFile(string registerAreaContent, string fileNameAndPath)
        {
            File.WriteAllText(fileNameAndPath,registerAreaContent);
        }
        
        public void CreateClass(string className, string path
            ,string extention,string content)
        {
            CreateIsNotExist(path);

            var fileNameAndPath =path+className + extention;
            CreateFileIsNotExist(fileNameAndPath);

            var registerAreaContent =content;
            WriteContentToFile(registerAreaContent, fileNameAndPath);
        }
    }
}