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
    /// userApiController
    /// userApiController
    /// </summary>
    public class userApiController :BaseApiController<user,CommonParameter>
    {  private userService _userservice{get;set;} 

public userApiController(userService _userservice){ 
this._userservice=_userservice; 
 }

 
[HttpGet]
public IQueryable<dynamic> getAll() {
try{

var res=_userservice.getAll();
      return res;
            }
            catch (Exception e)
            {
                throw e;
        }}}
} 
 } 
