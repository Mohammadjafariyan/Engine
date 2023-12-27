using System.Web;
using System.Web.Optimization;

namespace Engine
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            /*bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/Site.css"));*/


            bundles.Add(new StyleBundle("~/Content/Bootstrap3").Include(
                "~/Content/Bootstrap-rtl.css",
                "~/Content/DataTables/datatables.min.css",
                "~/Content/DataTables/AutoFill-2.3.0/css/autoFill.bootstrap.min.css",
                "~/Content/DataTables/ColReorder-1.5.0/css/colReorder.bootstrap.min.css",
                "~/Content/DataTables/DataTables-1.10.18/css/dataTables.bootstrap.min.css",
                "~/Content/DataTables/FixedColumns-3.2.5/css/fixedColumns.bootstrap.min.css",
                "~/Content/DataTables/Buttons-1.5.2/css/buttons.bootstrap.min.css",
                "~/Content/DataTables/FixedHeader-3.1.4/css/fixedHeader.bootstrap.min.css",
                "~/Content/DataTables/KeyTable-2.4.0/css/keyTable.bootstrap.min.css",
                "~/Content/DataTables/Responsive-2.2.2/css/responsive.bootstrap.min.css",
                "~/Content/DataTables/RowGroup-1.0.3/css/rowGroup.bootstrap.min.css",
                "~/Content/DataTables/RowReorder-1.2.4/css/rowReorder.bootstrap.min.css",
                "~/Content/DataTables/Scroller-1.5.0/css/scroller.bootstrap.min.css",
                "~/Content/DataTables/Select-1.2.6/css/select.bootstrap.min.css",
                "~/Content/Datepicker/jquery.Bootstrap-PersianDateTimePicker.css",
                "~/Content/timepicker/bootstrap-clockpicker.min.css",
                "~/Content/Site.css"
                ));
            
            bundles.Add(new ScriptBundle("~/Content/Bootstrap3js").Include(
                "~/Content/DataTables/datatables.min.js",
                "~/Content/DataTables/AutoFill-2.3.0/js/autoFill.bootstrap.min.js",
                "~/Content/DataTables/Buttons-1.5.2/js/buttons.bootstrap.js",
                "~/Content/DataTables/ColReorder-1.5.0/js/colReorder.bootstrap.min.js",
                "~/Content/DataTables/DataTables-1.10.18/js/dataTables.bootstrap.min.js",
                "~/Content/DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.min.js",
                "~/Content/DataTables/FixedHeader-3.1.4/js/dataTables.fixedHeader.min.js",
                "~/Content/DataTables/JSZip-2.5.0/jszip.min.js",
                "~/Content/DataTables/KeyTable-2.4.0/js/dataTables.keyTable.min.js",
                "~/Content/DataTables/pdfmake-0.1.36/pdfmake.min.js",
                "~/Content/DataTables/pdfmake-0.1.36/vfs_fonts.js",
                "~/Content/DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js",
                "~/Content/DataTables/RowGroup-1.0.3/js/rowGroup.bootstrap.min.js",
                "~/Content/DataTables/RowReorder-1.2.4/js/rowReorder.bootstrap.min.js",
                "~/Content/DataTables/Scroller-1.5.0/js/scroller.bootstrap.min.js",
                "~/Content/DataTables/Select-1.2.6/js/select.bootstrap.min.js",
                "~/Content/timepicker/bootstrap-clockpicker.min.js",
                "~/Content/Datepicker/jalaali.js",
                "~/Content/Datepicker/jquery.Bootstrap-PersianDateTimePicker.js"                                    
                                                        
            ));
            
            
            
            
            
            
            
            
            bundles.Add(new StyleBundle("~/Content/Bootstrap4").Include(
                "~/Content/Bootstrap4/bootstrap4.min.css",
                "~/Content/Site.css"
            ));
            
            bundles.Add(new ScriptBundle("~/Content/Bootstrap4js").Include(
                "~/Content/Bootstrap4/bootstrap4.min.js",                                
                "~/Content/Bootstrap4/jquery3.2.1.min.js"                                        
            ));
        }
    }
}