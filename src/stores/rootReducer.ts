import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import IStore from "../models/IStore";
import requestingReducer from "./requesting/RequestingReducer";
import errorReducer from "./error/ErrorReducer";
import toastsReducer from "./toasts/ToastsReducer";
import modalFirstLevelReducer from "./modal/first-level/ModalFirstLevelReducer";
import modalSecondLevelReducer from "./modal/second-level/ModalSecondLevelReducer";
import modalThirdLevelReducer from "./modal/third-level/ModalThirdLevelReducer";
import ModalNoPaddingReducer from "./modal/no-padding/ModalNoPaddingReducer";
import employeeReducer from "./employee/EmployeeReducer";
import sidebarContainerReducer from "./sidebar-containers/SidebarContainerReducer";
import userReducer from "./users/UserReducer";
import actionPlanNotesReducer from "./actionplan-notes/ActionPlanNotesReducer";
import funnelOpportunityReducer from "./funnel-opportunity/FunnelActivityReducer";
import whatsNewReducer from "./whats-new/WhatsNewReducer";
import customerReducer from "./customer/CustomerReducer";
import brandReducer from "./brand/BrandReducer";
import funnelReducer from "./funnel/FunnelReducer";
import customerSettingReducer from "./customer-setting/CustomerActivityReducer";
import SalesAssignReducer from "./customer-sales/SalesAssignActivityReducer";

const rootReducer = (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    error: errorReducer,
    requesting: requestingReducer,
    router: connectRouter(history) as any,
    toasts: toastsReducer,
    modalFirstLevel: modalFirstLevelReducer,
    modalSecondLevel: modalSecondLevelReducer,
    modalThirdLevel: modalThirdLevelReducer,
    modalNoPadding: ModalNoPaddingReducer,
    employee: employeeReducer,
    sidebar: sidebarContainerReducer,
    userLogin: userReducer,
    actionPlan: actionPlanNotesReducer,
    funnelOpportunity: funnelOpportunityReducer,
    whatsNew: whatsNewReducer,
    funnel: funnelReducer,
    customer: customerReducer,
    brand: brandReducer,
    customerSetting: customerSettingReducer,
    customerSalesAssign: SalesAssignReducer,
  };

  return combineReducers(reducerMap);
};

export default rootReducer;
