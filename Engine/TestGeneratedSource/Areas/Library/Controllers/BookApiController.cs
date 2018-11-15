using ServiceLayer.library;


using Engine.Areas.ReportGenerator.Controllers;
using System.Linq;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebAppIDEEngine.Models;
using System.Web.Http;




namespace Engine.Areas.library.Controllers
{
/// <summary>
    /// BookApiController
    /// BookApiController
    /// </summary>
    public class BookApiController :ApiController
    {  private BookService _bookservice{get;set;} 
 private RentService _rentservice{get;set;} 

public BookApiController(BookService _bookservice,RentService _rentservice){ 
this._bookservice=_bookservice; 
 ,this._rentservice=_rentservice; 
 }

 
[HttpGet]
public IQueryable<> GetAll() {
try{

var res=_bookservice.GetAll();
      return res;
            }
            catch (Exception e)
            {
                throw e;
        }}} 
[HttpGet]
public IQueryable<> GetAll() {
try{

var res=_rentservice.GetAll();
      return res;
            }
            catch (Exception e)
            {
                throw e;
        }}}
} 
