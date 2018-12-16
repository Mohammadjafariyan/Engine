using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers.ObjectBased
{
    public interface ITableConstructProvider
    {
        EjTable GetDataTable(string actionName);
        void GetTableUiItems(EjTable table);
        

         string CurrentArea { get; set; }
         string CurrentController { get; set; }
         string CurrentAction { get; set; }
    }
}