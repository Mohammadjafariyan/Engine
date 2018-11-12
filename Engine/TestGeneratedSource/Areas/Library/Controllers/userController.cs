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
    /// userController
    /// userController
    /// </summary>
    public class userController :Controller
    {  private userService _userservice{get;set;} 

public userController(userService _userservice){ 
this._userservice=_userservice; 
 }

 
[HttpGet]
public ActionResult getAll() {
try{
var res=_userservice.getAll();
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }}}
} 
