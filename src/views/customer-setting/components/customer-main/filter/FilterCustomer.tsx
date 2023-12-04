import React, { Fragment, useEffect, useState, useCallback } from "react";
import { isRequired } from "revalidate";
import { FormSpy } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Grid, Form, Select } from "semantic-ui-react";
import { Button, SelectInput } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";
import CustomerSettingModel from "stores/customer-setting/models/CustomerSettingModel";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
} & IProps> = ({ setOpenFilter, openFilter, rowData }) => {
  const [salesName, setSalesName] = useState("");
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const [shareableYesChecked, setShareableYesChecked] = useState(false);
  const [shareableNoChecked, setShareableNoChecked] = useState(false);
  const [pmo_customerYesChecked, setPmo_customerYesChecked] = useState(false);
  const [pmo_customerNoChecked, setPmo_customerNoChecked] = useState(false);
  const [holdshipmentYesChecked, setHoldshipmentYesChecked] = useState(false);
  const [holdshipmentNoChecked, setHoldshipmentNoChecked] = useState(false);
  const [blacklistYesChecked, setBlacklistYesChecked] = useState(false);
  const [blacklistNoChecked, setBlacklistNoChecked] = useState(false);

  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async (values) => {
    console.log(values);
    // console.log(pmoCustomer);

    const shareable =
      shareableYesChecked && shareableNoChecked
        ? null
        : shareableYesChecked
        ? "true"
        : shareableNoChecked
        ? "false"
        : null;

    const pmo_customer =
      pmo_customerYesChecked && pmo_customerNoChecked
        ? null
        : pmo_customerYesChecked
        ? "true"
        : pmo_customerNoChecked
        ? "false"
        : null;

    const holdshipment =
      holdshipmentYesChecked && holdshipmentNoChecked
        ? null
        : holdshipmentYesChecked
        ? "true"
        : holdshipmentNoChecked
        ? "false"
        : null;

    const blacklist =
      blacklistYesChecked && blacklistNoChecked
        ? null
        : blacklistYesChecked
        ? "true"
        : blacklistNoChecked
        ? "false"
        : null;

    console.log(shareable);
    console.log(pmo_customer);
    console.log(holdshipment);
    console.log(blacklist);

    await dispatch(
      CustomerSettingAct.requestSearchCustomerSett(
        1,
        10,
        "CustomerSettingID",
        null,
        null,
        null,
        shareable,
        pmo_customer,
        holdshipment,
        blacklist
      )
    );
    dispatch(ModalAction.CLOSE());
  };

  const salesStoreSearch = useSelector((state: IStore) =>
    selectSalesSearchOptions(state)
  );

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  const resetClick = () => {
    setSalesName("");
    setSalesAssignArray([]);
    // setHoldshipmentCustomer(false);
    // setShareable(false);
    // setPmoCustomer(false);
    // setBlacklist(false);
  };

  return (
    <div
      style={{
        top: "0",
        right: "0",
        position: "fixed",
        zIndex: 999,
      }}
    >
      <div
        style={{
          borderRadius: "2rem 0 0 0",
          width: "25rem",
          height: "100vh",
          backgroundColor: "#ffffff",
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flex: "1",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <Grid columns="equal" widht={8}>
            <Grid.Column width={8} verticalAlign="middle">
              <h4>ADVANCE FILTER</h4>
            </Grid.Column>

            <Grid.Column width={8}>
              <Button
                className="m-05r"
                icon="close"
                style={{ backgroundColor: "transparent", color: "black" }}
                floated="right"
                size="tiny"
                onClick={() => setOpenFilter(!openFilter)}
              />
            </Grid.Column>
          </Grid>

          <Divider></Divider>
          <LoadingIndicator isActive={isRequesting}>
            <FinalForm
              onSubmit={(values: any) => onSubmitHandler(values)}
              render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid.Row>
                    <p>Shareable</p>
                    <Grid.Row>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                          marginTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              name="shareable"
                              type="checkbox"
                              // value="yes"
                              // value= {shareableYesChecked && shareableNoChecked ? null : shareableYesChecked ? 'true' : shareableNoChecked ? 'false' : null}
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setShareableYesChecked(!shareableYesChecked)
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setShareableNoChecked(!shareableNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <p>PMO Customer</p>
                    <Grid.Row>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                          marginTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              name="pmo_customer"
                              type="checkbox"
                              value="yes"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setPmo_customerYesChecked(
                                  !pmo_customerYesChecked
                                )
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setPmo_customerNoChecked(!pmo_customerNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider></Divider>

                  <Grid.Row>
                    <Grid.Column>
                      <p>Sales Assign</p>
                      <Field
                        name="salesName"
                        // labelName="Sales Assign"
                        component={SelectInput}
                        placeholder="-Choose Sales-"
                        thousandSeparator={true}
                        // mandatory={true}
                        options={salesStoreSearch}
                        values={salesName}
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
                  <Divider></Divider>

                  <Grid.Row>
                    <p>Holdshipment Customer</p>
                    <Grid.Row>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                          marginTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              name="holdshipment"
                              value="yes"
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setHoldshipmentYesChecked(
                                  !holdshipmentYesChecked
                                )
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setHoldshipmentNoChecked(!holdshipmentNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <p>Blacklist Customer</p>
                    <Grid.Row>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                          marginTop: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              name="blacklist"
                              value="yes"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setBlacklistYesChecked(!blacklistYesChecked)
                              }
                            ></input>
                            <span>Yes</span>
                          </label>
                        </div>
                        <div style={{ margin: "0 1rem" }}></div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              onChange={() =>
                                setBlacklistNoChecked(!blacklistNoChecked)
                              }
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider style={{ marginBottom: "4rem" }}></Divider>
                  <Divider></Divider>
                  <div style={{ textAlign: "center" }}>
                    <Grid.Row>
                      <Button
                        className="MarBot20"
                        type="submit"
                        // color="blue"
                        style={{
                          width: "18rem",
                          color: "#f5f5f5",
                          background: "#656dd1",
                        }}
                      >
                        Apply Filter
                      </Button>
                    </Grid.Row>
                    <Grid.Row>
                      <Button
                        type="button"
                        onClick={() => resetClick}
                        style={{
                          width: "18rem",
                          color: "#656dd1",
                          background: "#f5f5f5",
                        }}
                      >
                        <p>Reset Filter</p>
                      </Button>
                    </Grid.Row>
                  </div>
                </Form>
              )}
            />
          </LoadingIndicator>
        </div>
      </div>
    </div>
  );
};

export default FilterCustomer;
