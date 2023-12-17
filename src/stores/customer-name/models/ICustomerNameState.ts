import CustomerNameModel from "./CustomerNameModel";

export default interface ICustomerNameState {
    readonly data: CustomerNameModel[];
    readonly customerById: CustomerNameModel;
    resultActions: any;
}