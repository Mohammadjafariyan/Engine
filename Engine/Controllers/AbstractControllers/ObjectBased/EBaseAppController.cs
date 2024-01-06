using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.ReportGenerator.Controllers;
using Engine.Attributes;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Data;
using Engine.Entities.Models;
using Engine.Entities.Models.ICore;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.Service.AbstractControllers;
using Engine.ServiceLayer.Engine;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using ServiceLayer.Absence;
using ViewModel.ActionTypes;
using WebAppIDEEngine.Models.UiGeneratorModels;
using BaseEngineException = Engine.Controllers.AbstractControllers.AttributeBased.BaseEngineException;

namespace Engine.Controllers.AbstractControllers.ObjectBased
{
    [System.Web.Http.Authorize(Roles = "SuperUser,SystemAdmin")]
    public abstract class EBaseAppController<T, Parameter> : BaseEngineController<T, Parameter>
        where Parameter : IActionParameter where T : BaseEntity, new()
    {
        protected IUiEngineDataProvider UiEngineDataProvider = new UiEngineDataProvider();
        protected IUiFormDataProvider UiFormDataProvider = new UiFormDataProvider();

        protected IFormConstructProvider FormConstructProvider;
        protected ITableConstructProvider TableConstructProvider;
        private ApplicationUserManager _userManager;


        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }


        protected OneToManyViewModel OneToManyModal<T, TMany>(long entityOneId,
            Func<EngineContext, long[]> selectedWhere)
            where T : BaseEntity where TMany : BaseEntity
        {
            using (var db = new EngineContext())
            {
                var oneQuery = db.QueryNoTrack<T>().Where(f => f.Id == entityOneId);
                var one = oneQuery.FirstOrDefault();
                if (one == null) throw new ArgumentNullException(nameof(one));
                long[] selected = selectedWhere(db);
                var many = db.QueryNoTrack<TMany>().ToList();

                ViewBag.one = one;
                ViewBag.selected = selected;
                ViewBag.many = many;

                ViewBag.oneItems = new SelectList(oneQuery.ToList(), nameof(one.Id), nameof(one.Name));

                var manyBoolList = many.OrderByDescending(o => o.Id)
                    .Select(manyItem => selected.Any(sel => sel == manyItem.Id))
                    .ToList();
                var longs = many.OrderByDescending(o => o.Id)
                    .Select(s => s.Id).ToList();
                return new OneToManyViewModel
                {
                    Many = longs,
                    OneId = one.Id,
                    ManyBool = manyBoolList
                };
            }
        }


        [System.Web.Http.HttpGet]
        public virtual ActionResult Get(PagingViewModel paging = null)
        {
            List<T> result;
            int count = 0;
            using (var db = new EngineContext())
            {
                var entities = db.QueryNoTrack<T>();

                if (paging != null)
                {
                    count = entities.Count();
                    entities = entities.OrderByDescending(o => o.Id);


                    if (paging.SelectedPage > 1)
                    {
                        entities = entities.Skip(paging.SelectedPage * paging.Take);
                    }

                    if (paging.Take <= 0)
                    {
                        paging.Take = 20;
                    }

                    entities = entities.Take(paging.Take);

                    entities = GetInclution(entities);

                    result = entities.ToList();
                    result = GetSelectList(result);
                }
                else
                {
                    entities = GetInclution(entities);
                    result = entities.ToList();
                    result = GetSelectList(result);
                }
            }

            var json = new JsonNetResult();
            var apiResult = new ApiResult<List<T>>();
            if (paging != null)
            {
                apiResult = new ApiResult<List<T>>
                {
                    result = result, Status = CustomResultType.success,
                    total = count,
                    totalPages = count / paging.Take
                };
            }
            else
            {
                apiResult.result = result;
                apiResult.Status = CustomResultType.success;
                apiResult.total = result.Count;
            }


            json.Data = apiResult;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            json.SerializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Formatting = Formatting.Indented
            };
            ;

