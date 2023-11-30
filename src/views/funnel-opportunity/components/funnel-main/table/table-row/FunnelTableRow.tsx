import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Table, Dropdown, Confirm, Button } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ReAssignSales from "../../reassignsales/ReAssignSales";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import FunnelNotesForm from "../../form/notes/OpportunityCancel";
import "./FunnelTableRowStyle.scss";
import { FunnelFormEdit } from "../../form/index";
import RouteEnum from "constants/RouteEnum";
import * as FunnelOppActions from "stores/funnel-opportunity/FunnelActivityActions";

interface IProps {
  readonly rowData: any;
  readonly history: any;
}

const FunnelTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [colorStatus, setColorStatus] = useState("grey" as any);
  const { rowData } = props;

  const reassignClick = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReAssignSales
          funnelOpportunityID={rowData.funnelOpportunityID}
          salesFromText={rowData.salesName}
        />,
        ModalSizeEnum.Small
      )
    );
  };

  const onEdit = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <FunnelFormEdit rowData={rowData} />,
        ModalSizeEnum.Small
      )
    );
  };

  const moveToAddNewFunnel = () => {
    props.history.push({
      pathname: RouteEnum.FunnelForm,
      state: {
        eventName: rowData.eventName,
        customerName: rowData.customerName,
        funnelOpportunityID: rowData.funnelOpportunityID,
        eventDate: rowData.eventDate,
      },
    });
  };
  const showConfirmCancel = () => setOpenConfirm(true);

  // const handleConfirm = () => {
  //     dispatch(ModalFirstLevelActions.OPEN(<FunnelNotesForm funnelGenID={rowData.funnelGenID.toString()} fromForm="FormCancel" />,ModalSizeEnum.Tiny));
  //     setOpenConfirm(false);
  // }

  const onClickCancel = () =>
    dispatch(
      ModalFirstLevelActions.OPEN(
        <FunnelNotesForm fromForm="FormCancel" />,
        ModalSizeEnum.Tiny
      )
    );

  const handleCancel = () => setOpenConfirm(false);
  const showConfirm = () => setOpenConfirm(true);
  const handleDelete = () => {
    dispatch(
      FunnelOppActions.requestCancelOpp(rowData.funnelOpportunityID)
    ).then(() => {
      handleCancel();
      dispatch(
        FunnelOppActions.requestFunnelOpp(
          1,
          10,
          "FunnelOpportunityID",
          "ascending"
        )
      );
      dispatch(FunnelOppActions.clearResult());
    });
  };

  useEffect(() => {
    console.log("Efect");
  }, []);

  return (
    <Fragment>
      <Confirm
        open={openConfirm}
        onCancel={handleCancel}
        onConfirm={handleDelete}
        centered
        content={`Are you sure want to cancel ${rowData.eventName} ?`}
        size="mini"
      />

      <Table.Row key={rowData.funnelOpportunityID}>
        <Table.Cell width="1">
          {/*{(currentUser.role === 'Marketing' || currentUser.role === 'SuperAdmin' || currentUser.role === 'Sales') && (*/}
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              {/*{(currentUser.role === 'Marketing' || currentUser.role === 'Sales' || currentUser.role === 'SuperAdmin') && (*/}
              <Dropdown.Item
                text={
                  window.location.pathname ===
                  "/data-quality/funnel-opportunity"
                    ? "Edit"
                    : "Funnel Process"
                }
                icon={
                  window.location.pathname ===
                  "/data-quality/funnel-opportunity"
                    ? "edit outline"
                    : "random"
                }
                onClick={
                  window.location.pathname ===
                  "/data-quality/funnel-opportunity"
                    ? onEdit
                    : moveToAddNewFunnel
                }
                disabled={rowData.funnelID != "" || rowData.status == "CANCEL"}
              />
              {/* )}*/}

              {/*{(currentUser.role === 'SuperAdmin' || currentUser.role === 'Sales') && */}
              {window.location.pathname !==
                "/data-quality/funnel-opportunity" && (
                <Dropdown.Item
                  text="Reassign Sales"
                  icon="users"
                  onClick={reassignClick}
                />
              )}

              {rowData.status != "CANCEL" &&
              rowData.funnelID == "" && ( //window.location.pathname === '/data-quality/funnel-opportunity' && (
                  <Dropdown.Item
                    text="Cancel"
                    icon="remove circle"
                    onClick={showConfirm}
                  />
                )}
            </Dropdown.Menu>
          </Dropdown>
          {/* )} */}
        </Table.Cell>
        <Table.Cell>{rowData.funnelOpportunityID}</Table.Cell>
        {/*{window.location.pathname !== '/data-quality/funnel-opportunity' ? null : <Table.Cell>{rowData.status}</Table.Cell>}
        {window.location.pathname !== '/data-quality/funnel-opportunity' ? null : <Table.Cell>{rowData.funnelID}</Table.Cell>} */}
        <Table.Cell>{rowData.status}</Table.Cell>
        <Table.Cell>{rowData.funnelID}</Table.Cell>
        <Table.Cell>{rowData.eventName}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.brand}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.direktorat}</Table.Cell>
        <Table.Cell>{rowData.salesName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.agingDays}</Table.Cell>
        <Table.Cell>{rowData.eventDate}</Table.Cell>
        <Table.Cell>{rowData.createUserID}</Table.Cell>
        <Table.Cell>{rowData.createDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default FunnelTableRow;
