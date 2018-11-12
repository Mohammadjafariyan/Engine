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
    /// bookController
    /// bookController
    /// </summary>
    public class bookController :Controller
    {  private bookService _bookservice{get;set;} 

public bookController(bookService _bookservice){ 
this._bookservice=_bookservice; 
 }

 
[HttpGet]
public ActionResult getAll() {
try{
var res=_bookservice.getAll();
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }}}
} 
