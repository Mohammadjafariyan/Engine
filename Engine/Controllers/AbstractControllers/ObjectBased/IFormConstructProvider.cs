using Engine.Entities.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers.ObjectBased
{
    public interface IFormConstructProvider
    {
        UiForm GetSaveForm();
        UiForm GetDataTableSearchForm();
    }
}