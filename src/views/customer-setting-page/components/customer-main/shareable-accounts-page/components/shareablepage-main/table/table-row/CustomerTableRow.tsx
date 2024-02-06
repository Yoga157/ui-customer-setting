import React, { Fragment, useState, useCallback } from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import "./CustomerTableRowStyle.scss";
import ClaimForm from "../../form/modal-claim/ModalClaim";
import ReleaseForm from "../../form/modal-release/ModalRelease";
import { useHistory } from "react-router-dom";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  readonly role: any;
  readonly filterData: any;
  readonly myAccount: boolean;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();
  const { role } = props;
  const { rowData, getRowData, data } = props;
  const [isChecked, setIsChecked] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

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
    // setIsChecked((prevChecked) => !prevChecked);
  };

  const onClaimAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm
          rowData={[rowData]}
          filterData={props.filterData}
          myAccount={props.myAccount}
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const onReleaseAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReleaseForm
          rowData={[rowData]}
          filterData={props.filterData}
          myAccount={props.myAccount}
        />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onEdit = (id: number) => {
    history.push({
      pathname: "customer-setting/" + id,
      state: { rowData },
    });
  };

  return (
    <Fragment>
      <Table.Row key={rowData.customerID}>
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
                  checked={
                    data.find((item) => item.customerID == rowData.customerID)
                      ? true
                      : false
                  }
                  disabled={!rowData.salesName.includes(userLogin.fullName)}
                ></input>
              </label>
            </div>
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                {role === "Sales" && (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.customerID)}
                    />

                    {rowData.salesName.includes(userLogin.fullName) && (
                      <Dropdown.Item
                        text="Release Account"
                        icon="times circle"
                        onClick={onReleaseAccount}
                      />
                    )}

                    {!rowData.salesName.includes(userLogin.fullName) && (
                      <Dropdown.Item
                        text="Claim Account"
                        icon="circle check"
                        onClick={onClaimAccount}
                      />
                    )}

                    {rowData.status !== "CANCEL" &&
                      rowData.CustomerID === "" && (
                        <Dropdown.Item text="Cancel" icon="remove circle" />
                      )}
                  </>
                )}

                {role === "Admin" && (
                  <Dropdown.Item
                    text="View/Edit"
                    icon="edit outline"
                    onClick={() => onEdit(rowData.customerID)}
                  />
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
              Shareable Account{" "}
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
        <Table.Cell>
          {" "}
          <div
            style={{
              borderRadius: "1rem",
              width: "40rem",
              margin: "auto",
              display: "flex",
            }}
          >
            <p style={{ fontSize: "1rem" }}> {rowData.customerAddress}</p>{" "}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "20rem",
              width: "15rem",
              margin: "auto",
              height: "auto",
              justifyContent: "center",
              textAlign: "center",
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
              height: "auto",
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
              {rowData.salesName}
            </p>
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
              height: "auto",
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
              {rowData.createdBy}
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
              {rowData.createdDate}
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
              {rowData.modifiedBy}
            </p>{" "}
          </div>{" "}
        </Table.Cell>
        <Table.Cell>
          <div
            style={{
              color: "white",
              borderRadius: "1rem",
              maxWidth: "15rem",
              width: "10rem",
              margin: "auto",
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
              {rowData.modifiedDate}
            </p>{" "}
          </div>
        </Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;
