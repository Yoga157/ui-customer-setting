import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CollectionHistoryModel from "stores/collection-history/models/CollectionHistoryModel";

const _selectCollectionHistory = (models: CollectionHistoryModel[]): any => {
    return models.map((model: CollectionHistoryModel): any => ({
        invoiceNumber: model.invoiceNumber,
        invoiceDate: model.invoiceDate,
        soid: model.soid,
        collectionAmount: model.collectionAmount,
        collectionDate: model.collectionDate 
    }))
}

export const selectCollectionHistory: Selector<IStore, any> = createSelector(
    (state: IStore) => state.collectionHistory.data, _selectCollectionHistory
)