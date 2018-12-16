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
using System.Web.Mvc;




namespace Engine.Areas.Library.Controllers
{
/// <summary>
    /// Rent
    /// Rent
    /// </summary>
    public class Rent :EBaseAppController<rent,CommonParameter>
    {  private RentService _rentservice{get;set;} 

public Rent(RentService _rentservice){ 

      DefaultSaveName = "RentSave";
            DefaultDataTableName = "RentDataTable";this._rentservice=_rentservice; 
 }

 
[HttpGet]
public ActionResult getAll() {
try{
var res=_rentservice.getAll();
            //res.RecordsList =  res.Records.ToList();

            string actionName = ControllerContext.RouteData.Values["action"].ToString();
            string controllerName = ControllerContext.RouteData.Values["controller"].ToString();
            string areaName = (string)HttpContext.Request.RequestContext.RouteData.DataTokens["area"];

            SetDynamicTableViewData(DefaultDataTableName, areaName, controllerName, actionName, res);
            return View(res);

        }
            catch (Exception e)
            {
                throw e;
        }}
} 
 } 
