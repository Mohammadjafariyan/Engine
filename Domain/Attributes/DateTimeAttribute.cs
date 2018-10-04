using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class DateTimeAttribute:BaseAttribute, IEngineAttribute
    {
        public DateTimeShowType ShowType { get; set; }
    }

    public enum DateTimeShowType
    {
        Date,Time,DateTime,ShamsiDate,ShamsiTime
    }
}