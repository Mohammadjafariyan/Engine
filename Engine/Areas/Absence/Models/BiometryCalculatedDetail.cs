using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Engine.Entities.Data.Absence.Models;
using Engine.Entities.Models.ICore;

namespace Engine.Areas.Absence.Models
{
    public class BiometryCalculatedDetailTime :IModel
    {
        /// <summary>
        /// ورود
        /// </summary>
        public DateTime? TimeIn { get; set; }

        /// <summary>
        /// خروج
        /// </summary>
        public DateTime? TimeOut { get; set; }
        
        
        
        /// <summary>
        /// بازه موظفی ورود
        /// </summary>
        public DateTime? RangeTimeIn { get; set; }

        /// <summary>
        /// بازه موظفی خروج
        /// </summary>
        public DateTime? RangeTimeOut { get; set; }
        
        
        
        /// <summary>
        /// مجاز 
        /// </summary>
        public TimeSpan Valid { get; set; }

        /// <summary>
        /// تاخیر در ورود
        /// </summary>
        public TimeSpan DelayIn { get; set; }

        /// <summary>
        /// تعجیل در خروج
        /// </summary>
        public TimeSpan HurryOut { get; set; }
        
        
        /// <summary>
        /// غیبت و کسری کار
        /// </summary>
        public TimeSpan Absence { get; set; }

        /// <summary>
        /// اضافه کاری
        /// </summary>
        public TimeSpan Overtime { get; set; }

        public BiometryCalculatedDetailTimeType Type { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public string ApplicationUserId { get; set; }
    }

    public enum BiometryCalculatedDetailTimeType
    {
        Valid,NotValid,Absence,Overtime,HurryUp,Delay
    }
    
    public enum RangeType
    {
        Normal,Overtime,NightWork,HolidayWork, ShiftWorkMorningAndAfternoon,ShiftWorkMorningAndAfternoonAndNight,ShiftWorkMorningAndNightOrAfternoonAndNight,Interrupion
    }


    public class BiometryCalculatedDetail : BaseEntity
    {
        public BiometryCalculatedDetail()
        {
            Times = new List<BiometryCalculatedDetailTime>();
        }

        public ICollection<BiometryCalculatedDetailTime> Times { get; set; }
        
        public BiometricData BiometricData { get; set; }

        /*

        [NotMapped]
        /// <summary>
        /// شماره ردیف در دیتاتیبل
        /// </summary>
        public long Index { get; set; }*/
        /// <summary>
        /// کد پرسنلی
        /// </summary>
        public long PersonnelId { get; set; }

        /// <summary>
        /// نام و نام خانوادگی
        /// </summary>
        public string PersonnelName { get; set; }

        /// <summary>
        /// نام گروه کاری
        /// </summary>
        public string WorkGroupName { get; set; }

        /// <summary>
        /// کد گروه کاری
        /// </summary>
        public long WorkGroupId { get; set; }


        /// <summary>
        /// کارکرد روزانه از
        /// </summary>
        public DateTime CalculatedFromDate { get; set; }

        /// <summary>
        /// کارکرد روزانه تا
        /// </summary>
        public DateTime CalculatedToDate { get; set; }


        /// <summary>
        /// وضعیت آن روز
        /// </summary>
        public string StatusName { get; set; }


        public PersonnelTaradodInfoStatus Status { get; set; }

        /// <summary>
        /// تاریخ
        /// </summary>
        public DateTime Date { get; set; }
        public string  DateStr { get; set; }


        /// <summary>
        /// مجموع حضور
        /// </summary>
        public TimeSpan Total { get; set; }
        
        public string TotalStr { get; set; }


        /// <summary>
        /// مجاز 
        /// </summary>
        public TimeSpan TotalValid { get; set; }

        public string TotalValidStr { get; set; }

        /// <summary>
        /// تاخیر در ورود
        /// </summary>
        public TimeSpan TotalDelayIn { get; set; }
        public string  TotalDelayStr { get; set; }

        /// <summary>
        /// تعجیل در خروج
        /// </summary>
        public TimeSpan TotalHurryOut { get; set; }
        public string  TotalHurryStr { get; set; }

        /// <summary>
        /// غیبت و کسری کار
        /// </summary>
        public TimeSpan TotalAbsence { get; set; }
        public string  TotalAbsenceStr { get; set; }

        /// <summary>
        /// اضافه کاری
        /// </summary>
        public TimeSpan TotalOvertime { get; set; }
        public string  TotalOvertimeStr { get; set; }

        /// <summary>
        /// نوبت کاری
        /// </summary>
        public TimeSpan ShiftWork { get; set; }
        public string  ShiftWorkStr { get; set; }

        /// <summary>
        /// شب کاری
        /// </summary>
        public TimeSpan NightWork { get; set; }
        public string  NightWorkStr { get; set; }

        /// <summary>
        /// ماموریت
        /// </summary>
        public TimeSpan MissionWork { get; set; }
        public string  MissionWorkStr { get; set; }

        /// <summary>
        /// تعطیل کاری
        /// </summary>
        public TimeSpan HolidayWork { get; set; }
        public string  HolidayWorkStr { get; set; }

        /// <summary>
        /// مرخصی
        /// </summary>
        public TimeSpan Vacation { get; set; }
        public string  VacationStr { get; set; }

        /// <summary>
        /// نامجاز
        /// </summary>

        public TimeSpan InValid { get; set; }
        public string  InValidStr { get; set; }

        public long Id { get; set; }
        public string Name { get; set; }
        public string ApplicationUserId { get; set; }
    }

    public enum PersonnelTaradodInfoStatus
    {
        Friday,
        OffDay
    }
}