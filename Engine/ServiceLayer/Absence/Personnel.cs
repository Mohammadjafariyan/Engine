using System.Linq;
using ServiceLayer.Systems;
using System.Collections.Generic;
using ViewModel.ActionTypes;
using System.Data.SqlClient;
using Engine.Absence.Models;
using WebAppIDEEngine.Models;

namespace ServiceLayer.Absence
{
    /// <summary>
    /// Personnel
    /// Personnel
    /// </summary>
    public class PersonnelService : CommonService<Personnel>
    {
        public override List<IDropDownOption> GetDropDown(IDropDownParameter param)
        {
            using (var db = new EngineContext())
            {
                return db.Personnels.Select(p => new IDropDownOption
                {
                    Id = p.Id.ToString(),
                    Value = p.Name + " " + p.LastName
                }).ToList();
            }
        }
    }
}