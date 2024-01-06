using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Attributes;
using Engine.Entities.Models.ICore;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Service.AbstractControllers;
using Engine.ServiceLayer.Systems.Engine;
using Microsoft.AspNet.Identity.Owin;
using ViewModel.ActionTypes;
using WebGrease.Css.Extensions;

namespace Engine.Controllers.AbstractControllers.AttributeBased
{
    
    
    [Authorize(Roles = "SuperUser,SystemAdmin")]
    public abstract class AppController<T, Parameter> : BaseEngineController<T, Parameter>
        where Parameter : IActionParameter where T : IModel, new()
    {
        public RelationshipLinkService relationshipLinkService = new RelationshipLinkService();

        protected IUiEngineDataProvider _uiEngineDataProvider = new UiEngineDataProvider();
        protected IUiFormDataProvider _uiFormDataProvider = new UiFormDataProvider();
        private ApplicationUserManager _userManager;

        protected ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }


        public AppController()
        {
            _injector = new Engine.Utitliy.Injector();
        }

        protected virtual void SetDynamicTableViewData(string tableName,
            string SubSystemName, string ControllerName,
            string ControllerMethod, IDataTable table)
        {
            _uiEngineDataProvider.GetTable(tableName, ViewData, Request, SubSystemName,
                ControllerName, ControllerMethod, null, table);
        }

        protected virtual void SetDynamicFormViewData(string formName)
        {
            if (string.IsNullOrEmpty(formName))
            {
                throw new Exception("formName is null");
            }

            //از خود جدول فرم انتخاب کن نه از فرم های جداول
            _uiFormDataProvider.GetForm(formName, ViewData, isTableForm: false,
                postType: UiFormControllerMethodType.Save);
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


        public virtual void SetToolsbarLinks(IModel r)
        {
            var modelTypeName = r.GetType().Name;
            ViewData[GlobalNames.RelationshipLink] = relationshipLinkService.RelationshipLinks
                .Where(rel => rel.Form == modelTypeName).ToList();
        }

        // GET: App/Models
        public async Task<ActionResult> GetDataTable(T p)
        {
            var res = await _engineService.GetDataTableAsync(p);
            this.SetToolsbarLinks(new T());
            return View(res);
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
               _engineService.Save(model);

              //  await _engineService.EngineContext.SaveChangesAsync();
                return RedirectToAction("GetDataTable");
            }

            return View(model);
        }

        // GET: App/Models/Edit/5
        public async Task<ActionResult> ForEdit(long? id)
        {
            if (id == null)
            {
                var m = _injector.Inject<T>();
                await this.RenderFormAsync(m);
                return View(m);
            }

            var model = _engineService.GetForEdit(id.Value);
            await this.RenderFormAsync(model);
            if (model == null)
            {
                return HttpNotFound();
            }

            return View(model);
        }


        // GET: App/Models/Delete/5

        // POST: App/Models/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(long id)
        {
             _engineService.Delete(id);
           // await _engineService.EngineContext.SaveChangesAsync();
            return RedirectToAction("GetDataTable");
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
    }
}