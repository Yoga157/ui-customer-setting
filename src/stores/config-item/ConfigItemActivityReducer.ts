import IConfigItemState from "./models/ConfigItemState";
import * as ConfigItemActions from "./ConfigItemActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ConfigItemModel from "./models/ConfigItemModel";

export const initialState: IConfigItemState = {
    data: []
}

const ConfigItemReducer: Reducer = baseReducer(initialState, {
    [ConfigItemActions.REQUEST_GET_CONFIG_ITEM_FINISHED](state: IConfigItemState, action: IAction<ConfigItemModel[]>): IConfigItemState {
        return {
            ...state,
            data: action.payload!
        }
    },
})

export default ConfigItemReducer;