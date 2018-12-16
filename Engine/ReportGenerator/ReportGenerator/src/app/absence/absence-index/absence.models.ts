import {InputField} from "../../form-generator/models";
import {FieldType, PropertyType} from "../../model/model";
import {SettingDFormInputsService} from "../../query-generator/select-columns-and-join/column-setting/setting-dform-inputs.service";


export const enum BiometricDataType {
  In = 0,
  Out = 1
}

export namespace System {
  export const enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
  }
}

export class AbsenceBase {
  Id: number;
}

export class BiometricData {
  Date: Date;
  Id: number;
  MachineId: number;
  PersonnelMachine: PersonnelMachine;
  PersonnelMachineId: number;
  Time: Date;
  Type: BiometricDataType;
  UserId: number;
}

export class Machine extends AbsenceBase {
  IP: string;
  MachineId: number;
  Name: string;
  PersonnelMachines: PersonnelMachine[];
  Port: string;
}

export class ObligatedRange extends AbsenceBase {
  Name: string;
  ObligatedRangeWeeks: ObligatedRangeWeeks[];
  WorkGroupObligatedRanges: WorkGroupObligatedRange[];
  OffDay: System.DayOfWeek;
}

export class ObligatedRangeDayTimes extends AbsenceBase {
  End: Date;
  ObligatedRangeWeek: ObligatedRangeWeeks;
  ObligatedRangeWeekId: number;
  Start: Date;
  IsRemoved: boolean;
  RangeType: RangeType;
  IsTwoDay: boolean;
}


export enum RangeType {
  Normal, Overtime, NightWork, HolidayWork, ShiftWork, Interrupion
}


export class ObligatedRangeWeeks extends AbsenceBase {
  DayOfWeek: System.DayOfWeek;
  DayOfWeekFaName: string;
  ObligatedRange: ObligatedRange;
  ObligatedRangeDayTimes: ObligatedRangeDayTimes[];
  ObligatedRangeId: number;
  IsSelected: boolean;
  WeekNumber;
  IsRemoved: boolean;
}

export class Personnel extends AbsenceBase {
  Code: string;
  LastName: string;
  Name: string;
  PersonnelMachines: PersonnelMachine[];
  WorkGroup: WorkGroup;
  WorkGroupId: number;
}

export class PersonnelMachine extends AbsenceBase {
  BiometricDatas: BiometricData[];
  Machine: Machine;
  MachineId: number;
  Personnel: Personnel;
  PersonnelId: number;
  UserIdInMachine: number;
}

export class WorkGroup extends AbsenceBase {
  Name: string;
  Personnels: Personnel[];
  WorkGroupObligatedRanges: WorkGroupObligatedRange[];
}

export class WorkGroupObligatedRange {
  ObligatedRange: ObligatedRange;
  ObligatedRangeId: number;
  WorkGroup: WorkGroup;
  WorkGroupId: number;
}



