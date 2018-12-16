
using System;
using System.Linq.Expressions;

namespace Engine.ServiceLayer.Engine
{
    public class DynamicQueryBuilder
    {
        public static Expression<Func<T, bool>>  Equal<T>(string name, object val)
        {
            var param=Expression.Parameter(typeof(T), "p");
          
            var propertyReference = Expression.Property(param, name);
         
            var value=Expression.Constant(val);
            
            return Expression.Lambda<Func<T, bool>>
            (Expression.Equal(propertyReference, value),
                new[] { param });
        }
    }
}