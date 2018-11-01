import {JoinTable} from "../query-generator/select-columns-and-join/table-design/table-design.component";
import {Utility} from "../query-generator/utility";
import {AddParameterForm} from "../query-generator/select-columns-and-join/column-setting/column-setting.component";
import {InputField} from "../form-generator/models";

/// <summary>
/// نوع پروپرتی مدل های سیستم در جداول دیتابیس
/// </summary>
export enum PropertyInDatabaseType {
  bigint, binary, bit, Char, date, Decimal, Float, image, Int, Money,
  nchar, ntext, numeric, nvarchar, real, smallint, text, time, varbinary, xml, varchar
}

/// <summary>
/// نوع پروپرتی مدل های سیستم
/// </summary>
export enum PropertyType {
  Int64, ByteArray, Boolean, String, DateTime, Double, Byte, Int32, Single, Int16,
  TimeSpan, Xml, Long, Int, Char, Decimal
}

/// <summary>
/// Where
/// </summary>
export enum WhereValueType {
  Value, Select
}

/// <summary>
/// Where
/// </summary>
export enum WhereType {
  EqualTo, NotEqualTo, Contains, StartWith, EndWith, NotStartWith, NotContain, IsNull, IsNotNull
}

/// <summary>
/// QuerySort
/// </summary>
export enum QuerySortType {
  Asc, Desc
}

/// <summary>
/// SqlFunction
/// </summary>
export enum SqlFunctionType {
  Value, Count, Avg, Max, Min, Sum
}

/// <summary>
/// پارامتر های متد اکشن ها
/// </summary>
export enum MethodParameterType {
  Int, Long, String, List, ByteArray, Model
}

/// <summary>
/// نوع رابطه ها
/// </summary>
export enum NavigationPropertyType {
  One, Many
}

/// <summary>
/// نوع مدل ها
/// </summary>
export enum ModelType {
  Table, ViewModel
}

/// <summary>
/// نوع پنل ها
/// </summary>
export enum PanelType {
  Search, Save, Table, Label
}

/// <summary>
/// نوع کوئری ها
/// </summary>
export enum QueryType {
  Join, LinQ, LinQJoin, StoredProcedure
}


/// <summary>
/// نوع فیلد ها
/// </summary>
export enum FieldType {
  Hidden,
  Text, TextArea, MultiSelect, Tree, DropDown, Magic, Table, Date, Time,
  Money, Number, FromDate, ToDate, FromTime, ToTime
  , Checkbox, Radio
}

/// <summary>
/// نوع اینپوت ها
/// </summary>
export enum InputType {
  Text, Money, Number, FromDate, ToDate, FromTime, ToTime

}

/// <summary>
/// نحوه ی نمایش
/// </summary>
export enum InputShowType {
  Show, OnCreate, OnEdit
}


/// <summary>
/// نحوه ی دیزیبل اینپوت ها در صفحات
/// </summary>
export enum InputDisableType {
  Show, OnCreate, OnEdit
}

/// <summary>
/// نوع عملیات متد های کنترولر ها
/// </summary>

export enum ActionMethodType {
  Post
  , Get, Put, Delete
}

/// <summary>
/// نوع عملیات کنترولر ها
/// </summary>
export enum ActionType {
  Dropdown, Table, GetById, Delete, Save, ForEdit
}

/// <summary>
/// نحوه ی محاسبه کوئری در نمایش جدول
/// </summary>
export enum PanelQueryType {
  SQL, LinqJoin, Linq, StoredProcedure
}


export class BaseEntity {
  Id;
}


export class Query extends  BaseEntity{
  type: QueryViewModelType = QueryViewModelType.Select;
  models: QueryModel[];
  selectedProperties: PropertyModel[];
  mainTable: Model;
  joinTables: JoinTable[];
  addParameterFields: AddParameterForm[];
  WhereStatement: string;
  SQL: string;
  queryName: string;
  QueryType: QueryType = QueryType.Join;
}

export enum QueryViewModelType {
  Insert, Update, Delete, Select
}


export class QueryModel extends BaseEntity
{

  ModelId
  QueryId

  Model: Model
  Query :Query
}


export class PropertyModel extends BaseEntity
{

  QueryId
  PropertyId

  Query: Query
  Property :Property
}
export class Model extends BaseEntity {

  get AsName(): string {
    return this._AsName ? this._AsName : this.Name;
  }

  set AsName(value: string) {
    this._AsName = value;
  }

  @InputField('Id', 'کد', FieldType.Text)
  Id=Utility.generateNewIdNumber();

  @InputField('Name', 'نام ', FieldType.Text)
  Name=null;

  @InputField('TableName', 'نام جدول', FieldType.Text)
  TableName=null;

  ModelType: ModelType=null;

  Properties: Property[] = [];
//public List<Form> Forms ;

  NavigationProperties: NavigationProperty[] = [];
  elementX: number;
  elementY: number;
  element: HTMLInputElement;
  JoinTables: JoinTable[] = [];
  private _AsName: string=null;
// MethodParameters:MethodParameter[] ;
}

export class NavigationProperty extends BaseEntity {
  ModelId;

  /// <summary>
  /// کد قبلی
  /// </summary>
  PrevId;
  Name;
  //Model: Model;

  /// <summary>
  ///  کدام پروپرتی را نشان می دهد
  /// </summary>
  Property: Property;
  NavigationPropertyType: NavigationPropertyType;
  Columns: Column[];
  Next: NavigationProperty[];
  //Prev: NavigationProperty;
}

export class Property extends BaseEntity {
  get NameInTableAsName(): string {
    return this._NameInTableAsName ? this._NameInTableAsName : this.NameInTable;
  }

  set NameInTableAsName(value: string) {
    this._NameInTableAsName = value;
  }

  Id=Utility.generateNewIdNumber()

  ModelId;
  ModelName;
  NameInModel;
  NameInTable;
  PropertyType: PropertyType;
  PropertyInDatabaseType: PropertyInDatabaseType;
  NotMapped;

  /// <summary>
  /// سایز در جدول دیتابیس
  /// </summary>
  Size;
  Distinct;
  Nullable;
  PK;
  FK;

  //Model: Model;
  Columns: Column[];
 // NavigationProperty: NavigationProperty;
  NavigationPropertyId;
  X: number;
  Y: number;


  /// report generator
  onOutPut;
  private _NameInTableAsName: string;
}

export class Column {
  Id;
  PropertyId;
  NavigationPropertyId;
  Name;
  TName;
  Order;
  Property: Property;
  NavigationProperty: NavigationProperty;
}

export class Where {
  Id;
  QueryId;
  ColumnId;
  Query;
  Column;
  WhereValueType: WhereValueType;
  WhereType: WhereType;
}

export class Parameter extends BaseEntity {
  Name;
  IsNullable;
  //Action :Action ;
  ActionId;
  Query;
  QueryId;
  MethodParameterType: MethodParameterType;
  //MethodParameters :MethodParameter[];


}

export class Result {


  Id;
  QueryId;
  ColumnId;
  Query;
  Column;
  SqlFunctionType: SqlFunctionType;
}

export class SelectColumn {

  Id;
  QueryId;
  ColumnId;
  Query;
  Column;

}

export class Sort {


  Id;
  QueryId;
  ColumnId;
  Query;
  Column;
  SortType: QuerySortType;
}

