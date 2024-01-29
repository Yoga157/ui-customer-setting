import React, { useEffect, Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import "../Modal.scss";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Card, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import ReleaseAccount from "stores/customer-setting/models/ReleaseAccounts";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
  getRowData: (data: any) => void;
}

const RelaseAccountMod: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const { rowData } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [CustomerSettingAct.PUT_RELEASES_ACCOUNTS])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      await dispatch(
        CustomerSettingAct.putReleaseAccount(
          (rowData.customerID = props.rowData[j].customerID),
          (rowData.salesID = JSON.parse(userId)?.employeeID),
          (rowData.modifyUserID = JSON.parse(userId)?.employeeID)
        )
      );
    }
    props.getRowData([]);
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestNamedAcc(1, 10, "CustomerID", "ascending")
    );
  };

  const onHandlerSearch = () => {};

  return (
    <Fragment>
      <Card.Header>
        <h4>Release Accounts</h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={() => onHandlerSearch()}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div
                  style={{
                    backgroundColor: "#f97452",
                    textAlign: "center",
                    borderRadius: "5rem",
                    height: "3.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      color: "#ffff",
                    }}
                  >
                    Are you sure want to release all this accounts ?
                  </p>
                </div>
                <Divider></Divider>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        className="padding-0"
                        key={data.customerGenID}
                      >
                        <Grid.Column>
                          <h2 style={{ color: "#55637a" }}>
                            {data.customerName}
                          </h2>
                        </Grid.Column>
                      </Grid.Row>

                      <Divider></Divider>
                    </>
                  );
                })}
              </div>
            </Form>
          )}
        />

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            type="button"
            onClick={cancelClick}
            style={{
              marginRight: "10px",
              padding: "12px 20px",
              fontSize: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            className="MarBot10"
            type="submit"
            color="blue"
            onClick={onSubmitHandler}
            style={{ padding: "12px 20px", fontSize: "15px" }}
          >
            Submit
          </Button>
        </div>
      </LoadingIndicator>
    </Fragment>
  );
};

export default RelaseAccountMod;
