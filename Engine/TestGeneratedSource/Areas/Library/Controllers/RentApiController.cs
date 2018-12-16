using ServiceLayer.Library;


using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
using Engine.Areas.JUiEngine.Controllers;
using Engine.Entities.Models.UiGeneratorModels;
using Engine.ServiceLayer.Systems.Engine;
using Engine.Service.AbstractControllers;
using WebGrease.Css.Extensions;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Areas.App.Controllers;
using System.Web.Http;




namespace Engine.Areas.Library.Controllers
{
/// <summary>
    /// RentApiController
    /// RentApiController
    /// </summary>
    public class RentApiController :BaseApiController<rent,CommonParameter>
    {  private RentService _rentservice{get;set;} 

public RentApiController(RentService _rentservice){ 
this._rentservice=_rentservice; 
 }

 
[HttpGet]
public IQueryable<dynamic> getAll() {
try{

var res=_rentservice.getAll();
      return res;
            }
            catch (Exception e)
            {
                throw e;
        }}}
} 
 } 
