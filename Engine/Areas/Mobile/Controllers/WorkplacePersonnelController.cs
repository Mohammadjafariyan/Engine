using System.Threading.Tasks;
using System.Web.Mvc;
using Engine.Areas.Absence.Service;
using Engine.Areas.Absence.UiConstructs;
using Engine.Areas.JUiEngine.Controllers;
using Engine.Areas.Mobile.Models;
using Engine.Areas.Mobile.Service;
using Engine.Controllers.AbstractControllers.ObjectBased;
using ViewModel.Parameters;
using WebAppIDEEngine.Models;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Entities.Data;
using Engine.Service.AbstractControllers;
using Microsoft.AspNet.Identity;
using System;
using Engine.Entities.Data;

namespace Engine.Areas.Mobile.Controllers
{
    public class WorkplacePersonnelController : EBaseAppController<WorkplacePersonnel, CommonParameter>
    {
        public WorkplacePersonnelController()
        {
            _engineService = new WorkplacePersonnelService();
            TableConstructProvider = new WorkplacePersonnelConstructs();
            FormConstructProvider = new WorkplacePersonnelConstructs();
        }

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;


        public WorkplacePersonnelController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;

            _engineService = new WorkplacePersonnelService();
            TableConstructProvider = new WorkplacePersonnelConstructs();
            FormConstructProvider = new WorkplacePersonnelConstructs();
        }

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }


        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        private string lastpassword { get; set; }
        private bool forUpdate { get; set; }
        public string NormalPassword { get; private set; }

        protected override void beforeSave(WorkplacePersonnel model)
        {
            /// قبل از آپدیت چک می کند که حتما ویرایش باشد 
            if (model.Id != 0)
            {
                using (var db = new EngineContext())
                {
                   var wp=  db.WorkplacePersonnels.Find(model.Id);
                    if (wp == null)
                        throw new Exception("پرسنل یافت نشد");
                    lastpassword = SecurityUtility.DecodeAndDecrypt(wp.Password);
                    forUpdate = true;
                   
                }
            }
           
        }


        protected override async Task afterSave(WorkplacePersonnel model)
        {

            // اگر آپدیت نباشد برگرد
            if ( !model.IsAdmin )
            {
                // اگر قبلا موجود باشد
                var wasAdminbefore = UserManager.FindByName(model.Username);
                if (wasAdminbefore != null)
                {
                    UserManager.Delete(wasAdminbefore);
                }
                    return;
            }

            if (string.IsNullOrEmpty(model.Username))
                throw new Exception("نام کاربری خالی است");

            if (string.IsNullOrEmpty(model.Password))
                throw new Exception("رمز عبور خالی است");

           var email = model.PersonnelId + "@empty.com";

            var service = _engineService as WorkplacePersonnelService;
            NormalPassword = service.NormalPassword;

            if (string.IsNullOrEmpty(NormalPassword))
                throw new Exception(" رمز عبور نرمال خالی است");


            




            // اگر قبلا موجود باشد
            var exists = UserManager.FindByEmail(email);
            if (exists != null)
            {

                // نام کاربری و پسوورد را تغییر بده

                if (lastpassword == null)
                    throw new Exception("پسورد قبلی یافت نشده است");

                exists.UserName = model.Username;
                UserManager.Update(exists);
                UserManager.ChangePassword(exists.Id,lastpassword, NormalPassword);
            }
            else
            {
                // یک یوزر جدید برای نام کاربری موبیایلی ایجاد کن
                var user = new ApplicationUser
                {
                    UserName = model.Username
              ,
                    Email = email,
                    
                };


                var result = await UserManager.CreateAsync(user, NormalPassword);

                if (result.Succeeded)
                {
                    await UserManager.AddToRoleAsync(user.Id, GlobalNames.SystemAdmin);

                }
            }


        }
    }
}