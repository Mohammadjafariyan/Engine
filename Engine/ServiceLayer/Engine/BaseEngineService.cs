using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using ServiceLayer.Base;
using System.Threading.Tasks;
using System.Collections.Specialized;
using Engine.Utitliy;
using System.Reflection;
using System.Web.Mvc;
using System.ComponentModel;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Text.RegularExpressions;
using WebAppIDEEngine.Models.ICore;
using Engine.Attributes;
using ViewModel.ActionTypes;
using Domain.Attributes;
using WebAppIDEEngine.Models;

namespace Engine.Service.AbstractControllers
{
    public abstract class BaseEngineService<T> : IEngineService<T> where T : class, IModel
    {
        // protected Injector _injector;
      /*  public IDataTable Search<T1>(NameValueCollection nameValues) where T1 : class, IModel
        {
            var entities = EngineContext.Set<T1>();

            var tableName=Extentions.GetTableName<T1>(EngineContext);

            entities.toL

            var sql = $@"select * from {tableName} where ";
            foreach (string name in nameValues)
            {
                sql+= name + " " +nameValues[name];
            }

        }*/


        public WebAppIDEEngine.Models.EngineContext EngineContext { get; set; }
        protected System.Data.Entity.DbSet<T> _entities;
        public virtual Injector Injector { get; set; }

        public BaseEngineService()
        {
            EngineContext = new WebAppIDEEngine.Models.EngineContext();
            this._entities = EngineContext.Set<T>();
            this.Injector = new Injector();
        }

        /// <summary>
        /// اتریبیوت های مربوط به درخت را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual Dictionary<string, TreeAttribute> GetModelTreeAttributes<B>()
        {
            return GetAttribute<B, TreeAttribute>();
        }

        /// <summary>
        /// اتریبیوت های مربوط به MultiSelect را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual Dictionary<string, MultiSelectAttribute> GetModelMultiSelectAttributes<B>()
        {
            return GetAttribute<B, MultiSelectAttribute>();
        }

        /// <summary>
        /// اتریبیوت های مربوط به Table را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual Dictionary<string, DataTableAttribute> GetModelTableAttributes<B>()
        {
            return GetAttribute<B, DataTableAttribute>();
        }

        /// <summary>
        /// اتریبیوت های مربوط به Dropdown را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual Dictionary<string, DropDownAttribute> GetModelDropdownAttributes<B>()
        {
            return GetAttribute<B, DropDownAttribute>();
        }


        public virtual Dictionary<string, Result> GetAttribute<B, Result>() where Result : BaseAttribute
        {
            var names = typeof(B).GetProperties()
                .SelectMany(property => property.GetCustomAttributes(true)
                    .Where(c => c is Result)
                    .Select(c => new {attr = c as Result, Name = property.Name}))
                .ToList().ToDictionary(o => o.Name, o => o.attr);

            return names;
        }


        private IEngineAttribute IsTypeOfMyCustomAttrbutes(object attribute)
        {
            if (attribute is DropDownAttribute)
                return attribute as DropDownAttribute;
            else if (attribute is MultiSelectAttribute)
                return attribute as MultiSelectAttribute;
            else if (attribute is DataTableAttribute)
                return attribute as DataTableAttribute;
            else if (attribute is TreeAttribute)
                return attribute as TreeAttribute;
            else if (attribute is DateTimeAttribute)
                return attribute as DateTimeAttribute;
            return null;
        }

        public virtual void SetData(string[] v, dynamic[] dataTableAttribute, ViewDataDictionary viewdata)
        {
            if (v == null || dataTableAttribute == null || viewdata == null)
                throw new EngineServiceException(GlobalMessages.SetDataParametersNull);
            if (v.Length < dataTableAttribute.Length)
                throw new EngineServiceException(GlobalMessages.LengthsNotEqual);

            for (int i = 0; i < v.Length; i++)
            {
                object obj = null;
                // مقادیر با نام ها ست می شود|
                if (i > dataTableAttribute.Length - 1)
                {
                    obj = null;
                }
                else
                    obj = dataTableAttribute[i];

                viewdata[v[i]] = obj;
            }
        }

        /// <summary>
        /// دیتای های مربوط به MultiSelectData را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual async Task<Dictionary<string, List<IDropDownOption>>> GetMultiSelectDataAsync
            (Dictionary<string, MultiSelectAttribute> multiselect, IMultiSelectParameter @params)
        {
            return await GetDataAsync<List<IDropDownOption>, MultiSelectAttribute>(multiselect, @params);
        }


