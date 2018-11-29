using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers
{
    public interface ITableConstructProvider
    {
        EjTable GetDataTable(string actionName);
        
    }
}