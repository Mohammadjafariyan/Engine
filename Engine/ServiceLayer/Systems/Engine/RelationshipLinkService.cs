using Engine.DomainLayer.Models.Core.ViewGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Engine.ServiceLayer.Systems.Engine
{
    public class RelationshipLinkService
    {
        public readonly List<RelationshipLink> RelationshipLinks = new List<RelationshipLink>
        {
            new RelationshipLink{
                Form="Model",
                Controller="Property",
                Action="GetDataTable",
                Name="پروپرتی ها",
                InModal=false
            }

        };
        public void init()
        {

        }


    }
}