        /// <summary>
        /// دیتای های مربوط به Tree را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual async Task<Dictionary<string, ITreeNode>> GetTreeDataAsync
            (Dictionary<string, TreeAttribute> trees, ITreeParameter @params)
        {
            return await GetDataAsync<ITreeNode, TreeAttribute>(trees, @params);
        }


        /// <summary>
        /// دیتای های مربوط به DataTable را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual async Task<Dictionary<string, IQueryable<IDataTable>>> GetDataTableDataAsync
            (Dictionary<string, DataTableAttribute> datatables, IDataTableParameter @params)
        {
            return await GetDataAsync<IQueryable<IDataTable>, DataTableAttribute>(datatables, @params);
        }


        /// <summary>
        /// فراخووانی سرویس گنریک شده است
        /// </summary>
        /// <typeparam name="M">نوع خروجی متد مورد فراخانی</typeparam>
        /// <typeparam name="Attr">از چه نوعی است اتریبویت ان</typeparam>
        /// <param name="dropdowns">لیست پروپرتی های دارای اتریبوت خاص</param>
        /// <param name="params">پارامتر هایی که از سمت یو آی می آید</param>
        /// <returns></returns>
        public virtual async Task<Dictionary<string, M>> GetDataAsync<M, Attr>(Dictionary<string, Attr> dropdowns
            , params object[] @params) where Attr : IEngineAttribute
        {
            Dictionary<string, M> dic = new Dictionary<string, M>();

            foreach (var dd in dropdowns)
            {
                if (dd.Value == null)
                    throw new EngineServiceException(GlobalMessages.DropDownIsNull);

                var service = Injector.Inject<IBaseEngineService>(dd.Value.Service);

                if (service == null)
                    throw new EngineServiceException(GlobalMessages.InjectedServiceIsNull);

                if (dd.Value.MethodName == null)
                    throw new EngineServiceException(GlobalMessages.MethodNameIsNull);

                Task<dynamic> result = InovokeAsync(service, dd.Value.MethodName, @params);
                dic.Add(dd.Key, await result);
            }

            return dic;
        }


        /// <summary>
        /// دیتای های مربوط به Dropdown را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual async Task<Dictionary<string, List<IDropDownOption>>> GetDropdownDataAsync(
            Dictionary<string, DropDownAttribute> dropdowns, IDropDownParameter @params)
        {
            return await GetDataAsync<List<IDropDownOption>, DropDownAttribute>(dropdowns, @params);
        }

        public virtual dynamic Inovoke(dynamic obj, string methodName, params object[] @params)
        {
            Type thisType = obj.GetType();
            MethodInfo theMethod = thisType.GetMethod(methodName);

            if (theMethod == null)
                throw new EngineServiceException(GlobalMessages.MethodNameInReflectionIsNull);


            return theMethod.Invoke(obj, @params);
        }


        /// <summary>
        /// متد اتریبویت را فراخانی میکند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual async Task<dynamic> InovokeAsync(dynamic obj, string methodName, params object[] @params)
        {
            Type thisType = obj.GetType();
            MethodInfo theMethod = thisType.GetMethod(methodName);

            if (theMethod == null)
                throw new EngineServiceException(GlobalMessages.MethodNameInReflectionIsNull);

            return await Task.FromResult<dynamic>(await theMethod.Invoke(obj, @params));
        }


        public static Dictionary<string, string> GetPropertyNames<M>()
        {
            var names = typeof(M).GetProperties()
                .ToDictionary(key => key.Name, property =>
                    property.GetCustomAttributes().Where(c => c is IEngineAttribute && !(c is HiddenColumnAttribute))
                        .Select(c => c as IEngineAttribute)
                        .Select(c => c.Name).FirstOrDefault() ?? property.Name);

            return names;
        }


        /// <summary>
        /// دیتای جدول مدل را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual IDataTable GetDataTable(IDataTableParameter p)
        {
            IDataTable dataTable = new ObjectDataTable<T>
            {
                Records = _entities.AsNoTracking(),
                Headers = GetPropertyNames<T>()
            };
            return dataTable;
        }

        public virtual ITreeNode GetTree(ITreeParameter p)
        {
            return null;
        }

        public virtual List<IDropDownOption> GetDropDown(IDropDownParameter p)
        {
            return null;
        }

        public virtual List<IDropDownOption> GetMultiSelect(IDropDownParameter p)
        {
            return this.GetDropDown(p);
        }

        public virtual async Task<ObjectDataTable<T>> GetDataTableAsync(IDataTableParameter p)
        {
            ObjectDataTable<T> dataTable = new ObjectDataTable<T>
            {
                Records = _entities.AsNoTracking(),
                Headers = GetPropertyNames<T>()
            };

            return await Task.FromResult(dataTable);
        }

        public virtual async Task<ITreeNode> GetTreeAsync(ITreeParameter p)
        {
            return await Task.FromResult<ITreeNode>(null);
        }

