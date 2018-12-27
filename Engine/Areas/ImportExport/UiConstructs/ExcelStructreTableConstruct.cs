using System.Linq;
using Engine.Controllers.AbstractControllers.ObjectBased;
using MvcContrib.TestHelper.Ui;
using WebAppIDEEngine.Models.UiGeneratorModels;

namespace Engine.Areas.ImportExport.UiConstructs
{
    public class ExcelStructreTableConstruct : BaseConstructProvider
    {
        public override void GetTableUiItems(EjTable ejtable)
        {
            base.GetTableUiItems(ejtable);
            ejtable.UiTableItems.Where(i => i.UiItem.UiItemType == UiItemType.GoToSave).ForEach(i =>
            {
                i.UiItem.CustomUrl = $@"/{CurrentArea}/{CurrentController}/Create";
            });
        }
    }
}