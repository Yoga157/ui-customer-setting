import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CollectionHistoryModel from "stores/collection-history/models/CollectionHistoryModel";
import ResultActions from "models/ResultActions";

const _selectCollectionHistory = (models: ResultActions): any => {
    if (Array.isArray(models.resultObj)) {
        return models.resultObj.map((model: CollectionHistoryModel): any => ({
            invoiceNumber: model.invoiceNumber,
            invoiceDate: model.invoiceDate,
            soid: model.soid,
            collectionAmount: model.collectionAmount,
            collectionDate: model.collectionDate 
        }))
    } else {
        return [];
    }
}

export const selectCollectionHistory: Selector<IStore, any> = createSelector(
    (state: IStore) => state.collectionHistory.data, _selectCollectionHistory
)