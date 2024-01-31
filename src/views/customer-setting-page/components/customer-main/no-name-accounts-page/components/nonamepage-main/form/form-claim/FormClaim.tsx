import React, { Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Card, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import "../Modal.scss";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import CustomerSettingPostModel from "stores/customer-setting/models/CustomerSettingPostModel";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
  getRowData: (data: any) => void;
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
    selectRequesting(state, [CustomerSettingAct.POST_CLAIM_ACCOUNT])
  );
  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      const NewClaimAccount = new CustomerSettingPostModel(e);
      NewClaimAccount.customerSettingID = 0;
      NewClaimAccount.customerID = rowData[j].customerID;
      NewClaimAccount.salesID = JSON.parse(userId)?.employeeID;
      NewClaimAccount.requestedBy = JSON.parse(userId)?.employeeID;
      NewClaimAccount.requestedDate = new Date();
      NewClaimAccount.createDate = new Date();
      NewClaimAccount.createUserID = JSON.parse(userId)?.employeeID;

      await dispatch(CustomerSettingAct.postClaimAccount(NewClaimAccount));
    }
    props.getRowData([]);
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestNoNameAcc(1, 10, "CustomerID", "ascending")
    );
  };

  return (
    <Fragment>
      <Card.Header>
        <h4>Claim Accounts</h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={onSubmitHandler}
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
              <div style={{ textAlign: "center" }}>
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
                  style={{ padding: "12px 20px", fontSize: "15px" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ClaimAccount;
