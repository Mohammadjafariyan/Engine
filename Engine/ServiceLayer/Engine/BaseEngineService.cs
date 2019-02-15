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
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using WebAppIDEEngine.Models.ICore;
using Engine.Attributes;
using ViewModel.ActionTypes;
using Domain.Attributes;
using Engine.Areas.ImportExport.Service;
using Engine.ServiceLayer.Engine;
using WebAppIDEEngine.Models;

namespace Engine.Service.AbstractControllers
{
    public abstract class BaseEngineService<T> : IEngineService<T> where T : class, IModel
    {
        public virtual Injector Injector { get; set; }

        public BaseEngineService()
        {
            this.Injector = new Injector();
        }


        public virtual void SaveRemoveableList<TBase, T>(TBase record, List<T> recordNodes,
            EngineContext db) where T : class,IRemovableNode 
            where TBase :class, IRemovable<T>
        {
            foreach (var weekDay in recordNodes)
            {
                if (weekDay.Id == 0)
                {
                    record.Nodes.Add(weekDay);
                }
                else
                {
                    var recordWeekDay = record.Nodes.First(w => w.Id == weekDay.Id);


                    db.Entry(recordWeekDay).CurrentValues.SetValues(weekDay);
                    if (weekDay.IsRemoved)
                    {
                        db.Entry(recordWeekDay).State = EntityState.Deleted;
                        continue;
                    }

                    db.Entry(recordWeekDay).State = EntityState.Modified;
                }
            }

            db.Entry(record).State = EntityState.Modified;
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


        public virtual Dictionary<string, string> GetPropertyNames<M>()
        {
            var names = typeof(M).GetProperties().Where(p =>
                    !p.PropertyType.IsArray && !p.PropertyType.IsGenericType &&
                    !p.PropertyType.IsInterface)
                .ToDictionary(key => key.Name, property =>
                    property.GetCustomAttributes().Where(c => c is IEngineAttribute && !(c is HiddenColumnAttribute))
                        .Select(c => c as IEngineAttribute)
                        .Select(c => c.Name).FirstOrDefault() ?? property.Name);

            return names;
        }

        public virtual IQueryable<T> Search(T p, IQueryable<T> dt)
        {
            var props = p.GetType().GetProperties();
            foreach (var propertyInfo in props)
            {
                var val = propertyInfo.GetValue(p);
                if (!(val is IModel) &&
                    !propertyInfo.PropertyType.IsArray &&
                    !propertyInfo.PropertyType.IsInterface &&
                    !propertyInfo.PropertyType.IsGenericType &&
                    !propertyInfo.PropertyType.IsAbstract)
                {
                    if (val != null && val.ToString() != "0")
                    {
                        Expression<Func<T, bool>> whereClause;
                        whereClause = DynamicQueryBuilder.Equal<T>(propertyInfo.Name, val);
                        dt = dt.Where(whereClause);
                    }
                }
            }


            return dt;
        }


        /// <summary>
        /// دیتای جدول مدل را بر میگرداند
        /// </summary>
        /// <typeparam name="B"></typeparam>
        /// <returns></returns>
        public virtual IDataTable GetDataTable(T p)
        {
            using (var db = new EngineContext())
            {
                var dt = db.Set<T>();
                db.Configuration.ProxyCreationEnabled = false;

            //    var dt = Search(p, set.ToList().AsQueryable());

                IDataTable dataTable = new ObjectDataTable<T>
                {
                    Records = dt,
                    RecordsList = dt.ToList(),
                    Headers = GetPropertyNames<T>()
                };
                db.Configuration.ProxyCreationEnabled = true;
                return dataTable;
            }
        }

        public virtual ITreeNode GetTree(ITreeParameter p)
        {
            return null;
        }

        public virtual List<IDropDownOption> GetDropDown(IDropDownParameter p)
        {
            using (var EngineContext = new EngineContext())
            {
                var _entities = EngineContext.Set<T>();
                return _entities.Select(d =>
                    new IDropDownOption {Id = d.Id.ToString(), Value = d.Name}).ToList();
            }
        }

        public virtual List<IDropDownOption> GetMultiSelect(IDropDownParameter p)
        {
            return this.GetDropDown(p);
        }

        public virtual async Task<IDataTable> GetDataTableAsync(T p)
        {
            return await Task.FromResult(GetDataTable(p));
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

        public virtual void Save(T p)
        {
            using (var db = new EngineContext())
            {
                if (p.Id == 0)
                {
                    db.Set<T>().Add(p);
                }
                else
                {
                    db.Entry(p).State = System.Data.Entity.EntityState.Modified;
                }

                db.SaveChanges();
            }
        }


        public virtual void Delete(long id)
        {
            using (var EngineContext = new EngineContext())
            {
                var entity = EngineContext.Set<T>().Find(id);
                if (entity == null)
                {
                    throw new BaseEngineException("رکورد یافت نشد");
                }

                ValidateDelete(EngineContext, entity);

                EngineContext.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
                EngineContext.SaveChanges();
            }
        }

        protected virtual void ValidateDelete(EngineContext engineContext, T entity) 
        {
           
        }

        public virtual T GetForEdit(long id)
        {
            using (var EngineContext = new EngineContext())
            {
                return EngineContext.Set<T>().Find(id);
            }
        }

        public virtual T GetById(long id)
        {
            using (var EngineContext = new EngineContext())
            {
                return EngineContext.Set<T>().Find(id);
            }
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
    
    public interface IRemovable<T> : IModel where T : IRemovableNode
    {
        List<T> Nodes { get; set; }
    }

    public interface IRemovableNode : IModel
    {
        bool IsRemoved { get; set; }
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