using System;
using Engine.Absence.Models;
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
    }

    public interface ITableColumnsStructureRepository
    {
    }
}