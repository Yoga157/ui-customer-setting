import FunnelDashboardModel from '../../stores/funnel/models/FunnelDashbordModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import IFunnelTable from './models/IFunnelTable';
import IFunnelTableRow from './models/IFunnelTableRow';
import FunnelDashboardEnvelope from '../../stores/funnel/models/FunnelDashboardEnvelope';
import { Selector } from 'react-redux';

const _selectFunnels = (models: FunnelDashboardEnvelope): IFunnelTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.funnels),
    totalSellingPriceSum: models.totalSellingPriceSum,
    totalOrderingItem: models.totalOrderingItem,
    totalSellingItem: models.totalSellingItem,
    gpmAmountSum: models.gpmAmountSum,
  };
};

const _createTableRows = (models: FunnelDashboardModel[]): IFunnelTableRow[] => {
  return models.map((model: FunnelDashboardModel): IFunnelTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: FunnelDashboardModel): IFunnelTableRow => {
  return {
    funnelGenID: model.funnelGenID,
    funnelID: model.funnelID,
    salesID: model.salesID,
    salesName: model.salesName,
    presalesName: model.presalesName,
    customerName: model.customerName,
    projectName: model.projectName,
    totalSellingPrice: model.totalSellingPrice,
    totalOrderingItem: model.totalOrderingItem,
    totalSellingItem: model.totalSellingItem,
    gpmPctg: model.gpmPctg,
    gpmAmount: model.gpmAmount,
    createDate: model.createDate,
    dealCloseDate: model.dealCloseDate,
    funnelStatus: model.funnelStatus,
    customerGenID: model.customerGenID,
    productManager: model.productManager,
    dept: model.dept,
    commercialWorkflowStatus: model.commercialWorkflowStatus ? model.commercialWorkflowStatus : '-',
    serviceWorkflowStatus: model.serviceWorkflowStatus ? model.serviceWorkflowStatus : '-',
    flagSA: model.flagSA,
    flagOpen: model.flagOpen,
    soidc: model.soidc,
    soParent: model.soParent,
    saDate: model.saDate,
    saNumber: model.saNumber,
    currency: model.currency,
    rate: model.rate,
    reassignFlag: model.reassignFlag,
    stepName: model.stepName  ,
    flagManual: model.flagManual
  };
};

export const selectFunnels: Selector<IStore, IFunnelTable> = createSelector((state: IStore) => state.funnel.data!, _selectFunnels);