using Engine.Attributes;
using Engine.Controllers.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.ICore;
using System.Collections.Specialized;
using System.ComponentModel;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.ServiceLayer.Systems.Engine;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.UiGeneratorModels;
using WebGrease.Css.Extensions;

namespace WebAppIDEEngine.Areas.App.Controllers
{
    public abstract class EBaseAppController<T, Parameter> : BaseEngineController<T, Parameter>
        where Parameter : IActionParameter where T : IModel, new()
    {
        public RelationshipLinkService relationshipLinkService = new RelationshipLinkService();


        protected IUiEngineDataProvider _uiEngineDataProvider = new UiEngineDataProvider();
        protected IUiFormDataProvider _uiFormDataProvider = new UiFormDataProvider();

        protected IFormConstructProvider _formConstructProvider;
        protected ITableConstructProvider _tableConstructProvider;



        public EBaseAppController()
        {
            _injector = new Engine.Utitliy.Injector();
        }


        protected virtual void SetDynamicTableViewData(string actionName,
            string subSystemName, string controllerName,
            string controllerMethod, IDataTable table)
        {
            if (actionName == nameof(GetDataTable))
            {
                EjTable ejtable = _tableConstructProvider.GetDataTable(actionName);

              
                ejtable.UiTableForms.Add(new UiTableForm
                    {EjTable = ejtable, UiForm = SetDynamicFormViewData(actionName)});


                _uiEngineDataProvider.GetTable(ejtable, ViewData, Request,
                    controllerName, controllerMethod, null, table);
            }

            /*_uiEngineDataProvider.GetTable(tableName, ViewData, Request, SubSystemName,
                ControllerName, ControllerMethod, null, table);*/
        }


        protected virtual UiForm SetDynamicFormViewData(string actionName)
        {
            if (string.IsNullOrEmpty(actionName))
            {
                throw new Exception("actionName is null");
            }

            if (actionName == nameof(ForEdit) || actionName == nameof(Save))
            {
                UiForm form = _formConstructProvider.GetSaveForm();

                string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
                string areaName = (string) HttpContext.Request.RequestContext.RouteData.DataTokens["area"];

                _uiFormDataProvider.GetForm(form, areaName, controllerName, nameof(Save)
                    , ViewData);
                return form;
            }

            if (actionName == nameof(GetDataTable))
            {
                UiForm form = _formConstructProvider.GetDataTableSearchForm();

                string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
                string areaName = (string) HttpContext.Request.RequestContext.RouteData.DataTokens["area"];

                _uiFormDataProvider.GetForm(form, areaName, controllerName, actionName
                    , ViewData);
                return form;
            }

            throw new Exception("فرم مورد نظر یافت نشد");
            //از خود جدول فرم انتخاب کن نه از فرم های جداول
            /*_uiFormDataProvider.GetForm(formName, ViewData, isTableForm: false,
                postType: UiFormControllerMethodType.Save);*/
        }


        public virtual void Search(T searchModel)
        {
            if (searchModel == null)
                throw new Exception("searchmodel is null");
            var nameValues = new NameValueCollection();
            searchModel.GetType().GetProperties().ForEach(p =>
            {
                var o = p.GetValue(p);
                if (o != null)
                {
                    nameValues.Add(p.Name, o.ToString());
                }
            });

            // _engineService.Search<T>(nameValues);
        }


        // GET: App/Models
        public async Task<ActionResult> GetDataTable(IDataTableParameter p)
        {
            var res = await _engineService.GetDataTableAsync(p);
            res.RecordsList = await res.Records.ToListAsync();

            string actionName = ControllerContext.RouteData.Values["action"].ToString();
            string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
            string areaName = (string) HttpContext.Request.RequestContext.RouteData.DataTokens["area"];


            SetDynamicTableViewData(GetTableNamePattern(), areaName, controllerName, actionName, res);
            return View(res);
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

        protected string GetFormNamePattern()
        {
            string actionName = ControllerContext.RouteData.Values["action"].ToString();

            /*
string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
*/

            //   return controllerName + "_form_" + actionName;
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


        // POST: App/Models/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        public virtual async Task<ActionResult> Save(T model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id == 0)
                {
                    _engineService.Insert(model);
                }
                else
                {
                    _engineService.Update(model);
                }

                await _engineService.EngineContext.SaveChangesAsync();

                SetDynamicFormViewData(GetFormNamePattern());

                return RedirectToAction("GetDataTable");
            }
            
            IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);

            ViewData[GlobalNames.AllErrors] = allErrors;

            var id = model?.Id != 0 ? model?.Id : null;
            return await ForEdit(id);
        }



        // GET: App/Models/Edit/5
        public async Task<ActionResult> ForEdit(long? id)
        {
            if (id == null)
            {
                var m = _injector.Inject<T>();
                SetDynamicFormViewData(GetFormNamePattern());
                return View("ForEdit",m);
            }

            var model = _engineService.GetForEdit(id.Value);
            SetDynamicFormViewData(GetFormNamePattern());
            if (model == null)
            {
                return HttpNotFound();
            }

            return View("ForEdit",model);
        }


        // GET: App/Models/Delete/5

        // POST: App/Models/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(long id)
        {
            var model = _engineService.Delete(id);
            await _engineService.EngineContext.SaveChangesAsync();
            return RedirectToAction("GetDataTable");
        }


        public virtual async Task RenderFormAsync(IModel r)
        {
            if (r == null)
                throw new Engine.Controllers.AbstractControllers.BaseEngineException("پارامتر نال است");


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
    }
}