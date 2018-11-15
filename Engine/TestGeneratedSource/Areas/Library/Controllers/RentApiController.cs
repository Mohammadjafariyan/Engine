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
    /// RentApiController
    /// RentApiController
    /// </summary>
    public class RentApiController :ApiController
    {  private RentService _rentservice{get;set;} 

public RentApiController(RentService _rentservice){ 
this._rentservice=_rentservice; 
 }

 
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
