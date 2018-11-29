using System;
using Engine.Entities.Models.UiGeneratorModels;

namespace Engine.Controllers.AbstractControllers
{
    public interface IFormConstructProvider
    {
        UiForm GetSaveForm();
        UiForm GetDataTableSearchForm();
    }
}