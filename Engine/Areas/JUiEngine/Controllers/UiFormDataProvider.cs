using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiFormDataProvider
    {
        public void GetForm(string formName, ViewDataDictionary ViewData)
        {
            formName = formName.ToLower().TrimEnd();
            using (var db = new EngineContext())
            {
                var form = db.UiTableForms.Where(u => u.Name == formName).
                    Select(u=>u.UiForm).FirstOrDefault();
                if (form == null)
                    throw new Exception("فرم یافت نشد");

                ViewData[UiFormEngineController.DynamicFormUiFormInputs] = db.UiFormInputs.Include(d=>d.UiInput).Where(d=>d.UiFormId==form.Id).ToList();

                var method = form.UiFormControllerMethods.Select(u => u.DefineControllerMethod).FirstOrDefault();
                if (method == null)
                    throw new Exception("فرم مورد نظر متد ندارد");

                var controllerName = method.DefineController.Name.Replace("Controller", "");

                ViewData[UiFormEngineController.PostSubsystemUrl] = method.DefineController.SubSystem.Name;
                ViewData[UiFormEngineController.PostControllerUrl] = controllerName;
                ViewData[UiFormEngineController.PostActionUrl] = method.Name;
                ViewData[UiHomeController.Form] = form;

            }
        }
    }
}