import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import { Selector } from "react-redux";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ResultActions from "models/ResultActions";

export default interface ICustomerSettingOptions {
  readonly text: string;
  readonly value: {};
}

//Selector No Name Account
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
    // customerSettingID:
    //   model.customerSettingID.toString() === "undefined"
    //     ? 0
    //     : model.customerSettingID,
    customerID: model.customerID === null ? null : model.customerID,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    invoiceCondition:
      model.invoiceCondition === "" ? "" : model.invoiceCondition,
    shareable: model.shareable === null ? null : model.shareable,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    blacklist: model.blacklist === null ? null : model.blacklist,
    named: model.named === null ? null : model.named,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
  };
};

export const selectCustomerSetting: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataNoName!,
  _selectCustomerSetting
);

//Selector Named Account
const _selectNameAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableNameRows(models.rows),
  };
};

const _createTableNameRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableNameRow(model));
};

const _mappingObjectTableNameRow = (model: any): any => {
  return {
    // customerSettingID:
    //   model.customerSettingID.toString() === "undefined"
    //     ? 0
    //     : model.customerSettingID,
    customerID: model.customerID === null ? null : model.customerID,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    blacklist: model.blacklist === null ? null : model.blacklist,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
  };
};

export const selectNameAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataNamed!,
  _selectNameAccount
);

//Selector Shareable Account
const _selectShareableAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableShareableRows(models.rows),
  };
};

const _createTableShareableRows = (models: any[]): any[] => {
  return models.map((model: any): any =>
    _mappingObjectTableShareableRow(model)
  );
};

const _mappingObjectTableShareableRow = (model: any): any => {
  return {
    // customerSettingID:
    //   model.customerSettingID.toString() === "undefined"
    //     ? 0
    //     : model.customerSettingID,
    customerID: model.customerID === null ? null : model.customerID,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    blacklist: model.blacklist === null ? null : model.blacklist,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
  };
};

export const selectShareableAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataShareable!,
  _selectShareableAccount
);

//Selector All Account
const _selectAllAccount = (models: any): any => {
  return {
    totalRow: models.totalRows,
    rows: _createTableAllRows(models.rows),
  };
};

const _createTableAllRows = (models: any[]): any[] => {
  return models.map((model: any): any => _mappingObjectTableAllRow(model));
};

const _mappingObjectTableAllRow = (model: any): any => {
  return {
    // customerSettingID:
    //   model.customerSettingID.toString() === "undefined"
    //     ? 0
    //     : model.customerSettingID,
    customerID: model.customerID === null ? null : model.customerID,
    customerCategory:
      model.customerCategory === "" ? "" : model.customerCategory,
    customerName: model.customerName === "" ? "" : model.customerName,
    customerAddress: model.customerAddress === "" ? "" : model.customerAddress,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesName: model.salesName === "" ? "" : model.salesName,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    pmoCustomer: model.pmoCustomer === null ? null : model.pmoCustomer,
    named: model.named === null ? null : model.named,
    blacklist: model.blacklist === null ? null : model.blacklist,
    holdshipment: model.holdshipment === null ? null : model.holdshipment,
    createdBy: model.createdBy === "" ? "" : model.createdBy,
    createdDate: model.createdDate === "" ? null : model.createdDate,
    modifiedBy: model.modifiedBy === "" ? "" : model.modifiedBy,
    modifiedDate: model.modifiedDate === "" ? null : model.modifiedDate,
  };
};

export const selectAllAccount: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.dataAll!,
  _selectAllAccount
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
    createdBy: model.resultObj.createdBy,
    createdDate: model.resultObj.createdDate,
    modifiedBy: model.resultObj.modifiedBy,
    modifiedDate: model.resultObj.modifiedDate,
  };
};

export const selectPostResponseCustomerSetting: Selector<
  IStore,
  any
> = createSelector(
  (state: IStore) => state.customerSetting.resultActions,
  _selectPostResponseCustomerSetting
);
