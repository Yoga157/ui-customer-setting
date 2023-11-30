import SalesAssignModel from "./SalesAssignModel";
import SalesNameModel from "./SalesNameModel";
import SalesAssignPostModel from "./SalesAssignPostModel";

export default interface ISalesAssignState {
  readonly data: SalesAssignModel[];
  readonly salesExistingModel: SalesNameModel[];
  readonly SalesAssignPostModel: SalesAssignPostModel;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
