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
    /// BookControllerController
    /// BookControllerController
    /// </summary>
    public class BookControllerController :Controller
    {  private BookService _bookservice{get;set;} 
 private RentService _rentservice{get;set;} 

public BookControllerController(BookService _bookservice,RentService _rentservice){ 
this._bookservice=_bookservice; 
 ,this._rentservice=_rentservice; 
 }

 
[HttpGet]
public ActionResult GetAll(long @Id) {
try{
var res=_bookservice.GetAll();
          return Json(res,JsonRequestBehavior.AllowGet);

}
            catch (Exception e)
            {
                throw e;
        }}} 
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
