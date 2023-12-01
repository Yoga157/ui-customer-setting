import React, { Fragment, useEffect, useState, useCallback } from "react";
import { isRequired } from "revalidate";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Divider, Grid, Form, Select } from "semantic-ui-react";
import { Button, SelectInput } from "views/components/UI";
import { Form as FinalForm, Field } from "react-final-form";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";

interface IProps {
  rowData: any;
}

const FilterCustomer: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
}> = ({ setOpenFilter, openFilter }) => {
  const [salesName, setSalesName] = useState("");
  const [salesAssignArray, setSalesAssignArray] = useState([]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  const onSubmitHandler = async (e) => {
    const userId: any = localStorage.getItem("userLogin");
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

  const resetClick = () => {};

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
          // color: "#fff",
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
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
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
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                      {/* <Grid.Column widht={2}>
                        <div>
                          <label>
                            <input type="checkbox"></input>
                            <span>Yes</span>
                          </label>
                        </div>
                      </Grid.Column>
                      <Grid.Column widht={2}>
                        <div>
                          <label>
                            <input type="checkbox"></input>
                            <span>No</span>
                          </label>
                        </div>
                      </Grid.Column> */}
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
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
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
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
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
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
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
                              type="checkbox"
                              style={{
                                marginRight: "0.5rem",
                                transform: "scale(1)",
                              }}
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
                            ></input>
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid.Row>
                  <Divider></Divider>
                  <br />
                  <br />
                  <Divider></Divider>
                  <div style={{ textAlign: "center" }}>
                    <Grid.Row>
                      <Button
                        className="MarBot20"
                        type="submit"
                        color="blue"
                        style={{ width: "200px" }}
                      >
                        Apply Filter
                      </Button>
                    </Grid.Row>
                    <Grid.Row>
                      <Button
                        type="button"
                        onClick={resetClick}
                        style={{ width: "200px" }}
                      >
                        Cancel
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
