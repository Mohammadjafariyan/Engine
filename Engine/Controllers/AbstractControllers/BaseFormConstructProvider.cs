using Engine.Entities.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers
{
    public abstract class BaseFormConstructProvider : IFormConstructProvider
    {
        public UiForm GetSaveForm()
        {
            throw new System.NotImplementedException();
        }

        public UiForm GetDataTableSearchForm()
        {
            throw new System.NotImplementedException();
        }
    }
}