using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Attributes;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Service.AbstractControllers;
using Engine.ServiceLayer.Systems.Engine;
using ServiceLayer.Absence;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.ICore;
using WebAppIDEEngine.Models.UiGeneratorModels;
using WebGrease.Css.Extensions;
using BaseEngineException = Engine.Controllers.AbstractControllers.AttributeBased.BaseEngineException;

namespace Engine.Controllers.AbstractControllers.ObjectBased
{
    [Authorize(Roles = "SuperUser,SystemAdmin")]
    public abstract class EBaseAppController<T, Parameter> : BaseEngineController<T, Parameter>
        where Parameter : IActionParameter where T : IModel, new()
    {
        protected IUiEngineDataProvider UiEngineDataProvider = new UiEngineDataProvider();
        protected IUiFormDataProvider UiFormDataProvider = new UiFormDataProvider();

        protected IFormConstructProvider FormConstructProvider;
        protected ITableConstructProvider TableConstructProvider;


        public EBaseAppController()
        {
            _injector = new Engine.Utitliy.Injector();
        }


        protected virtual void SetDynamicTableViewData(string actionName,
            string subSystemName, string controllerName,
            string controllerMethod, IDataTable table, UiForm form)
        {
            EjTable ejtable = TableConstructProvider.GetDataTable(actionName);

            ejtable.UiTableForms.Add(new UiTableForm
                {EjTable = ejtable, UiForm = form});

            UiEngineDataProvider.GetTable(ejtable, ViewData, Request,
                controllerName, controllerMethod, null, table);

            /*_uiEngineDataProvider.GetTable(tableName, ViewData, Request, SubSystemName,
                ControllerName, ControllerMethod, null, table);*/
        }


        protected virtual UiForm SetDynamicFormViewData
            (bool isSave, string controllerName, string action, string areaName)
        {
            UiForm form = null;
            if (isSave)
            {
                form = FormConstructProvider.GetSaveForm();
            }
            else
            {
                form = FormConstructProvider.GetDataTableSearchForm();
            }

            if (form != null)
                UiFormDataProvider.GetForm(form, areaName, controllerName, action
                    , ViewData);
            return form;
/*

            if (actionName.ToLower() == nameof(GetDataTable).ToLower())
            {

                if (form == null)
                    return form;

                string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
                string areaName = (string) HttpContext.Request.RequestContext.RouteData.DataTokens["area"];

                UiFormDataProvider.GetForm(form, areaName, controllerName, actionName
                    , ViewData);
                return form;
            }

            throw new Exception("فرم مورد نظر یافت نشد");*/
            //از خود جدول فرم انتخاب کن نه از فرم های جداول
            /*_uiFormDataProvider.GetForm(formName, ViewData, isTableForm: false,
                postType: UiFormControllerMethodType.Save);*/
        }


        // GET: App/Models
        public virtual async Task<ActionResult> GetDataTable(T p, bool? isajax)
        {
            var res = await _engineService.GetDataTableAsync(p);

            if (isajax == true)
            {
                return Json(res, JsonRequestBehavior.AllowGet);
            }

            SetDynamicTableViewDataHelper(res);
            return View(res);
        }

        public string MockAreaName { get; set; }

        public void SetDynamicTableViewDataHelper(dynamic res,
            string tableControllerName = null,
            string tableActionName = null, string tableAreaName = null,
            string formControllerName = null,
            string formActionName = null, string formAreaName = null, bool withform = true)
        {
            string actionName = tableAreaName ?? ControllerContext.RouteData.Values["action"].ToString();
            string controllerName = tableControllerName ?? GetCurrentControllerName();
            string areaName = tableActionName ?? GetCurrentAreaName();


            TableConstructProvider.CurrentArea = areaName;
            TableConstructProvider.CurrentController = controllerName;
            TableConstructProvider.CurrentAction = actionName;

            UiForm form = null;
            if (withform)
                form = SetDynamicFormViewData(false, formControllerName ?? controllerName, formActionName ?? actionName,
                    formAreaName ?? areaName);
            SetDynamicTableViewData(GetTableNamePattern(), areaName,
                controllerName, actionName, res, form);
        }


        protected string GetTableNamePattern()
        {
            string actionName = ControllerContext.RouteData.Values["action"].ToString();
            /*
            string controllerName = ControllerContext.RouteData.Values["controller"].ToString();

            return controllerName + "_table_" + actionName;
            */
            return actionName;
        }


        // GET: App/Models/Details/5
        public async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var model = _engineService.GetById(id.Value);
            await this.RenderFormAsync(model);
            if (model == null)
            {
                return HttpNotFound();
            }

            return View(model);
        }
        protected virtual async void beforeSave(T model)
        {
        }

        // POST: App/Models/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        public virtual async Task<ActionResult> Save(T model)
        {
            try
            {
                ViewData[GlobalNames.PostedModel] = model;
                if (ModelState.IsValid)
                {

                    beforeSave(model);
                    _engineService.Save(model);


                    ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                    {
                        Message = "با موفقیت ثبت شد",
                        Status = CustomResultType.success
                    };
                    //await _engineService.EngineContext.SaveChangesAsync();
                    /*

                                        SetDynamicFormViewData(true,
                                            GetCurrentControllerName(),GetCurrentActionName(),
                                            GetCurrentAreaName());*/

                     await afterSave(model);
                    return RedirectToAction("GetDataTable");
                }
                else
                {
                    ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                    {
                        Message = "ورودی های اشتباه است ثبت نشد",
                        Status = CustomResultType.fail
                    };
                }

                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);

                ViewData[GlobalNames.AllErrors] = allErrors;
            }
            catch (JServiceException e)
            {
                ViewData[GlobalNames.MVCResponseMessage] = new CustomResult
                {
                    Message = e.Message,
                    Status = CustomResultType.fail
                };
            }
            catch (Exception e)
            {
                GenErrorMessage(ViewData,e.Message);
            }


