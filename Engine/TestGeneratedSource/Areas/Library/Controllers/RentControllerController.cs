using ServiceLayer.library;


using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebAppIDEEngine.Models;
using System.Web.Mvc;




namespace Engine.Areas.library.Controllers
{
/// <summary>
    /// RentControllerController
    /// RentControllerController
    /// </summary>
    public class RentControllerController :Controller
    {  private RentService _rentservice{get;set;} 

public RentControllerController(RentService _rentservice){ 
this._rentservice=_rentservice; 
 }

 
[HttpGet]
public ActionResult GetAll(long @Id) {
try{
var res=_rentservice.GetAll();
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }}}
} 
