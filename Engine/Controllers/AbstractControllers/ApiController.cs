using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ViewModel.ActionTypes;
using ViewModel.Parameters;
using WebAppIDEEngine.Models.ICore;

namespace Engine.Controllers.AbstractControllers
{
    public abstract class BaseApiController<T,Parameter> : ApiController where Parameter:IActionParameter where T:IModel
    {
        protected Service.AbstractControllers.IEngineService<T> _engineService;


        protected virtual Task<IDropDownOption> GetDropDown(Parameter p)
        {
            throw new NotImplementedException();
        }

        protected virtual Task<IDataTable> GetDataTableDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }

        protected virtual Task<ITreeNode> GetTreeDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }

        protected virtual Task<IDropDownOption> GetMultiSelectDataAsync(Parameter p)
        {
            throw new NotImplementedException();
        }


        // GET: App/Models
        protected async Task<IDataTable> GetDataTable(IDataTableParameter p)
        {
            return await _engineService.GetDataTableAsync(p);
        }

        // GET: App/Models/Details/5
        protected  void Details(long? id)
        {
             throw new NotImplementedException();
        }


        // POST: App/Models/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        protected  Task Save()
        {
            throw new NotImplementedException();
        }

        // GET: App/Models/Edit/5
        protected  Task ForEdit(long? id)
        {
            throw new NotImplementedException();

        }



        // GET: App/Models/Delete/5

        // POST: App/Models/Delete/5
        [HttpPost, ActionName("Delete")]
        protected  Task Delete(long id)
        {
            throw new NotImplementedException();

        }


       
    }
}
