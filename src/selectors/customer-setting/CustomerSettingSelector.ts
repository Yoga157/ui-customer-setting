import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";

const _selectCustomerSetting = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: any): any => {
  return {
    customerSettingID:
      model.customerSettingID.toString() === "undefined"
        ? 0
        : model.customerSettingID,
    customerGenID: model.customerGenID === null ? null : model.customerGenID,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesAssign: model.salesAssign === null ? null : model.salesAssign,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    invoiceCondition:
      model.invoiceCondition === "" ? "" : model.invoiceCondition,
    shareable: model.shareable === null ? null : model.shareable,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    blacklist: model.blacklist === null ? null : model.blacklist,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createUserID: model.createUserID === "" ? "" : model.createUserID,
    createDate: model.createDate === "" ? null : model.createDate,
    modifyUserID: model.modifyUserID === "" ? "" : model.modifyUserID,
    modifyDate: model.modifyDate === "" ? null : model.modifyDate,
  };
};

export const selectCustomerSetting: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.data!,
  _selectCustomerSetting
);

// const _selectCustomerName = (models: any[]): any[] => {
//   return models.map((model: any): any => ({
//     title: model.customerName,
//     description: model.customerGenID,
//   }));
// };

// export const selectCustomerName: Selector<IStore, IOptionsData[]> = createSelector(
//   (state: IStore) => state.funnelOpportunity.listCustomer,
//   _selectCustomerName
// );

// const _selectSalesName = (models: any[]): any[] => {
//   return models.map((model: any): any => ({
//     text: model.textData,
//     value: model.valueData,
//   }));
// };

// export const selectSalesName: Selector<IStore, IOptionsData[]> = createSelector(
//   (state: IStore) => state.funnelOpportunity.employee,
//   _selectSalesName
// );

// const _selectDirektorat = (models: any[]): any[] => {
//   return models.map((model: any): any => ({
//     text: model.textData,
//     value: model.valueData,
//   }));
// };

// export const selectDirektorat: Selector<IStore, IOptionsData[]> = createSelector(
//   (state: IStore) => state.funnelOpportunity.listDirektorat,
//   _selectDirektorat
// );

// const _mappingOppFailedTableRow = (model: any) => {
//   return {
//     brand: model.brand,
//     customerName: model.customerName,
//     eventName: model.eventName,
//     notes: model.notes,
//     errorMessage: model.errorMessage,
//     messageError: model.errorMessage.join(','),
//   };
// };
// const _selectResultOpp = (models: any[]): any[] => {
//   if (models.length > 0) {
//     return models.map((model: any): any => _mappingOppFailedTableRow(model));
//   }
//   return [];
// };
// export const selectResultOpp: Selector<IStore, any[]> = createSelector(
//   (state: IStore) => state.funnelOpportunity.resultActions.resultObj,
//   _selectResultOpp
// );
