import React, { Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Card, Divider, Icon } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import {} from "revalidate";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
}

const ClaimAccount: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { rowData } = props;

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      const NewAssignSales = new SalesAssignPostModel(e);
      NewAssignSales.customerSettingID = 0;
      NewAssignSales.customerID = rowData[j].customerID;
      NewAssignSales.salesID = JSON.parse(userId)?.employeeID || 830;
      NewAssignSales.shareable = false;
      NewAssignSales.named = true;
      NewAssignSales.pmoCustomer = false;
      NewAssignSales.status = "approve";
      NewAssignSales.requestedBy = JSON.parse(userId)?.employeeID || 830;
      NewAssignSales.requestedDate = new Date();
      NewAssignSales.createDate = new Date();
      NewAssignSales.createUserID = JSON.parse(userId)?.employeeID || 830;
      NewAssignSales.modifyUserID = 0;

      await dispatch(SalesAssign.postClaimAccount(NewAssignSales));
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestNoNameAcc(1, 10, "CustomerID", "ascending")
    );
  };

  const onHandlerSearch = () => {};

  return (
    <Fragment>
      <Card.Header>
        <h4>Claim Accounts</h4>
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
                    backgroundColor: "#FFFB9A",
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
                      lineHeight: "1.3",
                      // color: "#A5AA89",
                    }}
                  >
                    Please pay more attention to customer accounts that you
                    choose ?
                  </p>
                </div>
                <Divider></Divider>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        className="padding-0"
                        key={data.customerID}
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

export default ClaimAccount;
