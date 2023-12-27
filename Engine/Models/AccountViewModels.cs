using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Engine.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "نام کاربری یا ایمیل")]
        [DataType(DataType.Text)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور")]
        public string Password { get; set; }

        [Display(Name = "مرا به یاد داشته باش ؟")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        /*[Required(ErrorMessage = "نام کاربری ضروری است")]
        [Display(Name = "نام کاربری")]
        public string UserName { get; set; }*/

        [Required(ErrorMessage = "رمز عبور ضروری است")]
        [StringLength(100, ErrorMessage = " {0} حداقل باید  {2} طول داشته باشند.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        [Display(Name = "رمز عبور")]
        public string Password { get; set; }

        [Required(ErrorMessage = "نام ضروری است")]
        [StringLength(100, ErrorMessage = " {0} حداقل باید  {2} طول داشته باشند.", MinimumLength = 2)]
        //[DataType(DataType.Password)]
        [Display(Name = "نام")]
        public string FirstName { get; set; }

        
        [Required(ErrorMessage = "نام خانوادگی ضروری است")]
        [StringLength(100, ErrorMessage = " {0} حداقل باید  {2} طول داشته باشند.", MinimumLength = 2)]
        //[DataType(DataType.Password)]
        [Display(Name = "نام خانوادگی")]
        public string LastName { get; set; }

               [DataType(DataType.Password)]
        [Display(Name = "تاکید رمز عبور")]
        [Compare("Password", ErrorMessage = "رمز با تاکید آن یکسان نیست ")]
        public string ConfirmPassword { get; set; }
        
        
        [Required]
        [EmailAddress(ErrorMessage = "ایمیل صحیح نیست لطفا یک ایمیل درست وارد نمایید")]
        //[DataType(DataType.Password)]
        [Display(Name = "ایمیل")]
        public string Email { get; set; }
        
        
        
        //[Phone]
        //[DataType(DataType.Password)]
        [Display(Name = "موبایل")]
        //[Required(ErrorMessage = "شماره موبایل ضروری است ")]
        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10,15}$", ErrorMessage = "لطفا شماره موبایل صحیح وارد کنید")]
        public string Mobile { get; set; }
        
        //[DataType(DataType.Password)]
        [Display(Name = "جنسیت")]
        public string Gender { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
