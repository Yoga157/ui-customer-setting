import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import IOptionsData from "./models/IOptionsData";
import SalesNameModel from "stores/customer-sales/models/SalesNameModel";
import ISalesResultFilter from "./models/ISalesResultFilter";
import SalesAssignHistoryModel from "stores/customer-sales/models/SalesAssignHistoryModel";
import ResultActions from "models/ResultActions";

export default interface ISearchResultSales {
  readonly title: string;
  readonly salesID: number;
}

const _selectSalesSearch = (models: ResultActions): ISearchResultSales[] => {
  return models.resultObj.map(
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

const _selectSales = (models: ResultActions): ISalesResultFilter[] => {
  // console.log(models.resultObj)
    if (Array.isArray(models.resultObj)) {
    return models.resultObj.map(
      (model: any): ISalesResultFilter => ({
        value: { salesName: model.salesName, salesID: model.salesID },
        text: model.salesName,
      })
    );
  } else {
    return [];
  }
};
// const _selectSales = (models: ResultActions): any => {
//   console.log(models.resultObj)
// };

export const selectSalesOptions: Selector<
  IStore,
  ISalesResultFilter[]
> = createSelector(
  (state: IStore) => state.customerSalesAssign.sales,
  _selectSales
);

const _selectSalesHistory = (models: SalesAssignHistoryModel[]): any[] => {
  return models.map(
    (model: SalesAssignHistoryModel): any => ({
      assignID: model.assignID,
      customerSettingID: model.customerSettingID,
      salesID: model.salesID,
      salesName: model.salesName,
      customerName: model.customerName,
      yearAssign: model.yearAssign
    })
  )
}

export const selectSalesHistory: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.customerSalesAssign.salesHistory,
  _selectSalesHistory
);