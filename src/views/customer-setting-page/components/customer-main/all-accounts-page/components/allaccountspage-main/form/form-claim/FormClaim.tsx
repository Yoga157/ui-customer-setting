import React, { useEffect, Fragment, useState, useCallback } from "react";
import { Button, SearchInput } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Card, Divider, Icon } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import { format } from "date-fns";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
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
  const [salesName, setSalesName] = useState(" ");
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const { rowData } = props;
  const salesStoreSearch = useSelector((state: IStore) =>
    selectSalesSearchOptions(state)
  );

  const handleSearchChangeSales = useCallback(
    (data) => {
      setSalesName(data);
      if (data.length >= 2) {
        dispatch(SalesAssign.requestSalesByName(data));
      }
    },
    [dispatch]
  );

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");

    for (let j = 0; j < rowData.length; j++) {
      for (let i = 0; i < salesAssignArray.length; i++) {
        const NewAssignSales = new SalesAssignPostModel(e);
        // NewAssignSales.assignID = JSON.parse(userId)?.employeeID;
        NewAssignSales.salesID = salesAssignArray[i].salesID;
        NewAssignSales.customerSettingID = rowData[j].customerSettingID;
        // NewAssignSales.AssignedBy = JSON.parse(userId)?.employeeID;
        NewAssignSales.createDate = new Date(props.rowData[j].createDate);
        NewAssignSales.createUserID = JSON.parse(userId)?.employeeID;
        NewAssignSales.modifyUserID = JSON.parse(userId)?.employeeID;

        await dispatch(SalesAssign.postAssignedSales(NewAssignSales));
      }
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
  };

  const onHandlerSearch = () => {};

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  const onResultSelectSales = (data: any) => {
    let checkSales = salesAssignArray.find(
      (obj) => obj.salesID === data.result.salesID
    );
    if (checkSales === undefined) {
      setSalesAssignArray([
        ...salesAssignArray,
        {
          salesName: data.result.title,
          salesID: data.result.salesID,
        },
      ]);
    }
    setSalesName("");
  };

  const isValidsalesName = createValidator(
    (message) => (value) => {
      if (value === 0) {
        return message;
      }
    },
    "Invalid Sales Name"
  );

  const validate = combineValidators({
    salesName: composeValidators(isValidsalesName, isRequired("Sales Name"))(),
  });

  return (
    <Fragment>
      <Card.Header>
        <h4>Claim Accounts</h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={() => onHandlerSearch()}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div
                  style={{
                    backgroundColor: "#fffb9a",
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
                      color: "#333",
                    }}
                  >
                    Please pay more attention to customer accounts that you
                    choose
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

export default ClaimAccount;
