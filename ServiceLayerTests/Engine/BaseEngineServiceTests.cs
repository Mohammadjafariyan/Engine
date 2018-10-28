using Microsoft.VisualStudio.TestTools.UnitTesting;
using Engine.Controllers.AbstractControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.ActionTypes;
using Engine.Service.AbstractControllers;
using WebAppIDEEngine.Models.ICore;
using ServiceLayer.Systems.Library;
using Entities;
using Engine.Attributes;

namespace Engine.Controllers.AbstractControllers.Tests
{
    [TestClass()]
    public class BaseEngineServiceTests
    {

        BaseEngineService<IModel> engine=null;
        [TestMethod()]
        public async Task SetViewDataTestAsync()
        {
            RentService rentservice = new RentService();
            Rent r = new Rent();
            Dictionary<string, DropDownAttribute> dropdowns = engine.GetModelDropdownAttributes<Rent>();
            Dictionary<string, DataTableAttribute> datatables = engine.GetModelTableAttributes<Rent>();
            Dictionary<string, TreeAttribute> trees = engine.GetModelTreeAttributes<Rent>();
            Dictionary<string, MultiSelectAttribute> multiselects = engine.GetModelMultiSelectAttributes<Rent>();

            //Dictionary<string, List<IDropDownOption>> dropdownData = await engine.GetDropdownDataAsync(dropdowns);
            //Dictionary<string, IQueryable<IDataTable>> dataTableData = await engine.GetDataTableDataAsync(datatables);
            //Dictionary<string, ITreeNode> treeData = await engine.GetTreeDataAsync(trees);
            //Dictionary<string, List<IDropDownOption>> multiSelectData = await engine.GetMultiSelectDataAsync(multiselects);


             //engine.SetData<Rent>(dropdownData.Keys.ToArray(), datatables.Values.ToArray());
             //engine.SetData<Rent>(dataTableData.Keys.ToArray(), datatables.Values.ToArray(), r);
             //engine.SetData<Rent>(treeData.Keys.ToArray(), datatables.Values.ToArray(), r);
             //engine.SetData<Rent>(multiSelectData.Keys.ToArray(), datatables.Values.ToArray(), r);



            //  await engine.GenerateAsync(r);
        }

    }
}