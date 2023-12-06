import React, { useEffect, Fragment, useState, useCallback } from "react";
import { Button, SearchInput } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import {
  Form,
  Grid,
  Card,
  Divider,
  DropdownProps,
  Dropdown,
} from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";
import CustomerSettingRow from "stores/customer-setting/models/CustomerSettingRow";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
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

const AddSalesAssign: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [salesName, setSalesName] = useState("");
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
      } else {
        clearSearchResults();
      }
    },
    [dispatch]
  );

  const clearSearchResults = () => {
    setSalesAssignArray([]);
  };

  useEffect(() => {
    dispatch(SalesAssign.clearResult());
  }, [dispatch]);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = (e) => {
    const userId: any = localStorage.getItem("userLogin");

    // console.log(rowData);
    // console.log(salesAssignArray);

    for (let j = 0; j < rowData.length; j++) {
      for (let i = 0; i < salesAssignArray.length; i++) {
        const NewAssignSales = new SalesAssignPostModel(e);
        NewAssignSales.assignID = 0;
        NewAssignSales.SalesID = salesAssignArray[i].salesID;
        NewAssignSales.CustomerSettingID = rowData[j].customerSettingID;
        NewAssignSales.AssignedBy = 0;
        NewAssignSales.createUserID = 0;
        NewAssignSales.modifyUserID = 0;

        dispatch(SalesAssign.postAssignedSales(NewAssignSales));
      }
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
  };

  const onHandlerSearch = () => {
    // console.log("search");
  };

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
        <h4>
          {rowData.length == 1 ? "ASSIGN SALES" : "MULTIPLE ASSIGN SALES"}
        </h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={() => onHandlerSearch()}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        style={{ padding: "0px" }}
                        key={data.customerGenID}
                      >
                        <Grid.Column>
                          <h2>{data.customerName}</h2>
                        </Grid.Column>
                      </Grid.Row>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                        }}
                      >
                        <div>
                          <h4>
                            Shareable Customer{"  "}
                            {data.shareable && (
                              <i className="tiny circular inverted teal check icon align-icon"></i>
                            )}
                          </h4>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <h4>|</h4>
                        </div>
                        <div>
                          <h4>
                            PMO Customer{"  "}
                            {data.holdshipment && (
                              <i className="tiny circular inverted teal check icon align-icon"></i>
                            )}
                          </h4>
                        </div>
                      </div>

                      <Divider></Divider>
                    </>
                  );
                })}
                <Grid.Row>
                  <Grid.Column>
                    <Field
                      name="salesName"
                      component={SearchInput}
                      placeholder="Search sales name here.."
                      labelName="Search sales to assign"
                      handleSearchChange={handleSearchChangeSales}
                      onResultSelect={onResultSelectSales}
                      results={salesStoreSearch}
                      values={salesName}
                      mandatory={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    {salesAssignArray.map((data) => {
                      return (
                        <div
                          className="ui label labelBorPad"
                          key={data.salesID}
                        >
                          <span>{data.salesName}</span>
                          <i
                            className="delete icon btnSales"
                            onClick={() => deleteClick(data.salesID)}
                          ></i>
                        </div>
                      );
                    })}
                  </Grid.Column>
                </Grid.Row>
              </div>{" "}
            </Form>
          )}
        />
        <Divider></Divider>
        <div style={{ textAlign: "center" }}>
          <Button type="button" onClick={cancelClick}>
            Cancel
          </Button>
          <Button
            className="MarBot10"
            type="submit"
            color="blue"
            onClick={onSubmitHandler}
          >
            Submit
          </Button>
        </div>
      </LoadingIndicator>
    </Fragment>
  );
};

export default AddSalesAssign;
