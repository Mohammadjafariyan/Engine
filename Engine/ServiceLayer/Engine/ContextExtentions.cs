using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using Engine.Entities.Data;
using Engine.Entities.Models.ICore;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace Engine.ServiceLayer.Engine
{
    public static class ContextExtentions
    {
        public static IQueryable<T> Query<T>(this EngineContext db) where T : BaseEntity
        {
            var _userManager= HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
           
            var ApplicationUser = _userManager.FindByName(HttpContext.Current.User.Identity.Name);

            var UserId = ApplicationUser?.Id;
            var dt = db.Set<T>().Where(s => UserId == null || s.ApplicationUserId == ApplicationUser.Id);

            return dt;
        } 
        
        public static IQueryable<T> QueryNoTrack<T>(this EngineContext db) where T : BaseEntity
        {
            var _userManager= HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
           
            var ApplicationUser = _userManager.FindByName(HttpContext.Current.User.Identity.Name);

            var UserId = ApplicationUser?.Id;
            var dt = db.Set<T>().AsNoTracking().Where(s => UserId == null || s.ApplicationUserId == ApplicationUser.Id);

            return dt;
        }
        
        
        public static ApplicationUser GetCurrentUser(this EngineContext db) 
        {
            var userManager= HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
           
            var applicationUser = userManager.FindByName(HttpContext.Current.User.Identity.Name);


            return applicationUser;
        }
        
        public static void ClearListProperty<T>(this T obj,string collectionName) where T : BaseEntity
        {
            // Get the type of the generic class
            Type type = typeof(T);

            // Get the PropertyInfo for the property named "YourListProperty"
            PropertyInfo propertyInfo = type.GetProperty(collectionName);

            // Check if the property exists and is a List<T>
            if (propertyInfo != null && propertyInfo.PropertyType.IsGenericType &&
                propertyInfo.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
            {
                // Clear the list property
                var list = (IList)propertyInfo.GetValue(obj);
                list.Clear();
            }
            else
            {
                throw new Exception("Property 'YourListProperty' not found or not of type List<T>.");
            }
        }
        
        public static void AddItemToListProperty<T,TMany>(this T obj, TMany newItem,string collectionName)  where T : BaseEntity
        {
            // Get the type of the generic class
            Type type = typeof(T);

            // Get the PropertyInfo for the property named "YourListProperty"
            PropertyInfo propertyInfo = type.GetProperty(collectionName);

            // Check if the property exists and is a List<T>
            if (propertyInfo != null && propertyInfo.PropertyType.IsGenericType &&
                propertyInfo.PropertyType.GetGenericTypeDefinition() == typeof(List<>))
            {
                // Add the new item to the list property
                var list = (IList)propertyInfo.GetValue(obj);
                list.Add(newItem);
            }
            else
            {
                Console.WriteLine("Property 'YourListProperty' not found or not of type List<T>.");
            }
        }

        
      
    }
}