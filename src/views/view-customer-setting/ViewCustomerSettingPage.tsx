import React, { Fragment, useState, useCallback, useEffect } from "react";
import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form as FinalForm, Field } from "react-final-form";
import { Link, useParams } from "react-router-dom";
import {
  Divider,
  Dropdown,
  Form,
  Label,
  Icon,
  Table,
  Button,
  Checkbox,
  Input,
} from "semantic-ui-react";
import {
  SearchInput,
  DropdownClearInput,
  CheckBox as CheckboxInvoicing,
  RichTextEditor,
  Pagination,
} from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as data from "./data";

import ModalNewInvoicingCondition from "./components/modal/modal-new-invoicing-condition/ModalNewInvoicingCondition";
import ModalNewRelatedCondition from "./components/modal/modal-new-related-customer/ModalNewRelatedCustomer";
import ModalNewRelatedFile from "./components/modal/modal-new-related-file/ModalNewRelatedFile";
import TableNewCustomerSetting from "./components/table/table-new-customer-setting/TableNewCustomerSetting";
import { DeletePopUp } from "./components/delete";

import {
  selectCustomerById,
  selectCustomerSearchOptions,
} from "selectors/select-options/CustomerNameSelector";
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
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions";
import * as ConfigItem from "stores/config-item/ConfigItemActivityActions";
import * as CollectionHistory from "stores/collection-history/CollectionHistoryActivityActions";
import * as ProjectHistory from "stores/project-history/ProjectHistoryActivityActions";
import * as ToastsAction from "stores/toasts/ToastsAction";
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelectors";
import { selectCustomerSettingByCustomerId } from "selectors/customer-setting/CustomerSettingSelector";
import { selectBrandSummary } from "selectors/brand-summary/BrandSummarySelector";
import { selectServiceSummary } from "selectors/service-summary/ServiceSummarySelector";
import { selectInvoicingCondition } from "selectors/invoicing-condition/InvoicingConditionSelector";
import { selectRelatedCustomer } from "selectors/related-customer/RelatedCustomerSelector";
import { selectRelatedFile } from "selectors/related-file/RelatedFileSelector";
import {
  selectSalesHistory,
  selectSalesSearchOptions,
} from "selectors/select-options/SalesAssignSelector";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { selectConfigItem } from "selectors/config-item/ConfigItemSelector";
import { selectCollectionHistory } from "selectors/collection-history/CollectionHistorySelector";
import { selectInvoicingSchedule } from "selectors/invoicing-schedule/InvoicingScheduleSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectProjectHistory } from "selectors/project-history/ProjectHistorySelector";
import TableProjectHistory from "./components/table/table-project-history/TableProjectHistory";
import TableCollectionHistory from "./components/table/table-collection-history/TableCollectionHistory";

interface IProps {
  history: any;
}

interface routeParams {
  id: string;
}

const ViewCustomerSettingPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams<routeParams>();

  /** Customer data */
  const customerData = useSelector((state: IStore) =>
    selectCustomerById(state)
  );
  const customerSettingData = useSelector((state: IStore) =>
    selectCustomerSettingByCustomerId(state)
  );

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
  const configItemData = useSelector((state: IStore) =>
    selectConfigItem(state)
  );
  const collectionHistoryData = useSelector((state: IStore) =>
    selectCollectionHistory(state)
  );
  const projectHistoryData = useSelector((state: IStore) =>
    selectProjectHistory(state)
  );

  /** Project History */
  const [allHistoryData, setAllHistoryData] = useState(data.projectHistoryData);
  const [historyPageSize, setHistoryPageSize] = useState(3);
  const [historyActivePage, setHistoryActivePage] = useState(1);
  const [historyData, setHistoryData] = useState(
    allHistoryData.slice(0, historyPageSize)
  );

  // fungsi mengatur perubahan halaman
  const historyChangePage = (e, page) => {
    const startIndex = (page.activePage - 1) * historyPageSize;
    const endIndex = startIndex + historyPageSize;
    const paginatedData = allHistoryData.slice(startIndex, endIndex);

    setHistoryData(paginatedData);
    setHistoryActivePage(page.activePage);
  };

  const [searchText, setSearchText] = useState("");
  const [cancelBtn, setCancelBtn] = useState(false);

  const onChangeSearch = (event: any, data: any) => {
    // console.log(data)
    setSearchText(data.value);
    if (data.value == "") {
      setCancelBtn(false);
    } else {
      setCancelBtn(true);
    }
  };

  // fungsi untuk mengatur pencarian
  const onSearch = () => {
    if (searchText.length === 0) {
      setAllHistoryData(data.projectHistoryData);
      setSearchText("");
      setCancelBtn(false);
    } else {
      if (searchText.length > 1) {
        setCancelBtn(true);
        const lowerKeyword = searchText.toLowerCase();

        const filteredArray = data.projectHistoryData.filter((item) =>
          Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(lowerKeyword)
          )
        );

        setAllHistoryData(filteredArray);
      }
    }
  };

  useEffect(() => {
    setHistoryData(allHistoryData.slice(0, historyPageSize));
    setHistoryActivePage(1);
  }, [allHistoryData]);

  const onClickedCancelButton = () => {
    setAllHistoryData(data.projectHistoryData);
    setSearchText("");
    setCancelBtn(false);
  };

  /** Search Sales */
  const salesHistoryData = useSelector((state: IStore) =>
    selectSalesHistory(state)
  );

  const deleteSalesAssign = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={SalesAssign.deleteSalesAssign}
            refreshFunc={SalesAssign.requestSalesHistory}
            id={idToDel}
            customerSettingID={Number(id)}
            content="sales"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  const [salesName, setSalesName] = useState("");
  const [salesAssign, setSalesAssign] = useState([]);
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
  const [shareable, setShareable] = useState(
    customerSettingData.shareable ? "TRUE" : "FALSE"
  );
  const [pmoCustomer, setPmoCustomer] = useState(
    customerSettingData.pmoCustomer ? "TRUE" : "FALSE"
  );

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
  const invoicingSchedule = useSelector((state: IStore) =>
    selectInvoicingSchedule(state)
  );
  console.log(invoicingSchedule);

  const days = [
    "All days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const [daysArray, setDaysArray] = useState(
    invoicingSchedule.scheduleDays?.split(", ") || []
  );
  const [isAllDaysChecked, setIsAllDaysChecked] = useState(
    invoicingSchedule.scheduleDays ===
      "Monday, Tuesday, Wednesday, Thursday, Friday" || false
  );

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
  };

  const [minDate, setMinDate] = useState(invoicingSchedule.minDate || 0);
  const [maxDate, setMaxDate] = useState(invoicingSchedule.maxDate || 0);
  const [remark, setRemark] = useState(invoicingSchedule.remark || "");

  const onSubmitCustomerSettingHandler = async (values) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));

    console.log("submit setting data");
    console.log(values);
    console.log(daysArray);

    const NewCustomerSettingData = new CustomerSettingById({});
    NewCustomerSettingData.customerSettingID = Number(id);
    NewCustomerSettingData.customerID = customerSettingData.customerID;
    NewCustomerSettingData.customerCategoryID =
      customerSettingData.customerCategoryID;
    NewCustomerSettingData.shareable = shareable == "TRUE" ? true : false;
    NewCustomerSettingData.pmoCustomer = pmoCustomer == "TRUE" ? true : false;
    NewCustomerSettingData.createUserID = customerSettingData.createUserID;
    NewCustomerSettingData.modifyUserID =
      userLogin?.employeeID != null ? userLogin.employeeID : 0;

    await dispatch(
      CustomerSetting.putCustomerSetting(NewCustomerSettingData, Number(id))
    );

    /** post invoicing schedule */
    let remark = values.remark;

    const NewInvoicingSchedule = new InvoicingScheduleModel({});
    NewInvoicingSchedule.scheduleID = invoicingSchedule.scheduleID;
    NewInvoicingSchedule.customerSettingID = Number(id);
    NewInvoicingSchedule.scheduleDays = daysArray.join(", ");
    NewInvoicingSchedule.remark = remark;
    NewInvoicingSchedule.minDate = minDate;
    NewInvoicingSchedule.maxDate = maxDate;
    NewInvoicingSchedule.createUserID = invoicingSchedule.createUserID;
    NewInvoicingSchedule.modifyUserID = userLogin?.employeeID;

    dispatch(
      InvoicingSchedule.putInvoicingSchedule(
        NewInvoicingSchedule,
        invoicingSchedule.scheduleID
      )
    );

    salesAssign.map((data) => {
      const NewAssignSales = new SalesAssignPostModel({});
      // NewAssignSales.assignID = 0;
      NewAssignSales.salesID = data.salesID;
      NewAssignSales.customerSettingID = Number(id);
      // NewAssignSales.AssignedBy = userLogin?.employeeID;
      NewAssignSales.createDate = new Date();
      NewAssignSales.createUserID = userLogin?.employeeID;
      NewAssignSales.modifyUserID = userLogin?.employeeID;

      dispatch(SalesAssign.postAssignedSales(NewAssignSales));
    });

    // dispatch(CustomerSetting.postCustomerSetting(NewCustomerSettingData));
    dispatch(
      ToastsAction.add(
        "Edit customer setting data success!",
        ToastStatusEnum.Success
      )
    );
    // setCustomerName('');
    // setCustomerData(undefined);
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
    setProjectType(data);
  };

  const onSubmitData = (data) => {};

  /** Invoicing requirement */
  const onAddInvoicingCondition = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewInvoicingCondition customerSettingID={Number(id)} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const invoicingConditionData = useSelector((state: IStore) =>
    selectInvoicingCondition(state)
  );

  const deleteInvoicingCondition = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={InvoicingCondition.deleteInvoicingCondition}
            refreshFunc={InvoicingCondition.requestInvoicingCondition}
            id={idToDel}
            customerSettingID={Number(id)}
            content="invoicing condition"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** Related customer */
  const onAddRelatedCustomer = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedCondition customerSettingID={Number(id)} />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch]);

  const relatedCustomerData = useSelector((state: IStore) =>
    selectRelatedCustomer(state)
  );

  const deleteRelatedCustomer = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedCustomer.deleteRelatedCustomer}
            refreshFunc={RelatedCustomer.requestRelatedCustomer}
            id={idToDel}
            customerSettingID={Number(id)}
            content="related customer"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** RelatedFile */
  const onAddRelatedFile = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModalNewRelatedFile customerSettingID={Number(id)} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch]);

  const relatedFileData = useSelector((state: IStore) =>
    selectRelatedFile(state)
  );

  const deleteRelatedFile = useCallback(
    (idToDel: number): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <DeletePopUp
            deleteFunc={RelatedFile.deleteRelatedFile}
            refreshFunc={RelatedFile.requestRelatedFile}
            id={idToDel}
            customerSettingID={Number(id)}
            content="related file"
          />,
          ModalSizeEnum.Tiny
        )
      );
    },
    [dispatch]
  );

  /** data yang perlu di get */
  useEffect(() => {
    dispatch(InvoicingCondition.requestInvoicingCondition(Number(id)));
    dispatch(RelatedCustomer.requestRelatedCustomer(Number(id)));
    dispatch(RelatedFile.requestRelatedFile(Number(id)));
    dispatch(SalesAssign.requestSalesHistory(Number(id)));
    dispatch(InvoicingSchedule.requestInvoicingSchedule(Number(id)));
    dispatch(CustomerSetting.requestCustomerSettingById(Number(id)));

    // setSettingData(customerSettingData)
  }, [dispatch]);

  useEffect(() => {
    console.log(customerSettingData);
    if (!Number.isNaN(customerSettingData.customerID)) {
      dispatch(
        CustomerName.requestCustomerById(customerSettingData.customerID)
      );
      dispatch(ConfigItem.requestConfigItem(customerSettingData.customerID));
      dispatch(
        CollectionHistory.requestCollectionHistory(
          customerSettingData.customerID
        )
      );
      dispatch(
        CustomerPIC.requestGetCustomerPIC(customerSettingData.customerID)
      );
      dispatch(
        BrandSummary.requestBrandSummary(customerSettingData.customerID)
      );
      dispatch(
        ServiceSummary.requestServiceSummary(customerSettingData.customerID)
      );
      dispatch(
        ProjectHistory.requestServiceSummary(customerSettingData.customerID)
      );
      setShareable(customerSettingData.shareable ? "TRUE" : "FALSE");
      setPmoCustomer(customerSettingData.pmoCustomer ? "TRUE" : "FALSE");

      console.log(customerData);
    }

    if (!Number.isNaN(invoicingSchedule.scheduleID)) {
      if (
        invoicingSchedule.scheduleDays ===
        "Monday, Tuesday, Wednesday, Thursday, Friday"
      ) {
        setIsAllDaysChecked(true);
      } else {
        setIsAllDaysChecked(false);
      }

      setDaysArray(invoicingSchedule.scheduleDays.split(", "));
      setMinDate(invoicingSchedule.minDate);
      setMaxDate(invoicingSchedule.maxDate);
      setRemark(invoicingSchedule.remark);
    }
  }, [dispatch, customerSettingData, invoicingSchedule]);

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      InvoicingCondition.REQUEST_GET_INVOICING_CONDITION,
      RelatedFile.REQUEST_GET_RELATED_FILE,
      SalesAssign.REQUEST_SALES_HISTORY,
      InvoicingSchedule.REQUEST_GET_INVOICING_SCHEDULE,
      CustomerSetting.REQUEST_CUSTOMER_SETTING_BY_ID,
      CustomerName.REQUEST_CUSTOMER_BY_ID,
      ConfigItem.REQUEST_GET_CONFIG_ITEM,
      CollectionHistory.REQUEST_GET_COLLECTION_HISTORY,
      CustomerPIC.REQUEST_GET_CUSTOMER_PIC,
      BrandSummary.REQUEST_GET_BRAND_SUMMARY,
      ServiceSummary.REQUEST_GET_SERVICE_SUMMARY,
      ProjectHistory.REQUEST_GET_PROJECT_HISTORY,
    ])
  );

  return (
    <Fragment>
      <Link to="/customer-setting" className="link">
        {"< Back to Customer Setting List"}
      </Link>

      <div className="form-container">
        {/* judul add new customer setting */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-title grey">VIEW/EDIT CUSTOMER SETTING</p>
          <div className="pmo-toggle">
            <p style={{ margin: "0 1rem 0 0" }}>PMO customer</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="margin-0">OFF</p>
              <Checkbox
                toggle
                checked={pmoCustomer == "TRUE" ? true : false}
                onChange={() => handlePmoCustomer()}
                className="toggle-margin"
              ></Checkbox>
              <p className="margin-0">ON</p>
            </div>
          </div>
        </div>

        <Divider></Divider>

        <LoadingIndicator isActive={isRequesting}>
          {/* search customer name dan data customer */}

          {/* {(customerData.customerID != 0 && !Number.isNaN(customerSettingData.customerID)) && */}
          <>
            <div className="padding-horizontal customer-search-container">
              <div className="customer-data-container">
                <label
                  className="address-font-label"
                  style={{ textAlign: "left" }}
                >
                  Account Status
                </label>
                <Label color="green" className="boolean-container">
                  <p>Shareable Account</p>
                </Label>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Cust. Category</label>
                <p
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                  className="grey"
                >
                  Enterprise
                </p>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">CustomerID</label>
                <p
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                  className="grey"
                >
                  {customerData.customerID}
                </p>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Blacklist</label>
                <Label
                  color={customerData.blacklist ? "red" : "teal"}
                  className="boolean-container"
                >
                  <Icon name="address book" />
                  {customerData.blacklist ? "Yes" : "No"}
                </Label>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Holdshipment</label>
                <Label
                  color={customerData.holdshipment ? "red" : "blue"}
                  className="boolean-container"
                >
                  <Icon name="truck" />
                  {customerData.holdshipment ? "Yes" : "No"}
                </Label>
              </div>

              <div className="customer-data-container">
                <label className="customer-data-label">Avg. AR (days)</label>
                <p className="grey avgar-font">{customerData.avgAR}</p>
              </div>
            </div>

            <div style={{ margin: "14px 0" }} className="padding-horizontal">
              <label
                className="address-font-label"
                style={{ textAlign: "left" }}
              >
                Customer Name
              </label>
              <p
                style={{ fontSize: "20px", fontWeight: "bold" }}
                className="grey"
              >
                Customer Name
              </p>
            </div>

            <div style={{ margin: "14px 0" }} className="padding-horizontal">
              <label className="address-font-label">Address</label>
              <p style={{ fontSize: "20px" }} className="grey">
                Alamat
              </p>
            </div>
          </>
          {/* } */}

          <Divider></Divider>

          <div className="padding-horizontal title-button-row">
            <p className="grey margin-0 bold text-align-left">
              ACCOUNT OWNER SETTING
            </p>
            <Button
              color="yellow"
              size="small"
              type="button"
              onClick={() => {}}
            >
              <Icon name="check circle" />
              Claim Account
            </Button>
          </div>

          <Divider></Divider>

          <div style={{}} className="padding-horizontal">
            <TableNewCustomerSetting
              data={data.accOwnerData}
              header={data.accOwnerHeader}
              sequenceNum={true}
            />
          </div>
          <Divider></Divider>

          {/* {(customerData.customerID != 0 && !Number.isNaN(customerSettingData.customerID)) ? */}
          <>
            {/* data get mengenai customer */}
            <div className="padding-horizontal">
              <div className="grey get-data-container">
                <div
                  className="accordion-container"
                  onClick={() => setOpenPicList(!openPicList)}
                >
                  <span className="bold">CUSTOMER PIC LIST</span>
                  {openPicList ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openPicList && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={picData}
                        header={data.picHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenBrandSummary(!openBrandSummary)}
                >
                  <span className="bold">BRAND SUMMARY</span>
                  {openBrandSummary ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openBrandSummary && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={brandSummaryData}
                        header={data.brandHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenServiceSummary(!openServiceSummary)}
                >
                  <span className="bold">SERVICE SUMMARY</span>
                  {openServiceSummary ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openServiceSummary && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={serviceSummaryData}
                        header={data.serviceHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenSalesHistory(!openSalesHistory)}
                >
                  <span className="bold">SALES ASSIGN HISTORY</span>
                  {openSalesHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openSalesHistory && (
                  <>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={salesHistoryData}
                        header={data.salesHistoryHeader}
                        sequenceNum={true}
                      />
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenProjectHistory(!openProjectHistory)}
                >
                  <span className="bold">PROJECT CUSTOMER HISTORY</span>
                  {openProjectHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openProjectHistory && (
                  <>
                    <div className="table-container">
                      <div style={{ marginBottom: "1rem", width: "35%" }}>
                        <label className="customer-data-label">
                          Filter Search
                        </label>
                        <div
                          style={{
                            marginTop: "0.5rem",
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          <Input
                            style={{ width: "100%", height: "2.5rem" }}
                            placeholder="Search..."
                            onChange={onChangeSearch}
                            onKeyPress={(event) => {
                              if (event.charCode == 13) {
                                onSearch();
                              }
                            }}
                            value={searchText}
                          />
                          <div
                            style={{
                              position: "absolute",
                              display: "flex",
                              right: "0",
                              top: "0",
                              height: "100%",
                              alignItems: "center",
                            }}
                          >
                            {cancelBtn ? (
                              <Icon
                                name="cancel"
                                onClick={onClickedCancelButton}
                                style={{
                                  marginBottom: "0.3rem",
                                  marginRight: "1rem",
                                }}
                              />
                            ) : (
                              <Icon
                                name="search"
                                style={{
                                  marginBottom: "0.3rem",
                                  marginRight: "1rem",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <TableProjectHistory
                        data={historyData}
                        setOpenCollectionHistory={setOpenCollectionHistory}
                      />

                      <div style={{ marginTop: "1rem" }}>
                        <Pagination
                          activePage={historyActivePage}
                          onPageChange={(e, data) => historyChangePage(e, data)}
                          totalPage={allHistoryData.length}
                          pageSize={historyPageSize}
                        />
                      </div>
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() =>
                    setOpenCollectionHistory(!openCollectionHistory)
                  }
                >
                  <span className="bold">COLLECTION HISTORY</span>
                  {openCollectionHistory ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>
                <Divider className="margin-0"></Divider>

                {openCollectionHistory && (
                  <>
                    <div className="table-container">
                      <TableCollectionHistory
                        data={data.collectionHistoryData}
                      />
                      {/* <TableNewCustomerSetting data={data.collectionHistoryData} header={data.collectionHistoryHeader} sequenceNum={false} /> */}
                    </div>
                    <Divider className="margin-0"></Divider>
                  </>
                )}

                <div
                  className="accordion-container"
                  onClick={() => setOpenConfigItem(!openConfigItem)}
                >
                  <span className="bold">CONFIG ITEM</span>
                  {openConfigItem ? (
                    <Icon name="triangle down" />
                  ) : (
                    <Icon name="triangle right" />
                  )}
                </div>

                {openConfigItem && (
                  <>
                    <Divider className="margin-0"></Divider>
                    <div className="table-container">
                      <TableNewCustomerSetting
                        data={configItemData}
                        header={data.configItemHeader}
                        sequenceNum={false}
                      />
                      <div style={{ marginTop: "1rem" }}>
                        <Pagination
                          activePage={1}
                          onPageChange={() => {}}
                          totalPage={2}
                          pageSize={1}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Divider></Divider>

            <p className="padding-horizontal grey margin-0 bold text-align-left">
              INVOICING SCHEDULE SETTING
            </p>

            <Divider></Divider>

            <FinalForm
              onSubmit={(values: any) => onSubmitCustomerSettingHandler(values)}
              render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="padding-horizontal">
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
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Monday, Tuesday
                      </p>
                    </div>

                    <div className="invoicing-schedule-position">
                      <div className="date-range-container">
                        <p className="grey bold">
                          Invoicing Date Range{" "}
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <div className="date-range-container-input">
                          <div
                            className="date-range-input"
                            style={{ marginRight: "1rem" }}
                          >
                            <label htmlFor="minDate">Min. Date(Day)</label>
                            <p
                              style={{
                                textAlign: "right",
                                fontSize: "18px",
                                fontWeight: "bold",
                              }}
                            >
                              1
                            </p>
                          </div>
                          <div className="date-range-input">
                            <label htmlFor="maxDate">Max. Date(Day)</label>
                            <p
                              style={{
                                textAlign: "right",
                                fontSize: "18px",
                                fontWeight: "bold",
                              }}
                            >
                              20
                            </p>
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "100%" }}>
                        <label className="customer-data-label">Remark</label>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Divider></Divider>

                  <p className="padding-horizontal grey margin-0 bold text-align-left">
                    INVOICING CONDITION
                  </p>

                  <Divider></Divider>

                  <div className="padding-horizontal">
                    <div className="invoicing-condition-button">
                      <div style={{ width: "30%" }}>
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
                      </div>

                      <Button
                        color="yellow"
                        size="small"
                        type="button"
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
                                  className="trash-container"
                                  onClick={() =>
                                    deleteInvoicingCondition(data.conditionID)
                                  }
                                >
                                  <Icon
                                    className="trash-icon"
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

                  <div className="padding-horizontal title-button-row">
                    <p className="grey margin-0 bold text-align-left">
                      RELATED CUSTOMER
                    </p>
                    <Button
                      color="yellow"
                      size="small"
                      type="button"
                      onClick={onAddRelatedCustomer}
                    >
                      <Icon name="add" />
                      Add Related Customer
                    </Button>
                  </div>

                  <Divider></Divider>

                  <div className="padding-horizontal">
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
                                  className="trash-container"
                                  onClick={() =>
                                    deleteRelatedCustomer(data.relatedID)
                                  }
                                >
                                  <Icon
                                    className="trash-icon"
                                    name="trash alternate"
                                  />
                                </div>
                              </Table.Cell>
                              <Table.Cell>{data.customerName}</Table.Cell>
                              <Table.Cell>{data.customerAddress}</Table.Cell>
                              <Table.Cell>{data.category}</Table.Cell>
                              <Table.Cell>{data.avgAR}</Table.Cell>
                              <Table.Cell>
                                <Label
                                  color={data.blacklist ? "red" : "teal"}
                                  className="boolean-container"
                                >
                                  <Icon name="address book" />
                                  {data.blacklist ? "Yes" : "No"}
                                </Label>
                              </Table.Cell>
                              <Table.Cell>
                                <Label
                                  color={data.holdshipment ? "red" : "blue"}
                                  className="boolean-container"
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

                  <div className="padding-horizontal title-button-row">
                    <p className="grey margin-0 bold text-align-left">
                      UPLOAD RELATED FILE
                    </p>
                    <Button
                      color="yellow"
                      size="small"
                      type="button"
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
                                  className="trash-container"
                                  onClick={() =>
                                    deleteRelatedFile(data.relatedFileID)
                                  }
                                >
                                  <Icon
                                    className="trash-icon"
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
                  <div className="button-container">
                    <div className="button-inner-container">
                      <Button
                        color="grey"
                        style={{ marginRight: "1rem" }}
                        type="button"
                      >
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
          {/* :
                        <>
                            <Divider style={{ marginBottom: "0px"}}></Divider>
                            <div className="button-container">
                                <div className="button-inner-container">
                                    <Button style={{ marginRight: "1rem" }}>Cancel</Button>
                                    <Button color="blue" disabled>Submit</Button>
                                </div>
                            </div>
                        </>
                    } */}
        </LoadingIndicator>
      </div>
    </Fragment>
  );
};

export default ViewCustomerSettingPage;
