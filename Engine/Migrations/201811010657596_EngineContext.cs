namespace Engine.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EngineContext : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Actions",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        FormId = c.Long(nullable: false),
                        Name = c.String(),
                        ActionType = c.Int(nullable: false),
                        ActionMethodType = c.Int(nullable: false),
                        QueryId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Forms", t => t.FormId, cascadeDelete: true)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .Index(t => t.FormId)
                .Index(t => t.QueryId);
            
            CreateTable(
                "dbo.Fields",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        TName = c.String(),
                        FieldType = c.Int(nullable: false),
                        Size = c.Int(nullable: false),
                        Min = c.Int(nullable: false),
                        Max = c.Int(nullable: false),
                        Regex = c.String(),
                        Width = c.Int(nullable: false),
                        Order = c.Int(nullable: false),
                        InputType = c.Int(nullable: false),
                        InputShowType = c.Int(nullable: false),
                        InputDisableType = c.Int(nullable: false),
                        UpdateOnChangeParentId = c.Long(),
                        HideOnSelectParentId = c.Long(),
                        ActionId = c.Long(),
                        OpenInModalPanelId = c.Long(),
                        PanelId = c.Long(nullable: false),
                        IdColumnName = c.String(),
                        ValueColumnName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Actions", t => t.ActionId)
                .ForeignKey("dbo.Fields", t => t.HideOnSelectParentId)
                .ForeignKey("dbo.Panels", t => t.OpenInModalPanelId)
                .ForeignKey("dbo.Panels", t => t.PanelId, cascadeDelete: true)
                .ForeignKey("dbo.Fields", t => t.UpdateOnChangeParentId)
                .Index(t => t.UpdateOnChangeParentId)
                .Index(t => t.HideOnSelectParentId)
                .Index(t => t.ActionId)
                .Index(t => t.OpenInModalPanelId)
                .Index(t => t.PanelId);
            
            CreateTable(
                "dbo.Panels",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Order = c.Int(nullable: false),
                        FormId = c.Long(nullable: false),
                        Type = c.Int(nullable: false),
                        QueryType = c.Int(nullable: false),
                        ParentId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Panels", t => t.ParentId)
                .ForeignKey("dbo.Forms", t => t.FormId, cascadeDelete: true)
                .Index(t => t.FormId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.Forms",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        UrlName = c.String(),
                        ModelId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.ModelId)
                .Index(t => t.ModelId);
            
            CreateTable(
                "dbo.Models",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        TableName = c.String(),
                        AsName = c.String(),
                        ModelType = c.Int(nullable: false),
                        elementX = c.Int(nullable: false),
                        elementY = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.DefineControllerMethods",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Translate = c.String(),
                        SubSystemId = c.Long(nullable: false),
                        DefineControllerId = c.Long(nullable: false),
                        ServiceMethodId = c.Long(nullable: false),
                        ModelId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DefineControllers", t => t.DefineControllerId)
                .ForeignKey("dbo.Models", t => t.DefineControllerId)
                .ForeignKey("dbo.ServiceMethods", t => t.DefineControllerId)
                .Index(t => t.DefineControllerId);
            
            CreateTable(
                "dbo.DefineControllers",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Translate = c.String(),
                        SubSystemId = c.Long(nullable: false),
                        ModelId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.ModelId)
                .ForeignKey("dbo.SubSystems", t => t.SubSystemId)
                .Index(t => t.SubSystemId)
                .Index(t => t.ModelId);
            
            CreateTable(
                "dbo.SubSystems",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Translate = c.String(),
                        IsInstalled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.DefineServices",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Translate = c.String(),
                        SubSystemId = c.Long(nullable: false),
                        ModelId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.ModelId)
                .ForeignKey("dbo.SubSystems", t => t.SubSystemId)
                .Index(t => t.SubSystemId)
                .Index(t => t.ModelId);
            
            CreateTable(
                "dbo.ServiceMethods",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        SubSystemServiceClassId = c.Long(nullable: false),
                        QueryId = c.Long(nullable: false),
                        DefineServiceId = c.Long(nullable: false),
                        ServiceReturnMethodType = c.Int(nullable: false),
                        ServiceItemReturnType = c.Int(nullable: false),
                        Translate = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .ForeignKey("dbo.DefineServices", t => t.DefineServiceId)
                .Index(t => t.QueryId)
                .Index(t => t.DefineServiceId);
            
            CreateTable(
                "dbo.Queries",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        LinQ = c.String(),
                        LinQJoin = c.String(),
                        QueryType = c.Int(nullable: false),
                        type = c.Int(nullable: false),
                        mainTableId = c.Long(nullable: false),
                        WhereStatement = c.String(),
                        SQL = c.String(),
                        queryName = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.mainTableId)
                .Index(t => t.mainTableId);
            
            CreateTable(
                "dbo.AddParameterForms",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        nameInSQL = c.String(),
                        nameInMethod = c.String(),
                        nameInComment = c.String(),
                        typeInModel = c.Int(nullable: false),
                        typeInSQL = c.Int(nullable: false),
                        range = c.Boolean(nullable: false),
                        defaultValue = c.String(),
                        uniqId = c.String(),
                        nullable = c.Boolean(nullable: false),
                        isSelected = c.Boolean(nullable: false),
                        QueryId = c.Long(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .Index(t => t.QueryId);
            
            CreateTable(
                "dbo.JoinTables",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        rightTableId = c.Long(nullable: false),
                        leftTableId = c.Long(nullable: false),
                        rightPropertyId = c.Long(nullable: false),
                        leftPropertyId = c.Long(nullable: false),
                        joinType = c.Int(nullable: false),
                        QueryId = c.Long(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Properties", t => t.leftPropertyId)
                .ForeignKey("dbo.Models", t => t.leftTableId)
                .ForeignKey("dbo.Properties", t => t.rightPropertyId)
                .ForeignKey("dbo.Models", t => t.rightTableId)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .Index(t => t.rightTableId)
                .Index(t => t.leftTableId)
                .Index(t => t.rightPropertyId)
                .Index(t => t.leftPropertyId)
                .Index(t => t.QueryId);
            
            CreateTable(
                "dbo.Properties",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        ModelId = c.Long(nullable: false),
                        NameInModel = c.String(),
                        NameInTable = c.String(),
                        PropertyType = c.Int(nullable: false),
                        PropertyInDatabaseType = c.Int(nullable: false),
                        NotMapped = c.Boolean(nullable: false),
                        ModelName = c.String(),
                        Size = c.Int(nullable: false),
                        Distinct = c.Boolean(nullable: false),
                        Nullable = c.Boolean(nullable: false),
                        PK = c.Boolean(nullable: false),
                        FK = c.Boolean(nullable: false),
                        NavigationPropertyId = c.Long(),
                        Name = c.String(),
                        NavigationProperty_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.NavigationProperties", t => t.NavigationProperty_Id)
                .ForeignKey("dbo.Models", t => t.ModelId, cascadeDelete: true)
                .Index(t => t.ModelId)
                .Index(t => t.NavigationProperty_Id);
            
            CreateTable(
                "dbo.NavigationProperties",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        ModelId = c.Long(nullable: false),
                        PrevId = c.Long(),
                        Name = c.String(),
                        NavigationPropertyType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.NavigationProperties", t => t.PrevId)
                .ForeignKey("dbo.Models", t => t.ModelId, cascadeDelete: true)
                .Index(t => t.ModelId)
                .Index(t => t.PrevId);
            
            CreateTable(
                "dbo.QueryProperties",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        PropertyId = c.Long(nullable: false),
                        QueryId = c.Long(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Properties", t => t.PropertyId)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .Index(t => t.PropertyId)
                .Index(t => t.QueryId);
            
            CreateTable(
                "dbo.QueryModels",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        ModelId = c.Long(nullable: false),
                        QueryId = c.Long(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.ModelId, cascadeDelete: true)
                .ForeignKey("dbo.Queries", t => t.QueryId)
                .Index(t => t.ModelId)
                .Index(t => t.QueryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Fields", "UpdateOnChangeParentId", "dbo.Fields");
            DropForeignKey("dbo.Fields", "PanelId", "dbo.Panels");
            DropForeignKey("dbo.Panels", "FormId", "dbo.Forms");
            DropForeignKey("dbo.Properties", "ModelId", "dbo.Models");
            DropForeignKey("dbo.NavigationProperties", "ModelId", "dbo.Models");
            DropForeignKey("dbo.Forms", "ModelId", "dbo.Models");
            DropForeignKey("dbo.DefineControllerMethods", "DefineControllerId", "dbo.ServiceMethods");
            DropForeignKey("dbo.DefineControllerMethods", "DefineControllerId", "dbo.Models");
            DropForeignKey("dbo.DefineControllerMethods", "DefineControllerId", "dbo.DefineControllers");
            DropForeignKey("dbo.DefineControllers", "SubSystemId", "dbo.SubSystems");
            DropForeignKey("dbo.DefineServices", "SubSystemId", "dbo.SubSystems");
            DropForeignKey("dbo.ServiceMethods", "DefineServiceId", "dbo.DefineServices");
            DropForeignKey("dbo.ServiceMethods", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.QueryProperties", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.QueryModels", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.QueryModels", "ModelId", "dbo.Models");
            DropForeignKey("dbo.Queries", "mainTableId", "dbo.Models");
            DropForeignKey("dbo.JoinTables", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.JoinTables", "rightTableId", "dbo.Models");
            DropForeignKey("dbo.JoinTables", "rightPropertyId", "dbo.Properties");
            DropForeignKey("dbo.JoinTables", "leftTableId", "dbo.Models");
            DropForeignKey("dbo.JoinTables", "leftPropertyId", "dbo.Properties");
            DropForeignKey("dbo.QueryProperties", "PropertyId", "dbo.Properties");
            DropForeignKey("dbo.Properties", "NavigationProperty_Id", "dbo.NavigationProperties");
            DropForeignKey("dbo.NavigationProperties", "PrevId", "dbo.NavigationProperties");
            DropForeignKey("dbo.AddParameterForms", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.Actions", "QueryId", "dbo.Queries");
            DropForeignKey("dbo.DefineServices", "ModelId", "dbo.Models");
            DropForeignKey("dbo.DefineControllers", "ModelId", "dbo.Models");
            DropForeignKey("dbo.Actions", "FormId", "dbo.Forms");
            DropForeignKey("dbo.Fields", "OpenInModalPanelId", "dbo.Panels");
            DropForeignKey("dbo.Panels", "ParentId", "dbo.Panels");
            DropForeignKey("dbo.Fields", "HideOnSelectParentId", "dbo.Fields");
            DropForeignKey("dbo.Fields", "ActionId", "dbo.Actions");
            DropIndex("dbo.QueryModels", new[] { "QueryId" });
            DropIndex("dbo.QueryModels", new[] { "ModelId" });
            DropIndex("dbo.QueryProperties", new[] { "QueryId" });
            DropIndex("dbo.QueryProperties", new[] { "PropertyId" });
            DropIndex("dbo.NavigationProperties", new[] { "PrevId" });
            DropIndex("dbo.NavigationProperties", new[] { "ModelId" });
            DropIndex("dbo.Properties", new[] { "NavigationProperty_Id" });
            DropIndex("dbo.Properties", new[] { "ModelId" });
            DropIndex("dbo.JoinTables", new[] { "QueryId" });
            DropIndex("dbo.JoinTables", new[] { "leftPropertyId" });
            DropIndex("dbo.JoinTables", new[] { "rightPropertyId" });
            DropIndex("dbo.JoinTables", new[] { "leftTableId" });
            DropIndex("dbo.JoinTables", new[] { "rightTableId" });
            DropIndex("dbo.AddParameterForms", new[] { "QueryId" });
            DropIndex("dbo.Queries", new[] { "mainTableId" });
            DropIndex("dbo.ServiceMethods", new[] { "DefineServiceId" });
            DropIndex("dbo.ServiceMethods", new[] { "QueryId" });
            DropIndex("dbo.DefineServices", new[] { "ModelId" });
            DropIndex("dbo.DefineServices", new[] { "SubSystemId" });
            DropIndex("dbo.DefineControllers", new[] { "ModelId" });
            DropIndex("dbo.DefineControllers", new[] { "SubSystemId" });
            DropIndex("dbo.DefineControllerMethods", new[] { "DefineControllerId" });
            DropIndex("dbo.Forms", new[] { "ModelId" });
            DropIndex("dbo.Panels", new[] { "ParentId" });
            DropIndex("dbo.Panels", new[] { "FormId" });
            DropIndex("dbo.Fields", new[] { "PanelId" });
            DropIndex("dbo.Fields", new[] { "OpenInModalPanelId" });
            DropIndex("dbo.Fields", new[] { "ActionId" });
            DropIndex("dbo.Fields", new[] { "HideOnSelectParentId" });
            DropIndex("dbo.Fields", new[] { "UpdateOnChangeParentId" });
            DropIndex("dbo.Actions", new[] { "QueryId" });
            DropIndex("dbo.Actions", new[] { "FormId" });
            DropTable("dbo.QueryModels");
            DropTable("dbo.QueryProperties");
            DropTable("dbo.NavigationProperties");
            DropTable("dbo.Properties");
            DropTable("dbo.JoinTables");
            DropTable("dbo.AddParameterForms");
            DropTable("dbo.Queries");
            DropTable("dbo.ServiceMethods");
            DropTable("dbo.DefineServices");
            DropTable("dbo.SubSystems");
            DropTable("dbo.DefineControllers");
            DropTable("dbo.DefineControllerMethods");
            DropTable("dbo.Models");
            DropTable("dbo.Forms");
            DropTable("dbo.Panels");
            DropTable("dbo.Fields");
            DropTable("dbo.Actions");
        }
    }
}
