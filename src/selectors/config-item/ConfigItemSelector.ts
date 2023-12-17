import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import ConfigItemModel from "stores/config-item/models/ConfigItemModel";

const _selectConfigItem = (models: ConfigItemModel[]): any => {
    return models.map((model: ConfigItemModel): any => ({
        productNumber: model.productNumber,
        soNumber: model.soNumber,
        poNumber: model.poNumber,
        poDate: model.poDate,
        etaByPurchasing: model.etaByPurchasing,
        etaByPMO: model.etaByPMO,
        doDate: model.doDate,
        descriptionItem: model.descriptionItem,
        brand: model.brand,
        quantity: model.quantity,
        warrantyStartDate: model.quantity
    }))
}

export const selectConfigItem: Selector<IStore, any> = createSelector(
    (state: IStore) => state.configItem.data, _selectConfigItem
)