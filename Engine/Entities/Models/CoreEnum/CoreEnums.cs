using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppIDEEngine.Models.CoreEnum
{

    /// <summary>
    /// نوع پروپرتی مدل های سیستم در جداول دیتابیس
    /// </summary>
    public enum PropertyInDatabaseType
    {
        bigint, binary, bit, Char, date, Decimal, Float, image,Int,Money,
        nchar, ntext, numeric, nvarchar, real, smallint, text, time, varbinary,xml, varchar
    }
    /// <summary>
    /// نوع پروپرتی مدل های سیستم
    /// </summary>
    public enum PropertyType
    {
        Int64, ByteArray, Boolean, String, DateTime, Double, Byte, Int32,Single, Int16,
        TimeSpan,Xml,Long,Int,Char,Decimal
    }
    /// <summary>
    /// Where 
    /// </summary>
    public enum WhereValueType
    {
        Value,Select
    }
    /// <summary>
    /// Where 
    /// </summary>
    public enum WhereType
    {
        EqualTo,NotEqualTo,Contains,StartWith,EndWith,NotStartWith,NotContain,IsNull,IsNotNull
    }
    /// <summary>
    /// QuerySort 
    /// </summary>
    public enum QuerySortType
    {
        Asc,Desc
    }

    /// <summary>
    /// SqlFunction 
    /// </summary>
    public enum SqlFunctionType
    {
        Value,Count,Avg,Max,Min,Sum
    }
    /// <summary>
    /// پارامتر های متد اکشن ها
    /// </summary>
    public enum MethodParameterType
    {
        Int, Long, String, List, ByteArray, Model
    }
    /// <summary>
    /// نوع رابطه ها
    /// </summary>
    public enum NavigationPropertyType
    {
        One, Many
    }
    /// <summary>
    /// نوع مدل ها
    /// </summary>
    public enum ModelType
    {
        Table, ViewModel
    }
    /// <summary>
    /// نوع پنل ها
    /// </summary>
    public enum PanelType
    {
        Search, Save, Table, Label
    }

    /// <summary>
    /// نوع کوئری ها
    /// </summary>
    public enum QueryType
    {
        Join, LinQ, LinQJoin, StoredProcedure
    }



    /// <summary>
    /// نوع فیلد ها
    /// </summary>
    public enum FieldType
    {
        Text, TextArea, MultiSelect, Tree, DropDown, Magic, Table, Date, Time
    }

    /// <summary>
    /// نوع اینپوت ها
    /// </summary>
    public enum InputType
    {
        Text, Money, Number, FromDate, ToDate, FromTime, ToTime
    }

    /// <summary>
    /// نحوه ی نمایش 
    /// </summary>
    public enum InputShowType
    {
        Show, OnCreate, OnEdit
    }


    /// <summary>
    /// نحوه ی دیزیبل اینپوت ها در صفحات
    /// </summary>
    public enum InputDisableType
    {
        Show, OnCreate, OnEdit
    }
    /// <summary>
    /// نوع عملیات متد های کنترولر ها
    /// </summary>

    public enum ActionMethodType
    {
        [Description]
        Post
            , Get, Put, Delete
    }

    /// <summary>
    /// نوع عملیات کنترولر ها
    /// </summary>
    public enum ActionType
    {
        Dropdown, Table, GetById, Delete, Save, ForEdit
    }

    /// <summary>
    /// نحوه ی محاسبه کوئری در نمایش جدول 
    /// </summary>
    public enum PanelQueryType
    {
        SQL, LinqJoin, Linq, StoredProcedure
    }


    public enum JoinTableType
    {
        InnerJoin,
        LeftJoin,
        Rightjoin,
        Join,
        OuterInnerJoin,
        OuterLeftJoin,
        OuterRightjoin,
        OuterJoin,
    }
}
