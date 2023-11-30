import SalesAssignModel from "./SalesAssignModel";
import SalesNameModel from "./SalesNameModel";
import SalesAssignPostModel from "./SalesAssignPostModel";

export default interface ISalesAssignState {
  readonly sales: SalesNameModel[];
  readonly data: SalesAssignModel;
  readonly salesExstingModel: SalesNameModel;
  readonly SalesAssignPostModel: SalesAssignPostModel;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
