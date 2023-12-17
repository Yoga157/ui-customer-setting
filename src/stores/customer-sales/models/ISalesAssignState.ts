import SalesAssignModel from "./SalesAssignModel";
import SalesNameModel from "./SalesNameModel";
import SalesAssignPostModel from "./SalesAssignPostModel";
import SalesAssignHistoryModel from "./SalesAssignHistoryModel";

export default interface ISalesAssignState {
  readonly sales: SalesNameModel[];
  readonly data: SalesAssignModel;
  readonly salesExstingModel: SalesNameModel;
  readonly SalesAssignPostModel: SalesAssignPostModel;
  readonly salesHistory: SalesAssignHistoryModel[];
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
