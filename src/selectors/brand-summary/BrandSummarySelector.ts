import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import BrandSummaryModel from "stores/brand-summary/models/BrandSummaryModel";

export default interface IBrandSummary {
    readonly brandName: string;
    readonly years: string;
    readonly purchase: string;
}

const _selectBrandSummary = (models: BrandSummaryModel[]): IBrandSummary[] => {
    return models.map(
      (model: BrandSummaryModel): IBrandSummary => ({
        brandName: model.brandName,
        years: model.years,
        purchase: model.purchase.toString() + " %"
      })
    );
  };
  
  export const selectBrandSummary: Selector<
    IStore,
    IBrandSummary[]
  > = createSelector(
    (state: IStore) => state.brandSummary.data,
    _selectBrandSummary
  );