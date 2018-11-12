using ServiceLayer.Library;


using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebAppIDEEngine.Models;
using System.Web.Mvc;




namespace Engine.Areas.Library.Controllers
{
/// <summary>
    /// RentController
    /// RentController
    /// </summary>
    public class RentController :Controller
    {  private RentService _rentservice{get;set;} 

public RentController(RentService _rentservice){ 
this._rentservice=_rentservice; 
 }

 
[HttpGet]
public ActionResult getAll() {
try{
var res=_rentservice.getAll();
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }}}
} 
