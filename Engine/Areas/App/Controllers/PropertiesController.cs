﻿using ServiceLayer.Systems;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel.Parameters;
using WebAppIDEEngine.Areas.App.Controllers;
using WebAppIDEEngine.Models.Core;

namespace Engine.Areas.App.Controllers
{
    public class PropertiesController : AppController<Property, ActionParameter>
    {

        public PropertiesController()
        {
            this._engineService = new PropertyService();
        }

    }
}