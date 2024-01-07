export class ApiResult<T> {
  result:T;

  Message;
  Status: CustomResultType;
  total;
  totalPages;
}


export enum CustomResultType {
  success,
  fail
}
