import React, { Fragment, useState } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import ApproveShareableAccounts from "stores/customer-setting/models/ApproveShareableccounts";

interface IProps {
  rowData: any;
}

const ApproveShareableReq: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [salesAssignArray, setSalesAssignArray] = useState([]);
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
      const NewAssignSales = new ApproveShareableAccounts(e);
      NewAssignSales.customerID = props.rowData[j].customerID;
      NewAssignSales.salesID = props.rowData[j].salesShareableID;
      NewAssignSales.isApprove = true;
      NewAssignSales.modifyUserID = JSON.parse(userId)?.employeeID;

      // await dispatch(
      //   CustomerSettingAct.putApproveCustomerSetting(
      //     NewAssignSales,
      //     props.rowData[j].customerID,
      //     830,
      //     true,
      //     830
      //   )
      // );
    }
    dispatch(ModalAction.CLOSE());
    dispatch(CustomerSettingAct.requestAllAcc(1, 10, "CustomerID"));
  };

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={onSubmitHandler}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid.Row>
                {rowData.length == 1}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "1rem",
                  }}
                >
                  <div style={{ padding: "0px" }}>
                    <img
                      className="ui centered medium"
                      src="/assets/info.png"
                      sizes="small"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
              </Grid.Row>
              <Grid.Row
                centered
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                }}
              >
                <span style={{ padding: "10px" }}>
                  Are you sure want to request share this account?
                </span>
              </Grid.Row>
              <Grid.Row>
                {rowData.map((data) => {
                  return (
                    <div>
                      <Grid.Row
                        centered
                        width={1}
                        style={{ padding: "0px" }}
                        key={data.customerID}
                      >
                        <Grid.Column style={{ marginBottom: "3rem" }}>
                          <p
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "1rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            {data.customerName}
                          </p>
                        </Grid.Column>
                      </Grid.Row>
                    </div>
                  );
                })}
              </Grid.Row>

              <Divider></Divider>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Button type="button" onClick={cancelClick}>
                  Cancel
                </Button>
                <Button type="submit" color="blue">
                  Send Request
                </Button>
              </div>
            </Form>
          )}
        />
      </LoadingIndicator>
    </Fragment>
  );
};

export default ApproveShareableReq;
