using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Engine.Controllers.AbstractControllers;
using WebAppIDEEngine.Models;
using Engine.Utitliy;
using Entities;
using ServiceLayer.Systems.Library;
using ViewModel.ActionTypes;
using ViewModel.Parameters;


namespace Engine.Areas.Library.Controllers
{
    /// <summary>
    /// bookController
    /// bookController
    /// </summary>
    public class bookApiController : BaseApiController<Book,CommonParameter>
    {
        private Injector _injector = new Injector();
        private BookService _bookservice;

        public bookApiController()
        {
            this._bookservice = _injector.Inject<BookService>();
            this._engineService = _injector.Inject<BookService>();
        }

        [HttpGet]
        public IDataTable getAll(long id)
        {
            try
            {
                var res = _bookservice.GetAll(5);
                return res;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}