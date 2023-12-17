import React, { Fragment, useState, useEffect } from "react";
import { SelectInput, Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Grid, Checkbox, Card, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import CustomerSettingID from "stores/customer-setting/models/CustomerSettingById";
import { format } from "date-fns";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";

interface IProps {
  rowData: any;
}

const AdjSetting: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [shareableChecked, setSharebleChecked] = useState("FALSE");
  const [pmo_customerChecked, setpmo_customerChecked] = useState("FALSE");
  const result = useSelector(
    (state: IStore) => state.customerSetting.resultActions
  );
  const { rowData } = props;
  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };
  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [])
  );

  useEffect(() => {
    if (result.message == "Update Success!") {
      dispatch(ToastsAction.add(result.message, ToastStatusEnum.Success));
    }
  }, [result.message]);

  const handleShareable = () => {
    if (shareableChecked == "FALSE") {
      setSharebleChecked("TRUE");
    } else {
      setSharebleChecked("FALSE");
    }
  };

  const handlepmocustomer = () => {
    if (pmo_customerChecked == "FALSE") {
      setpmo_customerChecked("TRUE");
    } else {
      setpmo_customerChecked("FALSE");
    }
  };

  const onSubmitHandler = async () => {
    const userId: any = localStorage.getItem("userLogin");
    const date = new Date();

    for (let j = 0; j < rowData.length; j++) {
      const CustomerSetting = new CustomerSettingID({});
      CustomerSetting.customerSettingID = props.rowData[j].customerSettingID;
      CustomerSetting.customerID = props.rowData[j].customerID;
      CustomerSetting.customerCategoryID = "";
      CustomerSetting.shareable = shareableChecked == "TRUE" ? true : false;
      CustomerSetting.pmoCustomer =
        pmo_customerChecked == "TRUE" ? true : false;
      CustomerSetting.createDate = format(
        new Date(props.rowData[j].createDate),
        "yyyy-MM-dd"
      );
      CustomerSetting.createUserID = props.rowData[j].createUserID;
      CustomerSetting.modifyDate = date;
      CustomerSetting.modifyUserID = JSON.parse(userId).employeeID;

      await dispatch(
        CustomerSettingAct.putCustomerSet(
          CustomerSetting,
          props.rowData[j].customerSettingID
        )
      );
    }
    dispatch(ModalAction.CLOSE());
    await dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
    dispatch(CustomerSettingAct.clearResult());
  };

  return (
    <Fragment>
      <Card.Header>
        <h4>
          {rowData.length == 1 ? "ADJUST SETTING" : "MULTIPLE ADJUST SETTING"}
        </h4>
      </Card.Header>
      <Divider></Divider>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={() => onSubmitHandler()}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                {rowData.map((data) => {
                  return (
                    <>
                      <Grid.Row
                        width={1}
                        className="padding-0"
                        key={data.customerGenID}
                      >
                        <Grid.Column>
                          <h2>{data.customerName}</h2>
                        </Grid.Column>
                      </Grid.Row>
                      <div className="flex-row-container">
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
                            {data.pmoCustomer && (
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
                      name="Customer Category"
                      component={SelectInput}
                      placeholder="Enterprise"
                      thousandSeparator={true}
                      labelName="Cust.Category"
                      mandatory={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Divider></Divider>
                <Grid.Row>
                  <div className="flex-adjust-setting ">
                    <p className="margin-0">Shareable customer</p>
                    <div>
                      <span>OFF</span>
                      <Checkbox
                        toggle
                        className="marginmix"
                        checked={shareableChecked == "TRUE" ? true : false}
                        onChange={() => handleShareable()}
                      ></Checkbox>
                      <span>ON</span>
                    </div>
                  </div>
                </Grid.Row>
                <Divider></Divider>
                <Grid.Row>
                  <div className="flex-adjust-setting">
                    <p className="margin-0">PMO customer</p>
                    <div>
                      <span>OFF</span>
                      <Checkbox
                        toggle
                        style={{ margin: "-6px 0.5rem" }}
                        checked={pmo_customerChecked == "TRUE" ? true : false}
                        onChange={() => handlepmocustomer()}
                      />
                      <span>ON</span>
                    </div>
                  </div>
                </Grid.Row>
              </div>
              <Divider></Divider>
              <div style={{ textAlign: "center" }}>
                <Button type="button" onClick={cancelClick}>
                  Cancel
                </Button>
                <Button className="MarBot10" type="submit" color="blue">
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

export default AdjSetting;
