import { createSelector, Selector } from "reselect";
import IStore from "../../models/IStore";
import ProjectHistoryModel from "stores/project-history/models/ProjectHistoryModel";

const _selectProjectHistory = (models: ProjectHistoryModel[]): any[] => {
    return models.map(
      (model: ProjectHistoryModel): any => ({
        // payment: 
        //     `<div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#656DD1", padding: "0.5rem", borderRadius: "100%", width: "fit-content"}} onClick={(event) => onClickPayment('payment diklik')}>
        //         <Icon style={{ margin: "0", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", color:"white"}} name="eye"/>
        //     </div>`,
        funnelID: model.funnelID,
        so: model.so,
        projectName: model.projecName,
        customerName: model.customerName,
        salesName: model.salesName,
        salesDept: model.salesDept,
        soCloseDate: model.soCloseDate,
        soAmount: model.soAmount
      })
    );
  };
  
  export const selectProjectHistory: Selector<
    IStore,
    any[]
  > = createSelector(
    (state: IStore) => state.projectHistory.data,
    _selectProjectHistory
  );