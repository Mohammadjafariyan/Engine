using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models;

namespace Engine.Areas.JUiEngine.Controllers
{
    public interface IUiFormDataProvider
    {
        UiForm GetForm(string formName, ViewDataDictionary ViewData, bool isTableForm,
            UiFormControllerMethodType postType);
    }

    public class UiFormDataProvider : IUiFormDataProvider
    {
        public UiForm GetForm(string formName, ViewDataDictionary ViewData, bool isTableForm,
            UiFormControllerMethodType postType)
        {
            formName = formName.ToLower().TrimEnd();
            using (var db = new EngineContext())
            {
                UiForm form = null;
                if (isTableForm)
                {
                    form = db.UiTableForms.Where(u => u.Name.ToLower().TrimEnd() == formName).
                        Select(u => u.UiForm).FirstOrDefault();
                }
                else
                {
                    form=db.UiForms.Where(u => u.Name.ToLower().TrimEnd() == formName).FirstOrDefault();
                }
                if (form == null)
                    throw new Exception("فرم یافت نشد");

                ViewData[UiFormEngineController.DynamicFormUiFormInputs] = db.UiFormInputs.Include(d=>d.UiInput).Include(d=>d.UiInput.UiInputMethods).Include(d=>d.UiInput.UiInputMethods.Select(m=>m.DefineControllerMethod)).Where(d=>d.UiFormId==form.Id).ToList();

                var method = form.UiFormControllerMethods.Where(d=>d.Type==postType).Select(u => u.DefineControllerMethod).FirstOrDefault();
                if (method == null)
                    throw new Exception("فرم مورد نظر متد ندارد");

                var controllerName = method.DefineController.Name.Replace("Controller", "");

                ViewData[UiFormEngineController.PostSubsystemUrl] = method.DefineController.SubSystem.Name;
                ViewData[UiFormEngineController.PostControllerUrl] = controllerName;
                ViewData[UiFormEngineController.PostActionUrl] = method.Name;
                ViewData[UiHomeController.Form] = form;
                return form;
            }
        }
    }
}