import React, { Fragment } from "react";
import { Button } from "views/components/UI";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import IStore from "models/IStore";
import { Form as FinalForm } from "react-final-form";
import { Form, Grid, Divider } from "semantic-ui-react";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  rowData: any;
}

const AddSalesAssign: React.FC<IProps> = (
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

  const deleteClick = () => {
    console.log(rowData);
    for (let i = 0; i < rowData.length; i++) {
      dispatch(
        CustomerSettingAct.deleteCustomerSett(rowData[i].customerSettingID)
      );
    }
    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
  };

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          onSubmit={deleteClick}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid.Row>
                {rowData.length == 1}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="ui segment" style={{ padding: "0px" }}>
                    <img
                      className="ui centered medium"
                      src="/assets/info.png"
                      sizes="small"
                    />
                  </div>
                </div>
              </Grid.Row>
              <Grid.Row>
                {rowData.map((data) => {
                  return (
                    <div>
                      <Grid.Row
                        centered
                        width={1}
                        style={{ padding: "0px" }}
                        key={data.customerGenID}
                      >
                        <Grid.Column>
                          <h2 style={{ textAlign: "center" }}>
                            {data.customerName}
                          </h2>
                        </Grid.Column>
                      </Grid.Row>
                    </div>
                  );
                })}
              </Grid.Row>
              <Grid.Row centered style={{ textAlign: "center" }}>
                <span style={{ padding: "10px" }}>
                  Are you sure you want to DELETE this customer setting?
                </span>
              </Grid.Row>
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

export default AddSalesAssign;
