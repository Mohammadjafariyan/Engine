using System;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace Engine.Areas.Mobile.Models
{
    public class JsonNetResult : JsonResult
    {
        public JsonSerializerSettings SerializerSettings { get; set; }

        
        public JsonNetResult()
        {
            SerializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Formatting = Formatting.Indented
            };
        }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var response = context.HttpContext.Response;

            response.ContentType = !string.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }

            if (Data != null)
            {
                var jsonTextWriter = new JsonTextWriter(response.Output) { Formatting = SerializerSettings.Formatting };

                var jsonSerializer = JsonSerializer.Create(SerializerSettings);

                jsonSerializer.Serialize(jsonTextWriter, Data);

                jsonTextWriter.Flush();
            }
        }
    }
}