        public virtual async Task<List<IDropDownOption>> GetDropDownAsync(IDropDownParameter p)
        {
            return await Task.FromResult<List<IDropDownOption>>(new List<IDropDownOption>());
        }

        public virtual async Task<List<IDropDownOption>> GetMultiSelectAsync(IMultiSelectParameter p)
        {
            return await Task.FromResult<List<IDropDownOption>>(null);
        }

        public virtual void Insert(T p)
        {
            _entities.Add(p);
        }

        public virtual void Update(T p)
        {
            EngineContext.Entry(p).State = System.Data.Entity.EntityState.Modified;
        }


        public virtual T Delete(long id)
        {
            var entity = _entities.Find(id);
            if (entity == null)
            {
                throw new BaseEngineException("رکورد یافت نشد");
            }

            EngineContext.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            return entity;
        }

        public virtual T GetForEdit(long id)
        {
            return _entities.Find(id);
        }

        public virtual T GetById(long id)
        {
            return _entities.Find(id);
        }


        public virtual Dictionary<string, SelectList> GetEnumsAttributesDep<TEnum>(object model)
        {
            Dictionary<string, SelectList> dic = new Dictionary<string, SelectList>();
            var enumAttributes = GetAttribute<TEnum, EnumAttribute>();
            foreach (var enm in enumAttributes)
            {
                dic.Add(enm.Key, enm.Value.Value as SelectList);
            }

            return dic;
        }

        public virtual Dictionary<string, List<SelectListItem>> GetEnumsAttributes<TEnum>(object model)
        {
            Dictionary<string, List<SelectListItem>> dic = new Dictionary<string, List<SelectListItem>>();
            var enums = typeof(TEnum).GetProperties().Where(property => property.PropertyType.IsEnum)
                .ToList();
            foreach (var enm in enums)
            {
                var values = (Enum.GetValues(enm.PropertyType) as Array)?.OfType<object>().ToArray();
                var Names = (Enum.GetNames(enm.PropertyType) as Array).OfType<object>().ToArray();
                var prop = enm
                               .GetCustomAttributes(typeof(DescriptionAttribute), true)
                               .Select(c => c as DescriptionAttribute)
                               .Select(c => c.Description).FirstOrDefault() ?? enm.Name;
                var prevalue = model != null ? enm.GetValue(model) : null;
                //var everyEnumWithValuesAndPreValue = enm.PropertyType.GetType().GetProperties()
                //            .Select(property => 
                //            new
                //            {
                //                prop = property
                //            .GetCustomAttributes(typeof(DescriptionAttribute), true)
                //            .Select(c => c as DescriptionAttribute)
                //            .Select(c => c.Description).FirstOrDefault() ?? enm.Name,

                //            values= (Enum.GetValues(property.PropertyType) as Array).OfType<object>().ToArray(),
                //            Names= (Enum.GetNames(property.PropertyType) as Array).OfType<object>().ToArray()
                //            });


                List<SelectListItem> options = new List<SelectListItem>();
                for (int i = 0; i < Names.Length; i++)
                {
                    SelectListItem selectlist = new SelectListItem();
                    selectlist.Text = Names[i] != null ? Names[i].ToString() : "نال";
                    selectlist.Value = values[i] != null ? values[i].ToString() : "نال";
                    selectlist.Selected = prevalue as string == selectlist.Value;
                    options.Add(selectlist);
                }

                dic.Add(prop, options);
            }

            return dic;
        }
    }

    [Serializable]
    internal class EngineServiceException : Exception
    {
        private object injectedServiceIsNull;

        public EngineServiceException()
        {
        }

        public EngineServiceException(object injectedServiceIsNull)
        {
            this.injectedServiceIsNull = injectedServiceIsNull;
        }

        public EngineServiceException(string message) : base(message)
        {
        }

        public EngineServiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected EngineServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }

    [Serializable]
    internal class BaseEngineException : Exception
    {
        public BaseEngineException()
        {
        }

        public BaseEngineException(string message) : base(message)
        {
        }

        public BaseEngineException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected BaseEngineException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}

public static class Extentions
{
    public static string GetTableName<T>(this EngineContext context) where T : class
    {
        ObjectContext objectContext = ((IObjectContextAdapter) context).ObjectContext;

        return objectContext.GetTableName<T>();
    }

    public static string GetTableName<T>(this ObjectContext context) where T : class
    {
        string sql = context.CreateObjectSet<T>().ToTraceString();
        Regex regex = new Regex("FROM (?<table>.*) AS");
        Match match = regex.Match(sql);

        string table = match.Groups["table"].Value;
        return table;
    }
}