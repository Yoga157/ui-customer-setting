import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";

const _selectInvoicingSchedule = (model: InvoicingScheduleModel): any => {
    return ({
        scheduleID: model.scheduleID,
        customerSettingID: model.customerSettingID,
        scheduleDays: model.scheduleDays,
        minDate: model.minDate,
        maxDate: model.maxDate,
        remark: model.remark
    })
};

export const selectInvoicingSchedule: Selector<IStore, any> = createSelector(
    (state: IStore) => state.invoicingSchedule.data,
    _selectInvoicingSchedule
);