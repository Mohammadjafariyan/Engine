using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAppIDEEngine.Models;

namespace Engine.Areas.JUiEngine.Controllers
{
    public class UiFormEngineController : Controller
    {
     //   public static readonly string UiFormItems = "UiFormItems";
        public static readonly string ItemsPartialFormId = "ItemsPartialFormId";
        public static readonly string PostSubsystemUrl = "PostSubsystemUrl";
        public static readonly string PostControllerUrl = "PostControllerUrl";
        public static readonly string PostActionUrl = "PostActionUrl";
        public static readonly string IsAjax = "IsAjax";
        public static readonly string BackUrl = "BackUrl";
        public static readonly string UpdateIdafterpost = "UpdateIdafterpost";
        public static readonly string DynamicFormUiFormInputs = "UiFormInputs";
        public static readonly string WithLayout = "WithLayout";
        public static readonly string SubmitName = "SubmitName";
        public static readonly string OnCompleteFunction = "OnCompleteFunction";
        private UiFormDataProvider _provider = new UiFormDataProvider();


        // GET: JUiEngine/UiFormEngine
        public ActionResult ShowView(string formName,string BackUrl,bool isAjax=false)
        {
            try
            {
                if (string.IsNullOrEmpty(formName))
                {
                    throw new Exception("formName is null");
                }

                _provider.GetForm(formName, ViewData);
            }
            catch (UiEngineException e)
            {
                throw e;
            }

            return View();
        }
    }
}