            return json;
        }

        protected virtual List<T> GetSelectList(List<T> entities)
        {
            return entities;
        }

        protected virtual IQueryable<T> GetInclution(IQueryable<T> entities)
        {
            return entities;
        }


        public virtual Func<IQueryable<T>, IQueryable<T>> GetWhereExp()
        {
            return null;
        }

        public EBaseAppController()
        {
            _injector = new Engine.Utitliy.Injector();
        }

        protected void SaveOneToMany<TOne, TMany, TJoinTable>(OneToManyViewModel model, string collectionName,
            Func<EngineContext, EngineContext> func,
            Func<EngineContext, TOne, TMany, ApplicationUser, TJoinTable> funcNewItem)
            where TOne : BaseEntity where TMany : BaseEntity where TJoinTable : BaseEntity
        {
            using (var db = new EngineContext())
            {
                if (model.ManyBool == null)
                {
                    throw new Exception("model.ManyBool is null");
                }

                for (var i = 0; i < model.ManyBool.Count; i++)
                {
                    if (!model.ManyBool[i])
                    {
                        model.Many[i] = -1;
                    }
                }

                model.Many = model.Many.Where(m => m != -1).ToList();

                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var one = db.Query<TOne>().FirstOrDefault(f => f.Id == model.OneId);
                        if (one == null) throw new ArgumentNullException(nameof(one));

                        db.Entry(one).Collection<TJoinTable>(collectionName).Load();

                        // one.ClearListProperty(collectionName);
                        PropertyInfo listProperty = one.GetType().GetProperty(collectionName);

                        if (listProperty != null && listProperty.PropertyType.IsGenericType &&
                            listProperty.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
                        {
                            // Use reflection to get the list value
                            var listValue = (IEnumerable<TJoinTable>)listProperty.GetValue(one);

                            // Iterate through each item in the list
                            foreach (var item in listValue.ToList())
                            {
                                db.Set<TJoinTable>().Remove(item);
                            }
                        }

                        if (listProperty != null && listProperty.PropertyType.IsGenericType &&
                            listProperty.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>))
                        {
                            // Use reflection to get the list value
                            var listValue = (ICollection<TJoinTable>)listProperty.GetValue(one);

                            // Iterate through each item in the list
                            foreach (var item in listValue.ToList())
                            {
                                db.Set<TJoinTable>().Remove(item);
                            }
                        }

                        db.SaveChanges();

                        var selectedList = db.Query<TMany>()
                            .Where(record => model.Many.Any(selectedId => record.Id == selectedId))
                            .ToList();

                        var applicationUser = db.GetCurrentUser();


                        func(db);

                        foreach (var manyItem in selectedList)
                        {
                            var newItem = funcNewItem(db, one, manyItem, applicationUser);
                            /*one.AddItemToListProperty<TOne, TJoinTable>(newItem, collectionName);*/
                            db.Set<TJoinTable>().Add(newItem);
                        }

                        db.SaveChanges();
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        // An error occurred, rollback the transaction
                        transaction.Rollback();
                        throw; // You may choose to handle or log the exception as needed
                    }
                }
            }
        }


        protected virtual void SetDynamicTableViewData(string actionName,
            string subSystemName, string controllerName,
            string controllerMethod, IDataTable table, UiForm form)
        {
            EjTable ejtable = TableConstructProvider.GetDataTable(actionName);

            ejtable.UiTableForms.Add(new UiTableForm
                { EjTable = ejtable, UiForm = form });

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
            var res = await _engineService.GetDataTableAsync(p, GetWhereExp());

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
                    if (model != null)
                    {
                        var user = await UserManager.FindByNameAsync(User.Identity.Name);

                        if (User.Identity.IsAuthenticated == false)
                        {
                            return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
                        }

                        model.ApplicationUserId = user.Id;
                    }

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
                GenErrorMessage(ViewData, e.Message);
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
                areaName = (string)HttpContext.Request.RequestContext.RouteData.DataTokens["area"];
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

        [System.Web.Http.HttpPost]
        public virtual ActionResult Delete(long id)
        {
            // try
            // {
            _engineService.Delete(id);


            return Content(@"
<p class=""text-danger "">با موفقیت حذف شد</p>
");
            /*return Json(new CustomResult
            {
                Status = CustomResultType.success,
                Message = "با موفقیت حذف شد"
            }, JsonRequestBehavior.AllowGet);*/
            /*}
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
            }*/
        }
    }
}