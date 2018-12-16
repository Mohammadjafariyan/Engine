using System.Linq;
using Engine.Controllers.AbstractControllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.Absence.UiConstructs
{
    public class ObligatedRangesConstructs: BaseConstructProvider, IFormConstructProvider, ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return null;
        }

        
        public override void GetTableUiItems(EjTable ejtable)
        {
            
            var UiItem = new UiItem
            {
                Name = "ثبت جدید",
                UiItemType = UiItemType.Link,
                CustomUrl = $@"/Absence/ObligatedRange/Index/#/absence/home"
            };
            
            var delete = new UiItem
            {
                Name = "حذف",
                UiItemType = UiItemType.Delete,
                CustomUrl =$@"/{CurrentArea}/Api/{CurrentController}Api/Delete"
            };
            ejtable.UiTableItems.Add(new UiTableItem{EjTable = ejtable,UiItem = UiItem});
            ejtable.UiTableItems.Add(new UiTableItem{EjTable = ejtable,UiItem = delete});
        }

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}