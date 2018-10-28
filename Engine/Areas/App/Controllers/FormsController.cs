using ServiceLayer.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.App.Controllers
{
    public class FormsController : AppController<Form, FormParameter>
    {
        
        public FormsController()
        {
            this._engineService = new FormService();
        }
    
    }
}