import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
  Table,
  Dropdown,
  Confirm,
  Button,
  Checkbox,
  TableCell,
} from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import "./CustomerTableRowStyle.scss";
// import { SalesFormCard } from '../../form/index';
import AddSalesAssign from "../../form/form-create/FormAdd";
import RouteEnum from "constants/RouteEnum";
import * as CustomerSettActions from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const [colorStatus, setColorStatus] = useState("grey" as any);
  const { rowData, getRowData } = props;

  const setRowData = (data) => {
    let checkData = props.data.find(
      (obj) => obj.customerGenID === data.customerGenID
    );

    if (checkData) {
      getRowData(
        props.data.filter(
          (selectedData) => selectedData.customerGenID !== data.customerGenID
        )
      );
    } else {
      getRowData([...props.data, data]);
    }

    // if(props.data.lenght != 0){
    //   getRowData([])
    // } else {
    // }
  };

  const reassignClick = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <AddSalesAssign rowData={[rowData]} />,
        ModalSizeEnum.Small
      )
    );
  };

  const onEdit = () => {
    props.history.push({
      pathname: RouteEnum.AddNewCustomerSetting,
      state: { rowData },
    });
  };

  // const moveToAddNewFunnel = () => {
  //   props.history.push({
  //     pathname: RouteEnum.FunnelForm,
  //     state: {
  //       eventName: rowData.eventName,
  //       customerName: rowData.customerName,
  //       funnelOpportunityID: rowData.funnelOpportunityID,
  //       eventDate: rowData.eventDate,
  //     },
  //   });
  // };
  // const showConfirmCancel = () => setOpenConfirm(true);

  // // const handleConfirm = () => {
  // //     dispatch(ModalFirstLevelActions.OPEN(<FunnelNotesForm funnelGenID={rowData.funnelGenID.toString()} fromForm="FormCancel" />,ModalSizeEnum.Tiny));
  // //     setOpenConfirm(false);
  // // }

  // const onClickCancel = () =>
  //   dispatch(
  //     ModalFirstLevelActions.OPEN(
  //       <FunnelNotesForm fromForm="FormCancel" />,
  //       ModalSizeEnum.Tiny
  //     )
  //   );

  const handleCancel = () => setOpenConfirm(false);
  const showConfirm = () => setOpenConfirm(true);

  useEffect(() => {
    console.log("Efect");
  }, []);

  return (
    <Fragment>
      <Table.Row key={rowData.CustomerSettingID}>
        <TableCell>
          <div>
            <label>
              <input
                type="checkbox"
                onClick={() => setRowData(rowData)}
              ></input>
            </label>
          </div>
        </TableCell>

        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit outline"
                onClick={onEdit}
              />

              {/* )}*/}

              <Dropdown.Item
                text="Assign Sales"
                icon="users"
                onClick={reassignClick}
              />

              {rowData.status != "CANCEL" && rowData.CustomerSettingID == "" && (
                <Dropdown.Item
                  text="Cancel"
                  icon="remove circle"
                  // onClick={showConfirm}
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{rowData.customerGenID}</Table.Cell>
        <Table.Cell>{rowData.customerCategory}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.lastProjectName}</Table.Cell>
        <Table.Cell>{rowData.shareable}</Table.Cell>
        <Table.Cell>{rowData.salesAssign}</Table.Cell>
        <Table.Cell>{rowData.pmoCustomer}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.relatedCustomer}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.invoiceCondition}</Table.Cell>
        <Table.Cell>{rowData.blacklist}</Table.Cell>
        <Table.Cell>{rowData.holdshipment}</Table.Cell>
        <Table.Cell>{rowData.createUserID}</Table.Cell>
        <Table.Cell>{rowData.createDate}</Table.Cell>
        <Table.Cell>{rowData.modifyUserID}</Table.Cell>
        <Table.Cell>{rowData.modifyDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;
