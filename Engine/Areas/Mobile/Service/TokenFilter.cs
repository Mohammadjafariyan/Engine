using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;
using Engine.Areas.Mobile.ViewModel;
using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.Mobile.Service
{
    public class TokenFilterAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            


            if (!actionContext.Request.Headers.Contains("token"))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                    new LoginViewModel
                    {
                        token = null,
                        message = "خارج شده اید ، لطفا برای انجام عملیات ابتدا وارد شوید",
                        success = false
                    });

                return;
            }
            var values = actionContext.Request.Headers.GetValues("token");

            string token = values.FirstOrDefault();

            bool isValid = SessionManagerSingeton.TokenManager.isTokenValid(token);
            if (!isValid)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                    new LoginViewModel
                    {
                        token = null,
                        message = "مجاز به عملیات نیستید و خارج شدید ",
                        success = false
                    });
            }

            SessionManagerSingeton.TokenManager.Token = token;
        }

        public override Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            return base.OnAuthorizationAsync(actionContext, cancellationToken);
        }

        public override bool AllowMultiple { get; }
    }
}