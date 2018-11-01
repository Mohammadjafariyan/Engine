using System.Runtime.CompilerServices;

namespace AppSourceGenerator
{
    public class MvcClassMaker :MvcProjectGeneratorBase, ICSharpClassMaker
    {
        public string Path;
        
        public void SetPath(string path)
        {
            Path = path;
        }

        public void CreateRegistrationClass(string AreaName,string path)
        {
            CreateClass(AreaName, path+"\\","AreaRegistration.cs", MVCUtility.GetRegisterAreaContent(AreaName));
        }

       
    }
}