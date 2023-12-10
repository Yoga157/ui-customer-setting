import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import RelatedCustomerModel from "stores/related-customer/models/RelatedCustomerModel";

const _selectRelatedCustomer = (models: RelatedCustomerModel[]): any => {
    return models.map((model: RelatedCustomerModel): any => ({
        relatedID: model.relatedID,
        customerGenID: model.customerGenID,
        customerName: model.customerName,
        address: model.address,
        avgAR: model.avgAR,
        blacklist: model.blacklist,
        holdshipment: model.holdshipment
    }))
}

export const selectRelatedCustomer: Selector<IStore, any> = createSelector(
    (state: IStore) => state.relatedCustomer.data, _selectRelatedCustomer
)