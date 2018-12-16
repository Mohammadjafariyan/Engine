﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Engine.Controllers.AbstractControllers.AttributeBased;
using Engine.Entities.Models.UiGeneratorModels;
using ServiceLayer.Systems;
using ViewModel.Parameters;

namespace Engine.Areas.AppGeneration.Controllers
{
    public class UiTableItemsController : AppController<UiTableItem,
        CommonParameter>
    {
        public UiTableItemsController()
        {
            this._engineService = new UiTableItemService();
        }
    }
    


}