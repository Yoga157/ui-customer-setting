import { RouterState } from "connected-react-router";
import IRequestingState from "stores/requesting/models/IRequestingState";
import IErrorState from "stores/error/models/IErrorState";
import IToastsState from "stores/toasts/models/IToastsState";
import IEmployeeState from "stores/employee/models/IEmployeeState";
import ISidebarContainerState from "stores/sidebar-containers/models/ISidebarContainerState";
import IUserState from "stores/users/models/IUserState";
import IModalFirstLevelState from "stores/modal/first-level/models/IModalFirstLevelState";
import IModalSecondLevelState from "stores/modal/second-level/models/IModalSecondLevelState";
import IModalThirdLevelState from "stores/modal/third-level/models/IModalThirdLevelState";
import IModalNoPaddingState from "stores/modal/no-padding/models/IModalNoPaddingState";
import IActionPlaNotesState from "stores/actionplan-notes/models/IActionPlaNotesState";
import IFunnelOpportunityState from "stores/funnel-opportunity/models/IFunnelState";
import IWhatsNewState from "stores/whats-new/models/IWhatsNewState";
import IFunnelState from "stores/funnel/models/IFunnelState";
import IBrandState from "stores/brand/models/IBrandState";
import ICustomerState from "stores/customer/models/ICustomerState";
import ICustomerSettingState from "stores/customer-setting/models/ICustomerState";
import ISalesAssignState from "stores/customer-sales/models/ISalesAssignState";
import ICustomerNameState from "stores/customer-name/models/ICustomerNameState";
import ICustomerPICState from "stores/customer-pic/models/ICustomerPICState";
import IBrandSummaryState from "stores/brand-summary/models/IBrandSummaryState";
import IServiceSummaryState from "stores/service-summary/models/IServiceSummaryState";
import IInvoicingScheduleState from "stores/invoicing-schedule/models/IInvoicingScheduleState";
import IInvoicingConditionState from "stores/invoicing-condition/models/IInvoicingConditionState";
import IRelatedCustomerState from "stores/related-customer/models/IRelatedCustomerState"
import IRelatedFileState from "stores/related-file/models/IRelatedFileState";
import IConfigItemState from "stores/config-item/models/ConfigItemState";
import ICollectionHistoryState from "stores/collection-history/models/CollectionHistoryState";
import IProjectHistoryState from "stores/project-history/models/IProjectHistoryState";

export default interface IStore {
  readonly error: IErrorState;
  readonly requesting: IRequestingState;
  readonly router: RouterState;
  readonly toasts: IToastsState;
  readonly modalFirstLevel: IModalFirstLevelState;
  readonly modalSecondLevel: IModalSecondLevelState;
  readonly modalThirdLevel: IModalThirdLevelState;
  readonly modalNoPadding: IModalNoPaddingState;
  readonly employee: IEmployeeState;
  readonly sidebar: ISidebarContainerState;
  readonly userLogin: IUserState;
  readonly actionPlan: IActionPlaNotesState;
  readonly funnelOpportunity: IFunnelOpportunityState;
  readonly whatsNew: IWhatsNewState;
  readonly funnel: IFunnelState;
  readonly brand: IBrandState;
  readonly customer: ICustomerState;
  readonly customerSetting: ICustomerSettingState;
  readonly customerSalesAssign: ISalesAssignState;
  readonly customerName: ICustomerNameState;
  readonly customerPIC: ICustomerPICState;
  readonly brandSummary: IBrandSummaryState;
  readonly serviceSummary: IServiceSummaryState;
  readonly invoicingSchedule: IInvoicingScheduleState;
  readonly invoicingCondition: IInvoicingConditionState;
  readonly relatedCustomer: IRelatedCustomerState;
  readonly relatedFile: IRelatedFileState;
  readonly configItem: IConfigItemState;
  readonly collectionHistory: ICollectionHistoryState;
  readonly projectHistory: IProjectHistoryState;
}
