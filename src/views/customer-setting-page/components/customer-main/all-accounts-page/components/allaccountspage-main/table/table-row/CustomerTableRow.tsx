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
import ClaimForm from "../../form/form-claim/FormClaim";
import RequestForm from "../../form/form-reqshareaccount/FormReqShare";
import ReleaseForm from "../../form/form-release/FormRelease";
import ShareableReq from "../../form/form-approverequest/FormApproveShareable";

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
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const { rowData, getRowData } = props;
  const { role } = props;

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

  const onRequestAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <RequestForm rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onShareableRequest = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ShareableReq rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onReleaseAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ReleaseForm rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
    getRowData([]);
  }, [dispatch, rowData]);

  const onClaimAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm rowData={[rowData]} />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch, rowData]);

  const onEdit = (id: number) => {
    props.history.push({
      pathname: "customer-setting/" + id,
      state: { rowData },
    });
  };

  return (
    <Fragment>
      <Table.Row key={rowData.CustomerID}>
        <Table.Cell width="4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Dropdown pointing="left" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="View/Edit"
                  icon="edit outline"
                  onClick={() => onEdit(rowData.CustomerID)}
                />

                {(rowData.named === false || rowData.shareable === false) &&
                  role === "SALES" && (
                    <Dropdown.Item
                      text="Claim Account"
                      icon="circle check"
                      onClick={onClaimAccount}
                    />
                  )}

                {rowData.named === true && role === "ADMIN" && (
                  <>
                    <Dropdown.Item
                      text="Approve Shareable Request"
                      icon="circle check"
                      onClick={onShareableRequest}
                    />
                  </>
                )}

                {rowData.named === true && role === "SALES" && (
                  <>
                    <Dropdown.Item
                      text="Request Share Account"
                      icon="share"
                      onClick={onRequestAccount}
                    />

                    <Dropdown.Item
                      text="Release Account"
                      icon="remove circle"
                      onClick={onReleaseAccount}
                    />
                  </>
                )}

                {rowData.status != "CANCEL" && rowData.customerID == "" && (
                  <Dropdown.Item text="Cancel" icon="remove circle" />
                )}
              </Dropdown.Menu>
              {/* <Dropdown.Menu>
                {rowData.shareable == true &&
                rowData.named == false &&
                role === "ADMIN" ? (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />
                  </>
                ) : (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />
                    <Dropdown.Item
                      text="Claim Account"
                      icon="circle check"
                      onClick={onClaimAccount}
                    />
                  </>
                )}

                {rowData.named == false &&
                rowData.shareable == false &&
                role === "ADMIN" && (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />
                  </>
                ) : (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />
                    <Dropdown.Item
                      text="Claim Account"
                      icon="circle check"
                      onClick={onClaimAccount}
                    />
                  </>
                )}

                {rowData.named == true &&
                rowData.shareable == false &&
                role === "ADMIN" ? (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />

                    <Dropdown.Item
                      text="Approve Shareable Request"
                      icon="circle check"
                      onClick={onShareableRequest}
                    />
                  </>
                ) &&  (
                  <>
                    <Dropdown.Item
                      text="View/Edit"
                      icon="edit outline"
                      onClick={() => onEdit(rowData.CustomerID)}
                    />

                    <Dropdown.Item
                      text="Request Share Account"
                      icon="share"
                      onClick={onRequestAccount}
                    />

                    <Dropdown.Item
                      text="Release Account"
                      icon="remove circle"
                      onClick={onReleaseAccount}
                    />
                  </>
                )}

                {rowData.status != "CANCEL" && rowData.customerID == "" && (
                  <Dropdown.Item text="Cancel" icon="remove circle" />
                )}
              </Dropdown.Menu> */}
            </Dropdown>
          </div>
        </Table.Cell>
        <Table.Cell>
          {rowData.named === false && rowData.shareable === false && (
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
                No Name Accounts
              </p>
            </div>
          )}

          {rowData.named === true && (
            <div
              style={{
                backgroundColor: "#656dd1",
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
                Named Accounts
              </p>
            </div>
          )}

          {rowData.shareable === true && rowData.named === false && (
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
                Shareable Accounts
              </p>
            </div>
          )}
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
              maxWidth: "25rem",
              width: "20rem",
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
              {rowData.salesName}{" "}
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
