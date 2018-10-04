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

namespace WebAppIDEEngine.Areas.App.Controllers
{
    public abstract class AppController<T,Parameter> : BaseEngineController<T,Parameter> where Parameter : IActionParameter where T:IModel
    {
        // GET: App/Models
        protected async Task<ActionResult> GetDataTable(IDataTableParameter p)
        {
            return View(await _engineService.GetDataTableAsync(p));
        }

        // GET: App/Models/Details/5
        protected async Task<ActionResult> Details(long? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            var model = await _engineService.GetByIdAsync(id.Value);
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

        protected async Task<ActionResult> Save(IModelPostParameter<T> model)
        {
            if (ModelState.IsValid)
            {
                await _engineService.SaveAsync(model);
                return RedirectToAction("Index");
            }
            return View(model);
        }

        // GET: App/Models/Edit/5
        protected async Task<ActionResult> ForEdit(long? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var model = await _engineService.GetForEditAsync(id.Value);
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
        protected async Task<ActionResult> Delete(long id)
        {
            var model = await _engineService.DeleteAsync(id);
            return RedirectToAction("Index");
        }


        protected virtual async Task RenderFormAsync(IModel r)
        {
            if (r == null)
                throw new BaseEngineException("پارامتر نال است");

            Dictionary<string, DropDownAttribute> dropdowns = _engineService.GetModelDropdownAttributes<T>();
            Dictionary<string, DataTableAttribute> datatables = _engineService.GetModelTableAttributes<T>();
            Dictionary<string, TreeAttribute> trees = _engineService.GetModelTreeAttributes<T>();
            Dictionary<string, MultiSelectAttribute> multiselects = _engineService.GetModelMultiSelectAttributes<T>();

            Dictionary<string, List<IDropDownOption>> dropdownData = await _engineService.GetDropdownDataAsync(dropdowns);
            Dictionary<string, IQueryable<IDataTable>> dataTableData = await _engineService.GetDataTableDataAsync(datatables);
            Dictionary<string, ITreeNode> treeData = await _engineService.GetTreeDataAsync(trees);
            Dictionary<string, List<IDropDownOption>> multiSelectData = await _engineService.GetMultiSelectDataAsync(multiselects);

            _engineService.SetData<ViewDataDictionary>(dropdownData.Keys.ToArray(), datatables.Values.ToArray(), ViewData);
            _engineService.SetData<ViewDataDictionary>(dataTableData.Keys.ToArray(), datatables.Values.ToArray(), ViewData);
            _engineService.SetData<ViewDataDictionary>(treeData.Keys.ToArray(), datatables.Values.ToArray(), ViewData);
            _engineService.SetData<ViewDataDictionary>(multiSelectData.Keys.ToArray(), datatables.Values.ToArray(), ViewData);

        }
    }

}
