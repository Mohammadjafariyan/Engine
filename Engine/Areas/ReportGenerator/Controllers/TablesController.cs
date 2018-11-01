using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAppIDEEngine.Models;

namespace Engine.Areas.ReportGenerator.Controllers
{
    public class TablesController : ApiController
    {
        public EngineContext _context = new EngineContext();
        [HttpGet]
        public CustomResult GetAllNames(string searchTerm, int? lastIndex, int? count)
        {
            // خخالی بود تمامی را برگردان
            if (lastIndex == null || count == null)
                return new CustomResult { result = _context.Models.ToList(), Status = CustomResultType.success };

            // مواظب خطا ها باش
            count = count == 0 ? 10 : count;

            var dt = _context.Models.Select(m => new { Id = m.Id, Name = m.Name, TableName = m.TableName, ModelType = m.ModelType });

            if (!string.IsNullOrEmpty(searchTerm))
            {
                dt = dt.Where(m => m.Name.Contains(searchTerm) || m.TableName.Contains(searchTerm));
            }

            if (lastIndex == 0)
            {
                dt = dt.Take(count.Value);
            }
            else
            {
                dt = dt.Skip(lastIndex.Value).Take(count.Value);
            }

            // با paging برگردان
            return new CustomResult { result = dt, Status = CustomResultType.success };

        }

        [HttpGet]
        public CustomResult GetWithProperties(long id)
        {

            var model = _context.Models.Find(id);
            if (model == null)
            {
                return new CustomResult { Message = "یافت نشد  ", Status = CustomResultType.fail };
            }

            // با paging برگردان
            return new CustomResult { result = model.Properties.ToList(), Status = CustomResultType.success };

        }

    }
}
