import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CustomerSettingRow from "stores/customer-setting/models/CustomerSettingRow";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ResultActions from "models/ResultActions";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

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
    customerID: model.customerID === null ? null : model.customerID,
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

const _selectCustomerSettingById = (model: CustomerSettingById): any => {
  return {
    customerSettingID: model.customerSettingID,
    customerID: model.customerID,
    customerCategoryID: model.customerCategoryID,
    shareable: model.shareable,
    pmoCustomer: model.pmoCustomer,
  };
};

export const selectCustomerSettingByCustomerId: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerSetting.dataByCustomerId,
  _selectCustomerSettingById
);

const _selectCustomerSettingOptions = (
  models: any[]
): ICustomerSettingOptions[] => {
  return models.map(
    (model: any): ICustomerSettingOptions => ({
      text: model.customerName,
      value: {
        customerName: model.customerName,
        customerSettingID: model.customerSettingID,
        customerID: model.customerID,
        blacklist: model.blacklist,
        holdshipment: model.holdshipment,
        avgAR: 0,
        address: "Jalan-jalan ke Bandung, cakep!",
      },
    })
  );
};

export const selectCustomerSettingOptions: Selector<
  IStore,
  ICustomerSettingOptions[]
> = createSelector(
  (state: IStore) => state.customerSetting.data.rows,
  _selectCustomerSettingOptions
);

const _selectPostResponseCustomerSetting = (model: ResultActions): any => {
  return {
    customerSettingID: model.resultObj.customerSettingID,
    customerID: model.resultObj.customerID,
    customerCategoryID: model.resultObj.customerCategoryID,
    shareable: model.resultObj.shareable,
    pmoCustomer: model.resultObj.pmoCustomer,
    createUserID: model.resultObj.createUserID,
    createDate: model.resultObj.createDate,
    modifyUserID: model.resultObj.modifyUserID,
    modifyDate: model.resultObj.modifyDate,
  };
};

export const selectPostResponseCustomerSetting: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerSetting.resultActions,
  _selectPostResponseCustomerSetting
);
