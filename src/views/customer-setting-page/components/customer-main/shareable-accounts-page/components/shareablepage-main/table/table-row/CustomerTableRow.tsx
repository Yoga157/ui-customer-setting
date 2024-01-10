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
import ClaimForm from "../../form/form-claim/FormClaim";

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
      (obj) => obj.customerID === data.customerID
    );

    if (checkData) {
      getRowData(
        props.data.filter(
          (selectedData) => selectedData.customerID !== data.customerID
        )
      );
    } else {
      getRowData([...props.data, data]);
    }
  };

  const onClaimAccount = useCallback((): void => {
    // console.log(rowData);
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm rowData={[rowData]} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const onEdit = (id: number) => {
    props.history.push({
      pathname: "customer-setting/" + id,
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
                  onClick={() => onEdit(rowData.customerSettingID)}
                />

                <Dropdown.Item
                  text="Claim Account"
                  icon="circle check"
                  onClick={onClaimAccount}
                />

                {rowData.status != "CANCEL" &&
                  rowData.CustomerSettingID == "" && (
                    <Dropdown.Item text="Cancel" icon="remove circle" />
                  )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div
            style={{
              backgroundColor: "#28d4a5",
              color: "white",
              borderRadius: "1rem",
              width: "10rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "1rem", textAlign: "center" }}>
              {" "}
              {rowData.Status}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerID}</Table.Cell>
        <Table.Cell>{rowData.customerCategory}</Table.Cell>
        <Table.Cell>
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "20rem",
              width: "15rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
              // justifyContent: "center",
              // textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#46494c",
              }}
            >
              {" "}
              {rowData.customerName}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>{rowData.CustomerAddress}</Table.Cell>
        <Table.Cell>
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "25rem",
              width: "20rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#46494c",
              }}
            >
              {" "}
              {rowData.lastProjectName}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          {" "}
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "15rem",
              width: "10rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#46494c",
              }}
            >
              {" "}
              {rowData.salesAssign}{" "}
            </p>{" "}
          </div>
        </Table.Cell>
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
        <Table.Cell>
          {" "}
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "20rem",
              width: "15rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#46494c",
              }}
            >
              {" "}
              {rowData.relatedCustomer}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {rowData.blacklist === true ? (
            <div
              style={{
                backgroundColor: "#fb7757",
                color: "white",
                borderRadius: "1rem",
                width: "80%",
                margin: "auto",
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
                width: "80%",
                margin: "auto",
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
                width: "55%",
                margin: "auto",
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
                width: "55%",
                margin: "auto",
              }}
            >
              <Icon name="truck" size="small" />
              <span>No</span>
            </div>
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "15rem",
              width: "10rem",
              margin: "auto",
              height: "2rem",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "#46494c",
              }}
            >
              {" "}
              {rowData.createUserID}
            </p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>{rowData.createDate}</Table.Cell>
        <Table.Cell>{rowData.modifyUserID}</Table.Cell>
        <Table.Cell>{rowData.modifyDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;
