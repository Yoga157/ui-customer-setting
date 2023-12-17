import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Table, Dropdown, List, Icon } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import "./CustomerTableRowStyle.scss";
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

  useEffect(() => {
    console.log("Efect");
  }, []);

  return (
    <Fragment>
      <Table.Row key={rowData.CustomerSettingID}>
        <Table.Cell width="4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div>
              <label style={{ margin: "0.8rem", verticalAlign: "middle" }}>
                <input
                  type="checkbox"
                  onClick={() => setRowData(rowData)}
                ></input>
              </label>
            </div>
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="View/Edit"
                  icon="edit outline"
                  onClick={onEdit}
                />

                <Dropdown.Item
                  text="Assign Sales"
                  icon="users"
                  onClick={reassignClick}
                />

                {rowData.status != "CANCEL" &&
                  rowData.CustomerSettingID == "" && (
                    <Dropdown.Item text="Cancel" icon="remove circle" />
                  )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerGenID}</Table.Cell>
        <Table.Cell>{rowData.customerCategory}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.lastProjectName}</Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.shareable === true ? (
            <div style={{ textAlign: "center" }}>
              <span>Yes</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell>{rowData.salesAssign}</Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.pmoCustomer === true ? (
            <div style={{ textAlign: "center" }}>
              <span>Yes</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell>{rowData.relatedCustomer}</Table.Cell>
        <Table.Cell>
          {rowData.invoiceCondition ? (
            <ul>
              {rowData.invoiceCondition.split(",").map((condition) => (
                <li key={condition}>{condition.trim()}</li>
              ))}
            </ul>
          ) : null}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {rowData.blacklist === true ? (
            <div
              style={{
                backgroundColor: "#fb7757",
                color: "white",
                borderRadius: "1rem",
                width: "3.8rem",
              }}
            >
              <Icon name="address book" size="small" />
              <span>Yes</span>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#27d4a5",
                color: "white",
                borderRadius: "1rem",
                width: "3.8rem",
              }}
            >
              <Icon name="address book" size="small" />
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.holdshipment === true ? (
            <div
              style={{
                backgroundColor: "#f6a52c",
                color: "white",
                borderRadius: "1rem",
                width: "3.8rem",
              }}
            >
              <Icon name="truck" size="small" />
              <span>Yes</span>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#656dd1",
                color: "white",
                borderRadius: "1rem",
                width: "3.8rem",
              }}
            >
              <Icon name="truck" size="small" />
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.createUserID}</Table.Cell>
        <Table.Cell>{rowData.createDate}</Table.Cell>
        <Table.Cell>{rowData.modifyUserID}</Table.Cell>
        <Table.Cell>{rowData.modifyDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;
