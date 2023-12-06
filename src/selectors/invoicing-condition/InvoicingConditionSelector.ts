import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import InvoicingConditionModel from "stores/invoicing-condition/models/InvoicingConditionModel";

export default interface IInvoicingConditionRow {
    readonly conditionID: number;
    readonly projectType: string;
    readonly conditionName: string;
}

const _selectInvoicingCondition = (models: InvoicingConditionModel[]): IInvoicingConditionRow[] => {
    return models.map(
      (model: InvoicingConditionModel): IInvoicingConditionRow => ({
        conditionID: model.conditionID,
        projectType: model.projectType,
        conditionName: model.conditionName
      })
    );
  };
  
  export const selectInvoicingCondition: Selector<
    IStore,
    IInvoicingConditionRow[]
  > = createSelector(
    (state: IStore) => state.invoicingCondition.data,
    _selectInvoicingCondition
  );