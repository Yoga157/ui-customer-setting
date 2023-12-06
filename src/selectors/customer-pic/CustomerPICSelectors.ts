import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import CustomerPICModel from "stores/customer-pic/models/CustomerPICModel";

export default interface ICustomerPIC {
    readonly picName: string;
    readonly picTitle: string;
    readonly phone: string;
    readonly email: string;
    readonly latestProject: string;
}

const _selectCustomerPIC = (models: CustomerPICModel[]): ICustomerPIC[] => {
    return models.map(
        (model: CustomerPICModel): ICustomerPIC => ({
            picName: model.picName,
            picTitle: model.picTitle,
            phone: model.phone,
            email: model.email,
            latestProject: model.latestProject
        })
    )
}

export const selectCustomerPIC: Selector<IStore, ICustomerPIC[]> = createSelector(
    (state: IStore) => state.customerPIC.data, _selectCustomerPIC
)