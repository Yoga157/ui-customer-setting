import React, { Fragment, useState, useCallback, useEffect } from "react";
import "./AddNewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import {
  Divider,
  Dropdown,
  Form,
  Label,
  Icon,
  Table,
  Button,
  Checkbox,
} from "semantic-ui-react";
import {
  SearchInput,
  DropdownClearInput,
  CheckBox as CheckboxInvoicing,
  RichTextEditor,
} from "views/components/UI";
import * as data from "./data";
import ModalNewInvoicingCondition from "./components/modal/modal-new-invoicing-condition/ModalNewInvoicingCondition";
import ModalNewRelatedCondition from "./components/modal/modal-new-related-customer/ModalNewRelatedCustomer";
import ModalNewRelatedFile from "./components/modal/modal-new-related-file/ModalNewRelatedFile";
import TableNewCustomerSetting from "./components/table/table-new-customer-setting/TableNewCustomerSetting";
import { DeletePopUp } from "./components/delete";

import { selectCustomerSearchOptions } from "selectors/select-options/CustomerNameSelector";
import IStore from "models/IStore";
import * as CustomerName from "stores/customer-name/CustomerNameActivityActions";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import * as CustomerPIC from "stores/customer-pic/CustomerPICActions";
import * as BrandSummary from "stores/brand-summary/BrandSummaryActivityActions";
import * as ServiceSummary from "stores/service-summary/ServiceSummaryActivityActions";
import * as InvoicingSchedule from "stores/invoicing-schedule/InvoicingScheduleActivityActions";
import * as InvoicingCondition from "stores/invoicing-condition/InvoicingConditionActivityActions";
import * as RelatedCustomer from "stores/related-customer/RelatedCustomerActivityActions";
import * as RelatedFile from "stores/related-file/RelatedFileActivityActions";
import * as SalesAssign from "stores/customer-sales-assign/SalesAssignActivityActions";
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelectors";
import { selectCustomerSettingByCustomerId } from "selectors/customer-setting/CustomerSettingSelector";
import { selectBrandSummary } from "selectors/brand-summary/BrandSummarySelector";
import { selectServiceSummary } from "selectors/service-summary/ServiceSummarySelector";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import { selectInvoicingCondition } from "selectors/invoicing-condition/InvoicingConditionSelector";
import { selectRelatedCustomer } from "selectors/related-customer/RelatedCustomerSelector";
import { selectRelatedFile } from "selectors/related-file/RelatedFileSelector";
import { selectEmployeeOptions } from "selectors/select-options";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";

interface IProps {
  history: any;
}

interface CustomerSetting {
  title: string;
  customerGenID: number;
  address: string;
  blacklist?: string;
  holdshipment?: string;
  avgAR?: number;
}

interface CustomerData {
  title: string;
  customerGenID: number;
  address: string;
}

const AddNewCustomerSettingPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  /** Search customer */

  const [customerName, setCustomerName] = useState("");

  /** Customer data */
  const [customerData, setCustomerData] = useState<CustomerData | undefined>(
    undefined
  );

  const customerStoreSearch = useSelector((state: IStore) =>
    selectCustomerSearchOptions(state)
  );

  const handleSearchChangeCustomer = useCallback(
    (data) => {
      setCustomerName(data);
      if (data.length >= 2) {
        dispatch(CustomerName.requestSearchCustomerName(data));
      }
    },
    [dispatch]
  );

  const customerSettingData = useSelector((state: IStore) =>
    selectCustomerSettingByCustomerId(state)
  );

  const onResultSelectCustomer = async (data: any) => {
    setCustomerName(data.result.customerName);

    await dispatch(
      CustomerSetting.requestCustomerSettingByCustomerId(
        data.result.customerGenID
      )
    );
    setCustomerData(data.result);
  };

  const onSubmitCustomerHandler = async (e) => {
    console.log(e);
    console.log(customerStoreSearch);
  };

  const onSubmitCustCategory = async (e) => {
    console.log(e);
  };

  /** Handle dropdown data yang di-get */
  const [openPicList, setOpenPicList] = useState(false);
  const [openBrandSummary, setOpenBrandSummary] = useState(false);
  const [openServiceSummary, setOpenServiceSummary] = useState(false);
  const [openSalesHistory, setOpenSalesHistory] = useState(false);
  const [openProjectHistory, setOpenProjectHistory] = useState(false);
  const [openCollectionHistory, setOpenCollectionHistory] = useState(false);
  const [openConfigItem, setOpenConfigItem] = useState(false);

  const picData = useSelector((state: IStore) => selectCustomerPIC(state));
  const brandSummaryData = useSelector((state: IStore) =>
    selectBrandSummary(state)
  );
  const serviceSummaryData = useSelector((state: IStore) =>
    selectServiceSummary(state)
  );

  /** Search Sales */
  const [salesName, setSalesName] = useState("");
  const salesData = [
    {
      title: "Rosa Amalia",
      salesName: "Rosa Amalia",
      salesID: 1,
    },
    {
      title: "Anjar Whayudi",
      salesName: "Anjar Wahyudi",
      salesID: 2,
    },
    {
      title: "Yoga Zikri Spautra",
      salesName: "Yoga Zikri Saputra",
      salesID: 3,
    },
    {
      title: "Rosa Amalia",
      salesName: "Rosa Amalia",
      salesID: 4,
    },
    {
      title: "Anjar",
      salesName: "Anjar",
      salesID: 5,
    },
    {
      title: "Agoy",
      salesName: "Agoy",
      salesID: 6,
    },
  ];

  const [salesAssign, setSalesAssign] = useState([]);
  // const [salesResult, setSalesResult] = useState(salesData);
  const salesStoreSearch = useSelector((state: IStore) =>
    selectSalesSearchOptions(state)
  );
  console.log(salesStoreSearch);

  const handleSearchChangeSales = useCallback(
    (data) => {
      setSalesName(data);
      if (data.length >= 2) {
        dispatch(SalesAssign.requestSalesByName(data));
      }
    },
    [dispatch]
  );

  const onResultSelectSales = (data: any) => {
    setSalesName("");
    let checkSales = salesAssign.find(
      (obj) => obj.salesID === data.result.salesID
    );

    if (checkSales === undefined) {
      setSalesAssign([
        ...salesAssign,
        {
          salesName: data.result.title,
          salesID: data.result.salesID,
        },
      ]);
    }
  };

  const onSubmitSalesHandler = async (e) => {
    console.log(e);
    console.log(salesName);
  };

  const onDeleteSalesAssign = (salesID) => {
    const arrayFiltered = salesAssign.filter(
      (sales) => sales.salesID !== salesID
    );
    setSalesAssign(arrayFiltered);
  };

  /** Add setting */
  const [shareable, setShareable] = useState("FALSE");
  const [pmoCustomer, setPmoCustomer] = useState("FALSE");

  const handleShareable = () => {
    if (shareable == "FALSE") {
      setShareable("TRUE");
    } else {
      setShareable("FALSE");
    }
  };

  const handlePmoCustomer = () => {
    if (pmoCustomer == "FALSE") {
      setPmoCustomer("TRUE");
    } else {
      setPmoCustomer("FALSE");
    }
  };

  /** Invoicing schedule */
  const days = [
    "All days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const [daysArray, setDaysArray] = useState([]);
  const [isAllDaysChecked, setIsAllDaysChecked] = useState(false);

  const checkDay = (day) => {
    if (day == "All days") {
      if (
        daysArray.includes("Monday") &&
        daysArray.includes("Tuesday") &&
        daysArray.includes("Wednesday") &&
        daysArray.includes("Thursday") &&
        daysArray.includes("Friday")
      ) {
        setIsAllDaysChecked(false);
        setDaysArray([]);
      } else {
        setDaysArray(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
        setIsAllDaysChecked(true);
      }
    } else {
      const isDaySelected = daysArray.includes(day);

      if (isDaySelected) {
        setDaysArray(daysArray.filter((selectedDay) => selectedDay !== day));
      } else {
        setDaysArray([...daysArray, day]);
      }
    }

    console.log(daysArray);
  };

  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [remark, setRemark] = useState("");

  const onSubmitCustomerSettingHandler = async (values) => {
    console.log(values);

    /** post invoicing schedule */
    let remark = values.remark;

    const NewInvoicingSchedule = new InvoicingScheduleModel({});
    NewInvoicingSchedule.scheduleID = 0;
    NewInvoicingSchedule.customerSettingID =
      customerSettingData.customerSettingID;
    NewInvoicingSchedule.scheduleDays = daysArray.join(", ");
    NewInvoicingSchedule.remark = remark;
    NewInvoicingSchedule.minDate = minDate;
    NewInvoicingSchedule.maxDate = maxDate;
    NewInvoicingSchedule.createUserID = 0;
    NewInvoicingSchedule.modifyUserID = 0;

    dispatch(InvoicingSchedule.postInvoicingSchedule(NewInvoicingSchedule));

    /** put customer setting */
  };

  /** Project Type */
  const [projectType, setProjectType] = useState("");
  const projectTypeData = [
    {
      text: "Manage Operation",
      value: "Manage Operation",
    },
    {
      text: "Manage Service",
      value: "Manage Service",
    },
    {
      text: "Project Type",
      value: "Project Type",
    },
  ];

  const onChangeProjectType = (data: any): any => {
    console.log(data);
    setProjectType(data);
  };

  const onSubmitData = (data) => {};

  /** Invoicing requirement */
  const onAddInvoicingCondition = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewInvoicingCondition
          customerSettingID={customerSettingData.customerSettingID}
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, customerSettingData]);

  const invoicingConditionData = useSelector((state: IStore) =>
    selectInvoicingCondition(state)
  );

  const deleteInvoicingCondition = useCallback(
    (id: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={InvoicingCondition.deleteInvoicingCondition}
            refreshFunc={InvoicingCondition.requestInvoicingCondition}
            id={id}
            customerSettingID={customerSettingData.customerSettingID}
            content="invoicing condition"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch, customerSettingData]
  );

  /** Related customer */
  const onAddRelatedCustomer = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedCondition
          customerSettingID={customerSettingData.customerSettingID}
        />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch, customerSettingData]);

  const relatedCustomerData = useSelector((state: IStore) =>
    selectRelatedCustomer(state)
  );

  const deleteRelatedCustomer = useCallback(
    (id: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedCustomer.deleteRelatedCustomer}
            refreshFunc={RelatedCustomer.requestRelatedCustomer}
            id={id}
            customerSettingID={customerSettingData.customerSettingID}
            content="related customer"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch, customerSettingData]
  );

  /** RelatedFile */
  const onAddRelatedFile = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedFile
          customerSettingID={customerSettingData.customerSettingID}
        />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, customerSettingData]);

  const relatedFileData = useSelector((state: IStore) =>
    selectRelatedFile(state)
  );

  const deleteRelatedFile = useCallback(
    (id: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedFile.deleteRelatedFile}
            refreshFunc={RelatedFile.requestRelatedFile}
            id={id}
            customerSettingID={customerSettingData.customerSettingID}
            content="related file"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch, customerSettingData]
  );

  /** data yang perlu di get */
  useEffect(() => {
    if (!Number.isNaN(customerSettingData.customerSettingID)) {
      dispatch(
        CustomerPIC.requestGetCustomerPIC(customerSettingData.customerSettingID)
      );
      dispatch(
        BrandSummary.requestBrandSummary(customerSettingData.customerSettingID)
      );
      dispatch(
        ServiceSummary.requestServiceSummary(
          customerSettingData.customerSettingID
        )
      );
      dispatch(
        InvoicingCondition.requestInvoicingCondition(
          customerSettingData.customerSettingID
        )
      );
      dispatch(
        RelatedCustomer.requestRelatedCustomer(
          customerSettingData.customerSettingID
        )
      );
      dispatch(
        RelatedFile.requestRelatedFile(customerSettingData.customerSettingID)
      );
    }
  }, [dispatch, customerSettingData]);

  return (
    <Fragment>
      <Link
        to="/customer-setting"
        style={{ fontSize: "1.25rem", color: "grey", fontWeight: "bold" }}
      >
        {"< Back to Customer Setting List"}
      </Link>

      <div className="form-container">
        {/* judul add new customer setting */}
        <p
          style={{
            textAlign: "left",
            margin: "0",
            fontWeight: "bold",
            padding: "14px 2rem 0 2rem",
          }}
          className="grey"
        >
          ADD NEW CUSTOMER SETTING
        </p>

        <Divider></Divider>

        {/* search customer name dan data customer */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          className="padding-horizontal"
        >
          <div>
            <FinalForm
              onSubmit={(values: any) => onSubmitCustomerHandler(values)}
              render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="customerName"
                    component={SearchInput}
                    placeholder="Type customer name here.."
                    labelName="Customer Name"
                    handleSearchChange={handleSearchChangeCustomer}
                    onResultSelect={onResultSelectCustomer}
                    results={customerStoreSearch}
                    values={customerName}
                    mandatory={true}
                  />
                </Form>
              )}
            />
            <p
              style={{
                fontStyle: "italic",
                color: "#A9B0BC",
                marginTop: "0",
                fontSize: "12px",
              }}
            >
              Type customer name and press ENTER
            </p>
          </div>

          {customerData != undefined &&
            !Number.isNaN(customerSettingData.customerSettingID) &&
            picData.length != 0 && (
              <>
                <div>
                  <FinalForm
                    onSubmit={(values: any) => onSubmitCustCategory(values)}
                    render={({ handleSubmit, pristine, invalid }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          name="customerCategoryName"
                          component={DropdownClearInput}
                          // placeholder="Type customer name here.."
                          labelName="Cust. Category Name"
                          // handleSearchChange={handleSearchChangeCustomer}
                          // onResultSelect={onResultSelectCustomer}
                          // results={customerResult}
                          values={customerName}
                          mandatory={true}
                        />
                      </Form>
                    )}
                  />
                </div>

                <div className="customer-data-container">
                  <label className="customer-data-label">CustomerID</label>
                  <p
                    style={{ fontSize: "24px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customerData.customerGenID}
                  </p>
                </div>

                <div className="customer-data-container">
                  <label className="customer-data-label">Blacklist</label>
                  <Label
                    color={customerSettingData.blacklist ? "red" : "teal"}
                    style={{ borderRadius: "20px", width: "fit-content" }}
                  >
                    <Icon name="address book" />
                    {customerSettingData.blacklist ? "Yes" : "No"}
                  </Label>
                </div>

                <div className="customer-data-container">
                  <label className="customer-data-label">Holdshipment</label>
                  <Label
                    color={customerSettingData.holdshipment ? "red" : "blue"}
                    style={{ borderRadius: "20px", width: "fit-content" }}
                  >
                    <Icon name="truck" />
                    {customerSettingData.holdshipment ? "Yes" : "No"}
                  </Label>
                </div>

                <div className="customer-data-container">
                  <label className="customer-data-label">Avg. AR (days)</label>
                  <p
                    style={{ fontSize: "24px", fontWeight: "bold" }}
                    className="grey"
                  >
                    {customerSettingData.avgAR}
                  </p>
                </div>
              </>
            )}
        </div>

        {customerData != undefined &&
        !Number.isNaN(customerSettingData.customerSettingID) &&
        picData.length != 0 ? (
          <>
            <div style={{ margin: "14px 0" }} className="padding-horizontal">
              <label
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  color: "#A0A8B3",
                }}
              >
                Address
              </label>
              <p style={{ fontSize: "20px" }} className="grey">
                {customerData?.address}
              </p>
            </div>

            {/* data get mengenai customer */}
            <div className="padding-horizontal">
              <div
                style={{ backgroundColor: "#FFFB9A", borderRadius: "1rem" }}
                className="grey"
              >
                <div
                  className="accordion-container"
                  onClick={() => setOpenPicList(!openPicList)}
                >
                  <span style={{ fontWeight: "bold" }}>CUSTOMER PIC LIST</span>
                  {openPicList ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openPicList && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={picData}
                        header={data.picHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenBrandSummary(!openBrandSummary)}
                >
                  <span style={{ fontWeight: "bold" }}>BRAND SUMMARY</span>
                  {openBrandSummary ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openBrandSummary && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={brandSummaryData}
                        header={data.brandHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenServiceSummary(!openServiceSummary)}
                >
                  <span style={{ fontWeight: "bold" }}>SERVICE SUMMARY</span>
                  {openServiceSummary ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openServiceSummary && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={serviceSummaryData}
                        header={data.serviceHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenSalesHistory(!openSalesHistory)}
                >
                  <span style={{ fontWeight: "bold" }}>
                    SALES ASSIGN HISTORY
                  </span>
                  {openSalesHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openSalesHistory && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={data.salesHistoryData}
                        header={data.salesHistoryHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenProjectHistory(!openProjectHistory)}
                >
                  <span style={{ fontWeight: "bold" }}>
                    PROJECT CUSTOMER HISTORY
                  </span>
                  {openProjectHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openProjectHistory && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={data.projectHistoryData}
                        header={data.projectHistoryHeader}
                        sequenceNum={false}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() =>
                    setOpenCollectionHistory(!openCollectionHistory)
                  }
                >
                  <span style={{ fontWeight: "bold" }}>COLLECTION HISTORY</span>
                  {openCollectionHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider style={{ margin: "0px" }}></Divider>

                {openCollectionHistory && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={data.collectionHistoryData}
                        header={data.collectionHistoryHeader}
                        sequenceNum={false}
                      />
                    </div>
                    <Divider style={{ margin: "0px" }}></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenConfigItem(!openConfigItem)}
                >
                  <span style={{ fontWeight: "bold" }}>CONFIG ITEM</span>
                  {openConfigItem ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>

                {openConfigItem && (
                  <>
                    <Divider style={{ margin: "0px" }}></Divider>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={data.configItemData}
                        header={data.configItemHeader}
                        sequenceNum={false}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <Divider></Divider>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 2rem",
              }}
            >
              <div className="sales-assign-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <FinalForm
                    onSubmit={(values: any) => onSubmitSalesHandler(values)}
                    render={({ handleSubmit, pristine, invalid }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          name="salesName"
                          component={SearchInput}
                          placeholder="Search sales name here.."
                          labelName="Search sales to assign"
                          handleSearchChange={handleSearchChangeSales}
                          onResultSelect={onResultSelectSales}
                          results={salesStoreSearch}
                          values={salesName}
                          mandatory={true}
                        />
                      </Form>
                    )}
                  />
                  <Button
                    color="blue"
                    content="Assign Me"
                    style={{ height: "fit-content", marginLeft: "2rem" }}
                  />
                </div>

                <div className="setting-position">
                  <Divider style={{ margin: "0px" }} />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <p style={{ margin: 0 }}>Shareable customer</p>
                    <div>
                      <span>OFF</span>
                      <Checkbox
                        toggle
                        checked={shareable == "TRUE" ? true : false}
                        onChange={() => handleShareable()}
                        style={{ margin: "0 0.5rem" }}
                      ></Checkbox>
                      <span>ON</span>
                    </div>
                  </div>

                  <Divider style={{ margin: "0px" }} />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <p style={{ margin: 0 }}>PMO customer</p>
                    <div>
                      <span>OFF</span>
                      <Checkbox
                        toggle
                        checked={pmoCustomer == "TRUE" ? true : false}
                        onChange={() => handlePmoCustomer()}
                        style={{ margin: "0 0.5rem" }}
                      ></Checkbox>
                      <span>ON</span>
                    </div>
                  </div>

                  <Divider style={{ margin: "0px" }} />
                </div>
              </div>

              <div className="sales-assign-list">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {salesAssign.map((data) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "fit-content",
                          margin: "0 0.5rem 0.5rem 0",
                        }}
                        key={data.salesID}
                      >
                        <div
                          style={{
                            backgroundColor: "#DCDCDC",
                            borderRadius: "2rem 0 0 2rem",
                            padding: "0.5rem 0.75rem",
                          }}
                        >
                          {data.salesName}
                        </div>
                        <div
                          style={{
                            backgroundColor: "#C8C8C8",
                            borderRadius: "0 2rem 2rem 0",
                            padding: "0.5rem",
                          }}
                          onClick={() => onDeleteSalesAssign(data.salesID)}
                        >
                          <Icon name="close" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div></div>
            </div>

            <Divider></Divider>

            <p
              style={{ textAlign: "left", margin: "0", fontWeight: "bold" }}
              className="padding-horizontal grey"
            >
              INVOICING SCHEDULE SETTING
            </p>

            <Divider></Divider>

            <FinalForm
              onSubmit={(values: any) => onSubmitCustomerSettingHandler(values)}
              render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                  <div style={{ padding: "0 2rem" }}>
                    <div>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <label style={{ marginRight: "10px" }}>
                          Days
                          <label style={{ color: "red" }} className="mandatory">
                            {" "}
                            *
                          </label>
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {days.map((day) => {
                          return (
                            <CheckboxInvoicing
                              label={day}
                              value={day}
                              disabled={isAllDaysChecked && day !== "All days"}
                              style={{ marginRight: "1rem" }}
                              onClick={() => checkDay(day)}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: "14px",
                      }}
                      className="invoicing-schedule-position"
                    >
                      <div
                        style={{
                          backgroundColor: "#DCDCDC",
                          display: "flex",
                          flexDirection: "column",
                          width: "fit-content",
                          height: "fit-content",
                          padding: "1rem",
                          borderRadius: "1rem",
                          marginRight: "1rem",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }} className="grey">
                          Invoicing Date Range{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "7rem",
                              marginRight: "1rem",
                            }}
                          >
                            <label htmlFor="minDate">Min. Date(Day)</label>
                            <input
                              name="minDate"
                              type="number"
                              value={minDate}
                              onChange={(e) =>
                                setMinDate(parseInt(e.target.value, 10))
                              }
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "7rem",
                            }}
                          >
                            <label htmlFor="maxDate">Max. Date(Day)</label>
                            <input
                              name="maxDate"
                              type="number"
                              value={maxDate}
                              onChange={(e) =>
                                setMaxDate(parseInt(e.target.value, 10))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "100%" }}>
                        <Field
                          name="remark"
                          component={RichTextEditor}
                          placeholder="e.g. Remark"
                          labelName="Remark"
                        />
                      </div>
                    </div>
                  </div>

                  <Divider></Divider>

                  <p
                    style={{
                      textAlign: "left",
                      margin: "0",
                      fontWeight: "bold",
                    }}
                    className="padding-horizontal grey"
                  >
                    INVOICING CONDITION
                  </p>

                  <Divider></Divider>

                  <div style={{ padding: "0 2rem" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ width: "30%" }}>
                        {/* <FinalForm
                                                    onSubmit={(values: any) => onSubmitProjectType(values)}
                                                    render={({ handleSubmit, pristine, invalid }) => (
                                                    <Form onSubmit={handleSubmit}> */}
                        <Field
                          name="projectType"
                          component={DropdownClearInput}
                          placeholder="Select project type"
                          labelName="Project Type"
                          options={projectTypeData}
                          values={projectType}
                          onChanged={onChangeProjectType}
                          mandatory={true}
                        />
                        {/* </Form>
                                                )}/> */}
                      </div>

                      <Button
                        color="yellow"
                        size="small"
                        onClick={onAddInvoicingCondition}
                      >
                        <Icon name="add" />
                        Add Invoicing Condition
                      </Button>
                    </div>

                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>No</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                          <Table.HeaderCell>Project Type</Table.HeaderCell>
                          <Table.HeaderCell>
                            Document Requirement
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {invoicingConditionData.length == 0 ? (
                          <Table.Row>
                            <Table.Cell colSpan={16} textAlign="center">
                              No data
                            </Table.Cell>
                          </Table.Row>
                        ) : (
                          invoicingConditionData.map((data, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#F97452",
                                    padding: "0.5rem",
                                    borderRadius: "100%",
                                    width: "fit-content",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteInvoicingCondition(data.conditionID)
                                  }
                                >
                                  <Icon
                                    style={{
                                      margin: "0",
                                      padding: "0",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      color: "white",
                                    }}
                                    name="trash alternate"
                                  />
                                </div>
                              </Table.Cell>
                              <Table.Cell>{data.projectType}</Table.Cell>
                              <Table.Cell>{data.conditionName}</Table.Cell>
                            </Table.Row>
                          ))
                        )}
                      </Table.Body>
                    </Table>
                  </div>

                  <Divider></Divider>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    className="padding-horizontal"
                  >
                    <p
                      style={{
                        textAlign: "left",
                        margin: "0",
                        fontWeight: "bold",
                      }}
                      className="grey"
                    >
                      RELATED CUSTOMER
                    </p>
                    <Button
                      color="yellow"
                      size="small"
                      onClick={onAddRelatedCustomer}
                    >
                      <Icon name="add" />
                      Add Related Customer
                    </Button>
                  </div>

                  <Divider></Divider>

                  <div style={{ padding: "0 2rem" }}>
                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>No</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                          <Table.HeaderCell>Customer Name</Table.HeaderCell>
                          <Table.HeaderCell>Address</Table.HeaderCell>
                          <Table.HeaderCell>Cust. Category</Table.HeaderCell>
                          <Table.HeaderCell>Avg. AR (Days)</Table.HeaderCell>
                          <Table.HeaderCell>Blacklist</Table.HeaderCell>
                          <Table.HeaderCell>Holdshipment</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {relatedCustomerData.length == 0 ? (
                          <Table.Row>
                            <Table.Cell colSpan={16} textAlign="center">
                              No data
                            </Table.Cell>
                          </Table.Row>
                        ) : (
                          relatedCustomerData.map((data, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#F97452",
                                    padding: "0.5rem",
                                    borderRadius: "100%",
                                    width: "fit-content",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteRelatedCustomer(data.relatedID)
                                  }
                                >
                                  <Icon
                                    style={{
                                      margin: "0",
                                      padding: "0",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      color: "white",
                                    }}
                                    name="trash alternate"
                                  />
                                </div>
                              </Table.Cell>
                              <Table.Cell>{data.customerName}</Table.Cell>
                              <Table.Cell>{data.address}</Table.Cell>
                              <Table.Cell>Category</Table.Cell>
                              <Table.Cell>{data.avgAR}</Table.Cell>
                              <Table.Cell>
                                <Label
                                  color={data.blacklist ? "red" : "teal"}
                                  style={{
                                    borderRadius: "20px",
                                    width: "fit-content",
                                  }}
                                >
                                  <Icon name="address book" />
                                  {data.blacklist ? "Yes" : "No"}
                                </Label>
                              </Table.Cell>
                              <Table.Cell>
                                <Label
                                  color={data.holdshipment ? "red" : "blue"}
                                  style={{
                                    borderRadius: "20px",
                                    width: "fit-content",
                                  }}
                                >
                                  <Icon name="truck" />
                                  {data.holdshipment ? "Yes" : "No"}
                                </Label>
                              </Table.Cell>
                            </Table.Row>
                          ))
                        )}
                      </Table.Body>
                    </Table>
                  </div>

                  <Divider></Divider>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    className="padding-horizontal"
                  >
                    <p
                      style={{
                        textAlign: "left",
                        margin: "0",
                        fontWeight: "bold",
                      }}
                      className="grey"
                    >
                      UPLOAD RELATED FILE
                    </p>
                    <Button
                      color="yellow"
                      size="small"
                      onClick={onAddRelatedFile}
                    >
                      <Icon name="add" />
                      Add Related File
                    </Button>
                  </div>

                  <Divider></Divider>

                  <div style={{ padding: "0 2rem" }}>
                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>No</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                          <Table.HeaderCell>Document Name</Table.HeaderCell>
                          <Table.HeaderCell>Type</Table.HeaderCell>
                          <Table.HeaderCell>Upload Date</Table.HeaderCell>
                          <Table.HeaderCell>Upload By</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {relatedFileData.length == 0 ? (
                          <Table.Row>
                            <Table.Cell colSpan={16} textAlign="center">
                              No data
                            </Table.Cell>
                          </Table.Row>
                        ) : (
                          relatedFileData.map((data, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#F97452",
                                    padding: "0.5rem",
                                    borderRadius: "100%",
                                    width: "fit-content",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteRelatedFile(data.relatedFileID)
                                  }
                                >
                                  <Icon
                                    style={{
                                      margin: "0",
                                      padding: "0",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      color: "white",
                                    }}
                                    name="trash alternate"
                                  />
                                </div>
                              </Table.Cell>
                              <Table.Cell>{data.documentName}</Table.Cell>
                              <Table.Cell>{data.documentType}</Table.Cell>
                              <Table.Cell>{data.uploadDate}</Table.Cell>
                              <Table.Cell>{data.uploadBy}</Table.Cell>
                            </Table.Row>
                          ))
                        )}
                      </Table.Body>
                    </Table>
                  </div>

                  <Divider style={{ marginBottom: "0px" }}></Divider>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      margin: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "fit-content",
                      }}
                    >
                      <Button color="grey" style={{ marginRight: "1rem" }}>
                        Cancel
                      </Button>
                      <Button color="blue" type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            />
          </>
        ) : (
          <>
            <Divider style={{ marginBottom: "0px" }}></Divider>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                margin: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "fit-content",
                }}
              >
                <Button color="grey" style={{ marginRight: "1rem" }}>
                  Cancel
                </Button>
                <Button color="blue" disabled>
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default AddNewCustomerSettingPage;
