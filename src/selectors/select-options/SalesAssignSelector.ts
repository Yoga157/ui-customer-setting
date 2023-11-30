import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import IOptionsData from "./models/IOptionsData";
import ISearchResult from "./models/ISearchResult";
import IOptionsDataString from "./models/IOptionsDataString";
import SalesNameModel from "stores/customer-sales/models/SalesNameModel";

export default interface ISearchResultSales {
  readonly title: string;
  readonly salesID: number;
}

const _selectSalesSearch = (models: SalesNameModel[]): ISearchResultSales[] => {
  return models.map(
    (model: SalesNameModel): ISearchResultSales => ({
      title: model.salesName,
      salesID: model.salesID,
    })
  );
};

export const selectSalesSearchOptions: Selector<
  IStore,
  ISearchResultSales[]
> = createSelector(
  (state: IStore) => state.customerSalesAssign.sales,
  _selectSalesSearch
);
