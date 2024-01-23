import React, { useEffect, useRef, useState } from "react";
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
  const [pmo_customerYesChecked, setPmo_customerYesChecked] = useState(false);
  const [pmo_customerNoChecked, setPmo_customerNoChecked] = useState(false);
  const [holdshipmentYesChecked, setHoldshipmentYesChecked] = useState(false);
  const [holdshipmentNoChecked, setHoldshipmentNoChecked] = useState(false);
  const [blacklistYesChecked, setBlacklistYesChecked] = useState(false);
  const [blacklistNoChecked, setBlacklistNoChecked] = useState(false);

  const dispatch: Dispatch = useDispatch();

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerSettingAct.REQUEST_SHAREABLE_ACCOUNTS,
      CustomerSettingAct.REQUEST_SHAREABLE_SEARCH,
    ])
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

      setSalesFilter([...salesFilter, data.salesID.toString()]);
    }
  };

  const onSubmitHandler = async () => {
    const pmo_customer =
      pmo_customerYesChecked && pmo_customerNoChecked
        ? null
        : pmo_customerYesChecked
        ? true
        : pmo_customerNoChecked
        ? false
        : null;

    const newsalesAssign =
      salesFilter.length == 0 ? null : salesFilter.join(",");

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
      CustomerSettingAct.requestSearchShareabelAcc(
        1,
        10,
        "CustomerID",
        null,
        "ascending",
        newsalesAssign,
        pmo_customer,
        blacklist,
        holdshipment
      )
    );
    // console.log(pmo_customer);
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

  const resetClick = () => {
    setPmo_customerYesChecked(false);
    setPmo_customerNoChecked(false);
    setHoldshipmentYesChecked(false);
    setHoldshipmentNoChecked(false);
    setBlacklistYesChecked(false);
    setBlacklistNoChecked(false);
    setSalesName("");
    setSalesAssignArray([]);

    dispatch(
      CustomerSettingAct.requestNamedAcc(1, 10, "CustomerID", "ascending")
    );
  };

  /** mengatur tinggi filter */
  const titleFilterRef = useRef(null);
  const contentFilterRef = useRef(null);
  const buttonFilterRef = useRef(null);

  useEffect(() => {
    const titleFilterElement = titleFilterRef.current;
    const contentFilterElement = contentFilterRef.current;
    const buttonFilterElement = buttonFilterRef.current;

    if (titleFilterElement && contentFilterElement && buttonFilterElement) {
      const titleFilterElementHeight = titleFilterElement.offsetHeight;
      const buttonFilterElementHeight = buttonFilterElement.offsetHeight;

      contentFilterRef.current.style.height = `calc(100vh - ${titleFilterElementHeight}px - ${buttonFilterElementHeight}px - 25px)`;
    }
  }, []);

  return (
    <div
      style={{
        top: "0",
        right: "0",
        position: "fixed",
        zIndex: 999,
      }}
    >
      <FinalForm
        onSubmit={() => onSubmitHandler()}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                borderRadius: "2rem 0 0 0",
                width: "25rem",
                height: "100vh",
                backgroundColor: "#ffffff",
                padding: "25px",
                position: "relative",
              }}
            >
              {/* <LoadingIndicator isActive={isRequesting}> */}
              <div ref={titleFilterRef}>
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
              </div>
              <div ref={contentFilterRef} style={{ overflowY: "auto" }}>
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
                              setPmo_customerYesChecked(!pmo_customerYesChecked)
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
                              setHoldshipmentYesChecked(!holdshipmentYesChecked)
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
              </div>

              <div
                ref={buttonFilterRef}
                style={{
                  position: "absolute",
                  bottom: 0,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "calc(100% - 50px)",
                }}
              >
                <Divider style={{ width: "100%" }}></Divider>

                <Grid.Row>
                  <Button
                    className="MarBot20"
                    type="submit"
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
                    onClick={() => resetClick()}
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
              {/* </LoadingIndicator> */}
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default FilterCustomer;
