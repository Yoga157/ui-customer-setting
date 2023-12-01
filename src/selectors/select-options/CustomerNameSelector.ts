import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import CustomerNameModel from "stores/customer-name/models/CustomerNameModel";

export default interface ISearchResultCustomer {
    readonly title: string;
    readonly customerGenID: number;
    readonly address: string;
}

const _selectCustomerSearch = (models: CustomerNameModel[]): ISearchResultCustomer[] => {
    return models.map(
      (model: CustomerNameModel): ISearchResultCustomer => ({
        title: model.customerName,
        customerGenID: model.customerGenID,
        address: model.addr1.toString() + model.addr2.toString() + model.addr3.toString() + model.addr4.toString()
      })
    );
  };
  
  export const selectCustomerSearchOptions: Selector<
    IStore,
    ISearchResultCustomer[]
  > = createSelector(
    (state: IStore) => state.customerName.data,
    _selectCustomerSearch
  );