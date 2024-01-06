using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Antlr.Runtime.Misc;

namespace Engine.HtmlExtentions
{
    public static class HtmlExtetionsModal
    {
        public static MvcHtmlString DatePicker<TModel,TResult>(this HtmlHelper<TModel> html, Expression<Func<TModel,TResult>> expression)
        
        {
            MemberExpression memberExpression = (MemberExpression) expression.Body;
            var propName = memberExpression.Member.Name;
            
            StringBuilder sb = new StringBuilder();
            sb.Append(html.Action("DatePicker", "Utils", new { name = propName , area="" }).ToHtmlString());
            return MvcHtmlString.Create(sb.ToString());
            
        }
        public static MvcHtmlString Modal<TModel>(this HtmlHelper<TModel> html,string body,string id , string title)
        {
            StringBuilder sb = new StringBuilder();
                
            sb.Append($@"
<!-- Button trigger modal -->
<button style=""display:none"" id=""{id}"" type=""button"" class=""btn btn-primary"" data-bs-toggle=""modal"" data-bs-target=""#{id}_panel"">
  Launch demo modal
</button>

<!-- Modal -->
<div class=""modal fade"" id=""{id}_panel"" tabindex=""-1"" aria-labelledby=""{id}Label"" aria-hidden=""true"">
  <div class=""modal-dialog  modal-dialog-centered modal-lg"">
    <div class=""modal-content"">
      <div class=""modal-header"">
        <h5 class=""modal-title"" id=""{id}Label""> {title}</h5>
        <button type=""button"" class=""btn-close"" data-bs-dismiss=""modal"" aria-label=""Close""></button>
      </div>

{body}
      
    </div>
  </div>
</div>

");
                       
            return MvcHtmlString.Create(sb.ToString());

        }
    }
}

/*
 * public static MvcHtmlString LabelledTextBoxFor<TModel, TResult>(this HtmlHelper<TModel> html, Expression<Func<TModel, TResult>> expression)
{
    ExpressionType type = expression.Body.NodeType;
    if (type == ExpressionType.MemberAccess)
    {
       MemberExpression memberExpression = (MemberExpression) expression.Body;
       var propName = memberExpression.Member.Name;

       var member = memberExpression.Member as PropertyInfo;

       var attributes = member.GetCustomAttributes();

       StringBuilder sb = new StringBuilder();
       foreach (var attribute in attributes)
       {
           if (attribute is DisplayAttribute)
           {
               DisplayAttribute d = attribute as DisplayAttribute;
               var displayName = d.Name;
               sb.Append("<div class=\"form-group\">");
               sb.AppendFormat("<label for=\"{0}\">{1}</label>", propName, displayName);
               sb.AppendFormat(
                        "<input type=\"email\" class=\"form-control\" id=\"{0}\" placeholder=\"Enter email\">",
                        propName);
               sb.Append("</div>");
               return MvcHtmlString.Create(sb.ToString());
             }
         }

     }
       return MvcHtmlString.Create("");
 }
 */