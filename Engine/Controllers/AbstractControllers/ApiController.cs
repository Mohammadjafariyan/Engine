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


       
        [HttpGet]
        public virtual List<IDropDownOption> GetDropDown(IDropDownParameter p)
        {
            return _engineService.GetDropDown(p);
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
        [HttpPost]
        public async Task<IDataTable> GetDataTable(IDataTableParameter p)
        {
            var res = await _engineService.GetDataTableAsync(p);
            res.RecordsList =  res.Records.ToList();
            return res;
        }

        // GET: App/Models/Details/5
        public  void Details(long? id)
        {
             throw new NotImplementedException();
        }


        // POST: App/Models/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        public  Task Save()
        {
            throw new NotImplementedException();
        }

        // GET: App/Models/Edit/5
        public  Task ForEdit(long? id)
        {
            throw new NotImplementedException();

        }



        // GET: App/Models/Delete/5

        // POST: App/Models/Delete/5
        [HttpPost, ActionName("Delete")]
        public  Task Delete(long id)
        {
            throw new NotImplementedException();

        }


       
    }
}
