import React, { useEffect, Fragment, useState, useCallback } from "react";
import {
  SelectInput,
  TextInput,
  Button,
  SearchInput,
  RichTextEditor,
  Tooltips,
  DateInput,
  LabelImage,
} from "views/components/UI";
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
import { selectUserResult } from "selectors/user/UserSelector";

import { selectDirektorat } from "selectors/funnel-opportunity/FunnelOpportunitySelector";
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";

import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";
import { format } from "date-fns";
import IOptionsData from "selectors/select-options/models/IOptionsData";
import environtment from "environment";
import axios from "axios";
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";

interface IProps {
  // customerSettingID: number;
  // customerName: string;
  // type: string;
  rowData: any;
}

const AddSalesAssign: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [customerName, setCustomerName] = useState(props.rowData.customerName);
  const [salesName, setSalesName] = useState("");
  const [salesId, setSalesId] = useState(0);
  const [shareable, setshareable] = useState(false);
  const [pmoCustomer, setpmoCustomer] = useState(false);
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

    console.log(rowData);
    console.log(salesAssignArray);

    for (let j = 0; j < rowData.lenght; j++) {
      console.log(`rowData id ${rowData[j].customerSettingID}`);
      for (let i = 0; i < salesAssignArray.length; i++) {
        const NewAssignSales = new SalesAssignPostModel(e);
        NewAssignSales.assignID = 0;
        NewAssignSales.SalesID = salesAssignArray[i].salesID;
        NewAssignSales.CustomerSettingID = rowData[j].customerSettingID;
        NewAssignSales.AssignedBy = 0;
        NewAssignSales.createUserID = 0;
        NewAssignSales.modifyUserID = 0;

        dispatch(SalesAssign.postAssignedSales(NewAssignSales));
        console.log(
          `rowData id ${rowData[j].customerSettingID} dan sales ID ${salesAssignArray[i].salesID}`
        );
      }
    }

    dispatch(ModalAction.CLOSE());
    dispatch(
      CustomerSettingAct.requestCustomerSett(1, 10, "CustomerSettingID")
    );
  };

  const deleteClick = (salesID) => {
    let filteredArray = salesAssignArray.filter(
      (obj) => obj.salesID !== salesID
    );
    setSalesAssignArray(filteredArray);
  };

  const onResultSelectSales = (data: any) => {
    setSalesName(" ");

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
      <LoadingIndicator isActive={isRequesting}>
        <FinalForm
          validate={validate}
          onSubmit={(values: any) => onSubmitHandler(values)}
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
