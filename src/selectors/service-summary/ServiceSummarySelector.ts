import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import ServiceSummaryModel from "stores/service-summary/models/ServiceSummaryModel";

export default interface IServiceSummary {
    readonly serviceName: string;
    readonly years: string;
    readonly purchase: string;
}

const _selectServiceSummary = (models: ServiceSummaryModel[]): IServiceSummary[] => {
    return models.map(
      (model: ServiceSummaryModel): IServiceSummary => ({
        serviceName: model.serviceName,
        years: model.years,
        purchase: model.purchase.toString()
      })
    );
  };
  
  export const selectServiceSummary: Selector<
    IStore,
    IServiceSummary[]
  > = createSelector(
    (state: IStore) => state.serviceSummary.data,
    _selectServiceSummary
  );