            var id = model?.Id != 0 ? model?.Id : null;
            return await ForEdit(id);
        }

        protected virtual async Task afterSave(T model)
        {
        }

        public static IEnumerable<ModelError>
            GenErrorMessage(ViewDataDictionary viewData, params string[] eMessage)
        {
            
            List<ModelError> allErrors = new List<ModelError>();
            foreach (var s in eMessage)
            {
                allErrors.Add(new ModelError(s));
            }

            viewData[GlobalNames.AllErrors] = allErrors;
            return allErrors;
        }


        // GET: App/Models/Edit/5
        public virtual async Task<ActionResult> ForEdit(long? id)
        {
            if (id == null)
            {
                var m = _injector.Inject<T>();
                ViewData[UiFormEngineController.Model] = m;

                SetDynamicFormViewData(true,
                    GetCurrentControllerName(), "Save",
                    GetCurrentAreaName());
                return View("ForEdit", m);
            }

            var model = _engineService.GetForEdit(id.Value);
            SetDynamicFormViewData(true,
                GetCurrentControllerName(), "Save",
                GetCurrentAreaName());
            if (model == null)
            {
                return HttpNotFound();
            }

            ViewData[UiFormEngineController.Model] = model;

            return View("ForEdit", model);
        }

        private string GetCurrentAreaName()
        {
            string areaName = "";
            if (string.IsNullOrEmpty(MockAreaName))
                areaName = (string) HttpContext.Request.RequestContext.RouteData.DataTokens["area"];
            else
            {
                areaName = MockAreaName;
            }

            return areaName;
        }

        private string GetCurrentActionName()
        {
            string action = ControllerContext.RouteData.Values["action"].ToString();
            return action;
        }

        private string GetCurrentControllerName()
        {
            string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
            return controllerName;
        }


        public virtual async Task RenderFormAsync(IModel r)
        {
            if (r == null)
                throw new BaseEngineException("پارامتر نال است");


            var parameters = Request?.Params;

            IDropDownParameter dropdownparam = GetDropDownParams(parameters);
            ITreeParameter _ITreeParameter = GetTreeParams(parameters);
            IMultiSelectParameter _IMultiSelectParameter = GetMultiSelectParams(parameters);
            IDataTableParameter _IDataTableParameter = GetDataTableParams(parameters);

            Dictionary<string, DropDownAttribute> dropdowns = _engineService.GetModelDropdownAttributes<T>();
            Dictionary<string, DataTableAttribute> datatables = _engineService.GetModelTableAttributes<T>();
            Dictionary<string, TreeAttribute> trees = _engineService.GetModelTreeAttributes<T>();
            Dictionary<string, MultiSelectAttribute> multiselects = _engineService.GetModelMultiSelectAttributes<T>();
            Dictionary<string, List<SelectListItem>> enums = _engineService.GetEnumsAttributes<T>(r);

            Dictionary<string, List<IDropDownOption>> dropdownData =
                await _engineService.GetDropdownDataAsync(dropdowns, dropdownparam);
            Dictionary<string, IQueryable<IDataTable>> dataTableData =
                await _engineService.GetDataTableDataAsync(datatables, _IDataTableParameter);
            Dictionary<string, ITreeNode> treeData = await _engineService.GetTreeDataAsync(trees, _ITreeParameter);
            Dictionary<string, List<IDropDownOption>> multiSelectData =
                await _engineService.GetMultiSelectDataAsync(multiselects, _IMultiSelectParameter);

            _engineService.SetData(dropdownData.Keys.ToArray(), dropdownData.Values.ToArray(), ViewData);
            _engineService.SetData(dataTableData.Keys.ToArray(), datatables.Values.ToArray(), ViewData);
            _engineService.SetData(treeData.Keys.ToArray(), treeData.Values.ToArray(), ViewData);
            _engineService.SetData(multiSelectData.Keys.ToArray(), multiSelectData.Values.ToArray(), ViewData);
            _engineService.SetData(enums.Keys.ToArray(), enums.Values.ToArray(), ViewData);
        }

        protected virtual IDataTableParameter GetDataTableParams(NameValueCollection parameters)
        {
            return null;
        }

        protected virtual IMultiSelectParameter GetMultiSelectParams(NameValueCollection parameters)
        {
            return null;
        }

        protected virtual ITreeParameter GetTreeParams(NameValueCollection parameters)
        {
            return null;
        }

        protected virtual IDropDownParameter GetDropDownParams(NameValueCollection parameters)
        {
            return null;
        }

        [HttpPost]
        public virtual ActionResult Delete(long id)
        {
            try
            {
                _engineService.Delete(id);

                return Json(new CustomResult
                {
                    Status = CustomResultType.success,
                    Message = "با موفقیت حذف شد"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (JServiceException e)
            {
                return Json(new CustomResult
                {
                    Status = CustomResultType.fail,
                    Message = e.Message
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new CustomResult
                {
                    Status = CustomResultType.fail,
                    Message = " حذف با خطا مواجه شد " + e.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}