import { createSelector, ParametricSelector } from "reselect";
import IStore from "../../models/IStore";
import ICustomerTable from "./models/ICustomerTable";
import ICustomerTableRow from "./models/ICustomerTableRow";
import { Selector } from "react-redux";

interface IOptionsData {
  readonly value: number;
  readonly text: string;
}

const _selectCustomerSetting = (models: any): any => {
  return {
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
    customerGenID: model.customerGenID === "" ? "" : model.customerGenID,
    customerCategory: model.customerGenID === "" ? "" : model.customerGenID,
    customerName: model.customerName === "" ? "" : model.customerName,
    lastProjectName: model.lastProjectName === "" ? "" : model.lastProjectName,
    salesAssign: model.salesAssign === "" ? "" : model.salesAssign,
    relatedCustomer: model.relatedCustomer === "" ? "" : model.relatedCustomer,
    invoiceCondition:
      model.invoiceCondition === "" ? "" : model.invoiceCondition,
    shareable: model.shareable === "" ? "" : model.shareable,
    pmoCustomer: model.pmoCustomer === "" ? "" : model.pmoCustomer,
    blacklist: model.blacklist === "" ? "" : model.blacklist,
    holdshipment: model.holdshipment === "" ? "" : model.holdshipment,
    createUserID: model.createUserID === "" ? "" : model.createUserID,
    createDate: model.createDate === "" ? "" : model.createDate,
    modifyUserID: model.modifyUserID === "" ? "" : model.modifyUserID,
    modifyDate: model.modifyDate === "" ? "" : model.modifyDate,
  };
};

export const selectCustomerSetting: Selector<IStore, any> = createSelector(
  (state: IStore) => state.customerSetting.data!,
  _selectCustomerSetting
);
