import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import IStore from "models/IStore";
import { Divider, Grid, Form, Select } from "semantic-ui-react";
import { Button, DropdownClearInput, SelectInput } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectSalesOptions } from "selectors/select-options/SalesAssignSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
interface IProps {
  rowData: any;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
} & IProps> = ({ setOpenFilter, openFilter, rowData }) => {
  const [salesName, setSalesName] = useState("");
  const [salesAssignArray, setSalesAssignArray] = useState([]);
  const [salesFilter, setSalesFilter] = useState([]);
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

  const onResultSelectSales = (data: any): any => {
    console.log(data);
    let checkSales = salesAssignArray.find((obj) => obj.sales === data.salesID);
    if (checkSales === undefined) {
      setSalesAssignArray([
        ...salesAssignArray,
        {
          salesName: data.salesName,
          salesID: data.salesID,
        },
      ]);

      setSalesFilter([...salesFilter, data.salesName]);
    }
  };

  const onSubmitHandler = async () => {
    const shareable =
      shareableYesChecked && shareableNoChecked
        ? null
        : shareableYesChecked
        ? true
        : shareableNoChecked
        ? false
        : null;

    const pmo_customer =
      pmo_customerYesChecked && pmo_customerNoChecked
        ? null
        : pmo_customerYesChecked
        ? true
        : pmo_customerNoChecked
        ? false
        : null;

    const newsalesAssign =
      salesFilter.length == 0 ? null : salesFilter.join(" ");

    const holdshipment =
      holdshipmentYesChecked && holdshipmentNoChecked
        ? null
        : holdshipmentYesChecked
        ? true
        : holdshipmentNoChecked
        ? false
        : null;

    const blacklist =
      blacklistYesChecked && blacklistNoChecked
        ? null
        : blacklistYesChecked
        ? true
        : blacklistNoChecked
        ? false
        : null;

    dispatch(
      CustomerSettingAct.requestSearchCustomerSett(
        1,
        10,
        "CustomerSettingID",
        null,
        "ascending",
        newsalesAssign,
        shareable,
        pmo_customer,
        holdshipment,
        blacklist
      )
    );
  };

  const salesStoreDropdown = useSelector((state: IStore) =>
    selectSalesOptions(state)
  );

  useEffect(() => {
    dispatch(SalesAssign.requestSalesDropdown());
  }, [dispatch]);

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  const resetClick = (event) => {
    setShareableYesChecked(event.target.checked);
    setShareableNoChecked(event.target.checked);
    setPmo_customerYesChecked(event.target.checked);
    setPmo_customerNoChecked(event.target.checked);
    setHoldshipmentYesChecked(event.target.checked);
    setHoldshipmentNoChecked(event.target.checked);
    setShareableYesChecked(event.target.checked);
    setShareableNoChecked(event.target.checked);
    setBlacklistYesChecked(event.target.checked);
    setBlacklistNoChecked(event.target.checked);
    setSalesName("");

    dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
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
              onSubmit={() => onSubmitHandler()}
              render={({ handleSubmit }) => (
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
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
                              checked={shareableYesChecked}
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
                              checked={shareableNoChecked}
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
                              checked={pmo_customerYesChecked}
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
                              checked={pmo_customerNoChecked}
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
                        component={DropdownClearInput}
                        placeholder="-Choose Sales-"
                        values={salesName}
                        options={salesStoreDropdown}
                        onChanged={onResultSelectSales}
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      {salesAssignArray.map((data) => {
                        return (
                          <div
                            style={{ marginTop: "0.5rem" }}
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
                              checked={holdshipmentYesChecked}
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
                              checked={holdshipmentNoChecked}
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
                              checked={blacklistYesChecked}
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
                              checked={blacklistNoChecked}
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
                        onClick={(event) => resetClick(event)}
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
