import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Table, Dropdown, Icon } from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import "./CustomerTableRowStyle.scss";
import ClaimFormEdit from "../../form/form-claim-edit/FormClaim";
import { useHistory } from "react-router-dom";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  readonly role: string;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const { role } = props;
  const [isChecked, setIsChecked] = useState(false);
  const { rowData, getRowData, data } = props;

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
        <ClaimFormEdit rowData={[rowData]} />,
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
      {rowData && data && (
        <Table.Row key={rowData.CustomerID}>
          <Table.Cell width="1">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                // verticalAlign: "middle",
              }}
            >
              <div>
                <label style={{ margin: "0.8rem", verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    onChange={() => setRowData(rowData)}
                    checked={
                      data.find((item) => item.customerID == rowData.customerID)
                        ? true
                        : false
                    }
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

                      <Dropdown.Item
                        text="Claim Account"
                        icon="circle check"
                        onClick={onClaimAccount}
                      />

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
          <Table.Cell textAlign="center">
            <div
              style={{
                backgroundColor: "#949aa1",
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
                No Name Accounts{" "}
              </p>{" "}
            </div>
          </Table.Cell>
          <Table.Cell textAlign="center">{rowData.customerID}</Table.Cell>
          <Table.Cell>
            <div
              style={{
                borderRadius: "1rem",
                width: "15rem",
                margin: "auto",
                display: "flex",
              }}
            >
              <p style={{ fontSize: "1rem" }}> {rowData.customerName}</p>{" "}
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
          <Table.Cell textAlign="center">
            {rowData.blacklist === true ? (
              <div
                style={{
                  backgroundColor: "#fb7757",
                  color: "white",
                  borderRadius: "1rem",
                  width: "70%",
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
                  width: "70%",
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
                  width: "50%",
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
                  width: "50%",
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
      )}
    </Fragment>
  );
};

export default CustomerTableRow;
