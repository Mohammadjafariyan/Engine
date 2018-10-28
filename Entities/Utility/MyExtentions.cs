using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Engine.Utility
{
    public static class MyExtensions
    {
        //public static SelectList ToSelectList<TEnum>(this TEnum enumObj)
        //    where TEnum : struct, IComparable, IFormattable, IConvertible
        //{
        //    var values = from TEnum e in Enum.GetValues(typeof(TEnum))
        //                 select new { Id = e, Name = typeof(TEnum).GetProperties()
        //                .SelectMany(property => property.GetCustomAttributes(typeof(DescriptionAttribute),true))
        //                .Select(c => c as DescriptionAttribute).Select(c=>c.Description).FirstOrDefault() ??  e.ToString() };
        //    return new SelectList(values, "Id", "Name", enumObj);
        //}
    }
}