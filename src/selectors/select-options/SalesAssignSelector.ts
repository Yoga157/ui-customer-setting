import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import IOptionsData from "./models/IOptionsData";
import SalesNameModel from "stores/customer-sales/models/SalesNameModel";
import ISalesResultFilter from "./models/ISalesResultFilter";

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

const _selectSales = (models: SalesNameModel[]): ISalesResultFilter[] => {
  return models.map(
    (model: SalesNameModel): ISalesResultFilter => ({
      value: { salesName: model.salesName, salesID: model.salesID },
      text: model.salesName,
    })
  );
};

export const selectSalesOptions: Selector<
  IStore,
  ISalesResultFilter[]
> = createSelector(
  (state: IStore) => state.customerSalesAssign.sales,
  _selectSales
);
