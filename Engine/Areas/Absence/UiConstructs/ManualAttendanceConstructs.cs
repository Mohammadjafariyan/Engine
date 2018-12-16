using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.Mvc;
using Engine.Absence.Models;
using Engine.Controllers.AbstractControllers;
using Engine.Controllers.AbstractControllers.ObjectBased;
using Engine.Entities.Models.Core.AppGeneration;
using Engine.Entities.Models.UiGeneratorModels;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.CoreEnum;
using WebAppIDEEngine.Models.UiGeneratorModels;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Absence.UiConstructs
{
    public class ManualAttendanceConstructs : BaseConstructProvider, IFormConstructProvider,
        ITableConstructProvider
    {
        public override UiForm GetSaveForm()
        {
            return GetForm();
        }

        private UiForm GetForm()
        {
            var uiform = new UiForm();
            uiform.Name = "SaveManualAttendance";
            uiform.Translate = "ثبت فراموشی کارت";

            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Time", Translate = "زمان", FieldType = FieldType.Time}});

            uiform.UiFormInputs.Add(new UiFormInput
                {UiInput = new UiInput {Name = "Date", Translate = "تاریخ", FieldType = FieldType.Date}});

       

            using (var db = new EngineContext())
            {
                var l = db.PersonnelMachines.Select(p=>p.Personnel).Select(p => new SelectListItem
                    {Text = p.Name + " " + p.LastName, Value = p.Id.ToString()}).ToList();
                var selectList = new SelectList(l);
                UiFormInput UserId = GetDropDownInput("UserId", "کاربر", FieldType.DropDown,
                    selectList);

                uiform.UiFormInputs.Add(UserId);
            }

            UiFormInput Type = GetDropDownInput("Type", "نوع", FieldType.DropDown,
                GetEnumSelectList<BiometricDataType>());


            uiform.UiFormInputs.Add(Type);


            return uiform;
        }


       

        public override UiForm GetDataTableSearchForm()
        {
            return null;
        }
    }
}