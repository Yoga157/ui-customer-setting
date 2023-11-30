export default interface ICustomerTable {
  readonly customerSettingID: number;
  readonly customerGenID: number;
  readonly customerCategory: string;
  readonly customerName: string;
  readonly lastProjectName: string;
  readonly salesAssign: boolean;
  readonly relatedCustomer: string;
  readonly invoiceCondition: string;
  readonly shareable: boolean;
  readonly pmoCustomer: boolean;
  readonly blacklist: boolean;
  readonly holdshipment: boolean;
  readonly createUserID: string;
  readonly createDate: string;
  readonly modifyUserID: string;
  readonly modifyDate?: Date;
}
