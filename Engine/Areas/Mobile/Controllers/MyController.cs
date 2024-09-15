using System.Web.Http;

namespace Engine.Areas.Mobile.Controllers
{
    
    public class MyController :ApiController
    {
        
        [AllowAnonymous] // Requires authentication
        [HttpGet]
        [Route("api/userinfo")]
        public IHttpActionResult GetUserInfo()
        {
            var userId = User.Identity.Name; // Retrieve user information
            // Your logic to get user info based on userId
            return Ok($"User info for {userId}");
        }
    }
}