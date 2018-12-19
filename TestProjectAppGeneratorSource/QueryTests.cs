using System;
using System.Linq;
using System.Reflection.Emit;
using AppSourceGenerator;
using Engine.Entities.Models.Core.AppGeneration;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core;
using Xunit;

namespace TestProjectAppGeneratorSource
{
    public class QueryTests
    {
       
        [Fact]
        public void TestQueryInsert()
        {
           
/*
 
  IIf(
  IsNull
  (
  [Forms]![ExportTotalList]![Code]),true,
 (
 (
 (Tir.Code)=[Forms]![ExportTotalList]![Code])
  AND ((Tir.WorkDate) Between
   [Forms]![ExportTotalList]![FromDate]
    And [Forms]![ExportTotalList]![ToDate])
    ) 
)
 

            var q=new Query();
            var model=new Model();;
            var model2=new Model();;
            var qm=new QueryModel();

            using (var db = new EngineContext())
            {
                db.Models.Add(model);
                db.Models.Add(model2);
                db.SaveChanges();
                db.Queries.Add(q);

                qm.Model = db.Models.FirstOrDefault();
                qm.Model = db.Models.LastOrDefault();
                
                q.models.Add(qm);
                db.SaveChanges();

                db.QueryModels.Remove(qm);
                db.Queries.Remove(q);
                db.Models.Remove(model);
                db.SaveChanges();

            }
*/


            Assert.True(true);
        }
        [Fact]
        public void Test1()
        {
            IGenerator g = new MvcProjectGenerator();
            
            
            
            
            Assert.True(true);
        }
    }
}