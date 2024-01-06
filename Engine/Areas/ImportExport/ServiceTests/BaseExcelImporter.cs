using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Domain.Attributes;
using Engine.Entities.Models.ICore;
using Engine.Service.AbstractControllers;
using Engine.Utitliy;
using Spire.Pdf.Exporting.XPS.Schema;
using Spire.Xls;

namespace Engine.Areas.ImportExport.ServiceTests
{
    public abstract class BaseExcelImporter<T, S> : IExcelImporter
        where T : class, IModel, new() where S : IEngineService<T>

    {
        public List<T> Models { get; set; }
        public ExcelStructreTable Table { get; set; }
        public S Service { get; set; }
        public Injector Injector { get; set; }

        public BaseExcelImporter()
        {
            Injector = new Injector();
            Service = Injector.Inject<S>();
        }

        public virtual List<dynamic> GetModels()
        {
            return Models.Cast<dynamic>().ToList();
        }

        public virtual void ValidateModels()
        {
            if (this.Models == null || this.Models.Count == 0)
            {
                throw new ExcelImporterException("مدل خالی یا نال است و نمیتوان ذخیره کرد");
            }
        }


        public virtual void Save()
        {
            ValidateModels();
            foreach (var model in this.Models)
            {
                Service.Save(model);
            }
        }

        public virtual ExcelStructreTable GetTableTemplate()
        {
            ExcelStructreTable tbl = new ExcelStructreTable();

            var props = typeof(T).GetProperties()
                .Where(p => p.PropertyType == typeof(int) ||
                            p.PropertyType == typeof(long) ||
                            p.PropertyType == typeof(DateTime) ||
                            p.PropertyType == typeof(double) ||
                            p.PropertyType == typeof(float) ||
                            p.PropertyType == typeof(string) ||
                            p.PropertyType == typeof(byte) ||
                            p.PropertyType == typeof(byte[]) ||
                            p.PropertyType == typeof(TimeSpan) || 
                            p.PropertyType == typeof(int?) ||
                            p.PropertyType == typeof(long?) ||
                            p.PropertyType == typeof(DateTime?) ||
                            p.PropertyType == typeof(double?) ||
                            p.PropertyType == typeof(float?) ||
                            p.PropertyType == typeof(string) ||
                            p.PropertyType == typeof(byte?) ||
                            p.PropertyType == typeof(TimeSpan?)
                );
            var c = 0;
            foreach (var propertyInfo in props)
            {
                tbl.Nodes.Add(new ExcelStructreTableNode
                {
                    ColumnName = propertyInfo.Name,
                    ColumnTranslate = propertyInfo.GetCustomAttributes(typeof(T), false)
                                          .Where(a => a is BaseAttribute)
                                          .Select(a => a as BaseAttribute)
                                          .Select(a => a.Name)
                                          .FirstOrDefault() ?? propertyInfo.Name,
                    NumberInExcel = c++,
                });
            }

            return tbl;
        }

        public virtual void ImportExcel(Stream stream, ExcelStructreTable tbl)
        {
            Table = tbl;
            Workbook workbook = new Workbook();

            //Load workbook from stream
            workbook.LoadFromStream(stream);

            //Append a new sheet to worksheet and then name it
            int count = workbook.Worksheets.Count + 1;
            workbook.Worksheets.Create("Sheet" + count);


            var worksheet = workbook.Worksheets.FirstOrDefault();
            if (worksheet == null)
            {
                throw new ExcelImporterException("هیچ worksheet ای یافت نشد");
            }

            /// باید ببیند ساختار درخواستی با ساختار واقعی فایل یکسان باشد
            List<T> models = new List<T>();
            foreach (var range in worksheet.Rows)
            {
                var model = new T();
                for (var i = 0; i < range.Columns.Length; i++)
                {
                    var node = tbl.Nodes.FirstOrDefault(n => n.NumberInExcel == i);
                    if (node == null)
                        continue;
                    var rangeColumn = range.Columns[i];
                    var propertyInfo = model.GetType().GetProperties().FirstOrDefault(p => p.Name == node.ColumnName);
                    if (propertyInfo == null)
                    {
                        throw new ExcelImporterException("پروپرتی یافت نشد");
                    }

                    try
                    {
                        if (string.IsNullOrEmpty(rangeColumn.Value))
                        {
                            if (node.IsRequired)
                            {
                                throw new ExcelImporterException(
                                    $@"مقدار نال برای ستون ضروری ارسال شده است - ستون {node.ColumnTranslate} نال است");
                            }
                        }
                        else
                        {
                            var val = Convert.ChangeType(rangeColumn.Value, propertyInfo.PropertyType);
                            propertyInfo.SetValue(model, val);
                        }
                    }
                    catch (Exception E)
                    {
                        throw new ExcelImporterException(node.ColumnTranslate + "ستون ها با اولویت های اشتباه وارد شده اند - ");
                    }
                }

                models.Add(model);
            }


            this.Models = models;

            /*//Save workbook to disk
            workbook.Save();*/
        }
    }
}