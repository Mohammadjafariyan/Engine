using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.SelfHost;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.SessionState;
using Engine.Areas.Mobile.Service;
using Engine.Areas.Mobile.ViewModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using HttpContext = Microsoft.AspNet.Http.HttpContext;
using HttpRequest = Microsoft.AspNet.Http.HttpRequest;
using HttpResponse = Microsoft.AspNet.Http.HttpResponse;
using LoginViewModel = Engine.Models.LoginViewModel;

namespace Engine.Areas.Mobile.ControllerTests
{
    public class ApiAaHelper
    {
        private static string Token;

        public static string GetToken()
        {
            return string.IsNullOrEmpty(Token) ? SignIn().Result : Token;
        }

        public static async Task<string> SignIn()
        {
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            httpClientHandler.CookieContainer = new CookieContainer();
            httpClientHandler.CookieContainer.Add(new Cookie("name", "value", "/", "google.de"));

            var client = new HttpClient(httpClientHandler)
                { BaseAddress = new Uri(MyTestServer.baseAddress) };
            var request = new HttpRequestMessage(HttpMethod.Post, "api/login/login");

            var serializeObject = JsonConvert.SerializeObject(new LoginViewModel
            {
                UserName = "mohammad.jafariyan7@gmail.com",
                Password = "mohammad.jafariyan7@gmail.com",
                RememberMe = false
            });
            var encode = SecurityUtility.EncryptAndEncode(serializeObject);
            var username = "mohammad.jafariyan7@gmail.com";
            var password = "mohammad.jafariyan7@gmail.com";

            request.Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("encoded", encode),
                new KeyValuePair<string, string>("username", username),
                new KeyValuePair<string, string>("password", password),
            });
            var result = await client.SendAsync(request).Result.Content.ReadAsStringAsync();
            Console.WriteLine("Client received: {0}",
                result);

            var loginViewModelResult = JsonConvert.DeserializeObject<LoginViewModelResult>(result);

            Assert.IsNotNull(loginViewModelResult);
            Assert.IsNotNull(loginViewModelResult.token);


            Token = loginViewModelResult.token;
            return loginViewModelResult.token;
        }
    }


    public class MyTestServer
    {
        public static string baseAddress = "http://localhost/";

        public static HttpSelfHostServer Setup()
        {
            var config = new HttpSelfHostConfiguration(baseAddress);

            WebApiConfig.Register(config);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var server = new HttpSelfHostServer(config);
            server.OpenAsync().Wait();


            return server;
        }

        public static HttpClient GetClient()
        {
            HttpClientHandler httpClientHandler = new HttpClientHandler();
            httpClientHandler.CookieContainer = new CookieContainer();
            httpClientHandler.CookieContainer.Add(new Cookie("name", "value", "/", "google.de"));


            var client = new HttpClient(httpClientHandler)
                { BaseAddress = new Uri(MyTestServer.baseAddress) };

            string token = ApiAaHelper.GetToken();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            return client;
        }
        
      
    }
}