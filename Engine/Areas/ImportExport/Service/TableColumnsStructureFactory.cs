using System;
using Engine.Absence.Models;
using Engine.Areas.ImportExport.Models;
using Engine.Areas.ImportExport.ServiceTests;
using NotImplementedException = System.NotImplementedException;

namespace Engine.Areas.ImportExport.Service
{
    public class TableColumnsStructureFactory
    {
        public const string BiometricRawDataName = nameof(BiometricRawData);
        public const string PersonnelName = nameof(Personnel);

        public IExcelImporter GetImporter(string biometricDataName)
        {
            if (string.IsNullOrEmpty(biometricDataName))
            {
                throw new ExcelImporterException("نال است");
            }

            switch (biometricDataName)
            {
                case TableColumnsStructureFactory.BiometricRawDataName:
                    return new ExcelBiometryDataImporter();
                    break;
                case TableColumnsStructureFactory.PersonnelName:
                    return new ExcelPersonnelNameImporter();
                    break;
            }

            throw new ExcelImporterException("یافت نشد");
        }
        
        public string GetImporterName(ExcelStructureTableNames table)
        {
         
            switch (table)
            {
                case ExcelStructureTableNames.Personnel:
                    return TableColumnsStructureFactory.PersonnelName;
                    break;
                case ExcelStructureTableNames.BiometricRawData:
                    return TableColumnsStructureFactory.BiometricRawDataName;
                    break;
            }

            throw new ExcelImporterException("یافت نشد");
        }
    }

    public interface ITableColumnsStructureRepository
    {
    }
}