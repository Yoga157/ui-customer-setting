import React, { Fragment, useState, useCallback, useEffect,} from "react";
import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form as FinalForm, Field } from "react-final-form";
import { Link, useParams } from "react-router-dom";
import { Divider, Dropdown, Form, Label, Icon, Table, Button, Checkbox } from "semantic-ui-react";
import { SearchInput, DropdownClearInput, CheckBox as CheckboxInvoicing, RichTextEditor } from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as data from "./data"

import ModalNewInvoicingCondition from "./components/modal/modal-new-invoicing-condition/ModalNewInvoicingCondition";
import ModalNewRelatedCondition from "./components/modal/modal-new-related-customer/ModalNewRelatedCustomer";
import ModalNewRelatedFile from "./components/modal/modal-new-related-file/ModalNewRelatedFile";
import TableNewCustomerSetting from "./components/table/table-new-customer-setting/TableNewCustomerSetting";
import { DeletePopUp } from "./components/delete";

import { selectCustomerById, selectCustomerSearchOptions } from "selectors/select-options/CustomerNameSelector";
import IStore from "models/IStore";
import * as CustomerName from "stores/customer-name/CustomerNameActivityActions"
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions"
import * as CustomerPIC from "stores/customer-pic/CustomerPICActions"
import * as BrandSummary from "stores/brand-summary/BrandSummaryActivityActions"
import * as ServiceSummary from "stores/service-summary/ServiceSummaryActivityActions"
import * as InvoicingSchedule from "stores/invoicing-schedule/InvoicingScheduleActivityActions"
import * as InvoicingCondition from "stores/invoicing-condition/InvoicingConditionActivityActions"
import * as RelatedCustomer from "stores/related-customer/RelatedCustomerActivityActions"
import * as RelatedFile from "stores/related-file/RelatedFileActivityActions"
import * as SalesAssign from "stores/customer-sales/SalesAssignActivityActions"
import * as ConfigItem from "stores/config-item/ConfigItemActivityActions"
import * as CollectionHistory from "stores/collection-history/CollectionHistoryActivityActions"
import * as ProjectHistory from "stores/project-history/ProjectHistoryActivityActions"
import * as ToastsAction from 'stores/toasts/ToastsAction';
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelectors";
import { selectCustomerSettingByCustomerId } from "selectors/customer-setting/CustomerSettingSelector";
import { selectBrandSummary } from "selectors/brand-summary/BrandSummarySelector";
import { selectServiceSummary } from "selectors/service-summary/ServiceSummarySelector";
import { selectInvoicingCondition } from "selectors/invoicing-condition/InvoicingConditionSelector";
import { selectRelatedCustomer } from "selectors/related-customer/RelatedCustomerSelector";
import { selectRelatedFile } from "selectors/related-file/RelatedFileSelector";
import { selectSalesHistory, selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { selectConfigItem } from "selectors/config-item/ConfigItemSelector";
import { selectCollectionHistory } from "selectors/collection-history/CollectionHistorySelector";
import { selectInvoicingSchedule } from "selectors/invoicing-schedule/InvoicingScheduleSelector";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import { selectProjectHistory } from "selectors/project-history/ProjectHistorySelector";

interface IProps {
    history: any;
}

interface routeParams {
    id: string;
}

const ViewCustomerSettingPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { id } = useParams<routeParams>();
    
    /** Customer data */
    const customerData = useSelector((state: IStore) => selectCustomerById(state));
    const customerSettingData = useSelector((state: IStore) => selectCustomerSettingByCustomerId(state))

    const onSubmitCustCategory = async (e) => {
        console.log(e);
    }

    /** Handle dropdown data yang di-get */
    const [openPicList, setOpenPicList] = useState(false);
    const [openBrandSummary, setOpenBrandSummary] = useState(false);
    const [openServiceSummary, setOpenServiceSummary] = useState(false);
    const [openSalesHistory, setOpenSalesHistory] = useState(false);
    const [openProjectHistory, setOpenProjectHistory] = useState(false);
    const [openCollectionHistory, setOpenCollectionHistory] = useState(false);
    const [openConfigItem, setOpenConfigItem] = useState(false);

    const picData = useSelector((state: IStore) => selectCustomerPIC(state));
    const brandSummaryData = useSelector((state: IStore) => selectBrandSummary(state));
    const serviceSummaryData = useSelector((state: IStore) => selectServiceSummary(state));
    const configItemData = useSelector((state: IStore) => selectConfigItem(state));
    const collectionHistoryData = useSelector((state: IStore) => selectCollectionHistory(state));
    const projectHistoryData = useSelector((state: IStore) => selectProjectHistory(state));
    
    /** Search Sales */
    const salesHistoryData = useSelector((state: IStore) => selectSalesHistory(state));

    const deleteSalesAssign = useCallback((idToDel: number): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp deleteFunc={SalesAssign.deleteSalesAssign} refreshFunc={SalesAssign.requestSalesHistory} id={idToDel} customerSettingID={Number(id)} content="sales" />,
            ModalSizeEnum.Tiny
          )
        );
    }, [dispatch]);

    const [salesName, setSalesName] = useState('');    
    const [salesAssign, setSalesAssign] = useState([]);
    const salesStoreSearch = useSelector((state: IStore) => selectSalesSearchOptions(state));

    const handleSearchChangeSales = useCallback((data) => {
        setSalesName(data);
        if(data.length >= 2) {
            dispatch(SalesAssign.requestSalesByName(data));
        }
    }, [dispatch])

    const onResultSelectSales = (data: any) => {
        setSalesName("");
        let checkSales = salesAssign.find((obj) => obj.salesID === data.result.salesID);

        if (checkSales === undefined) {
            setSalesAssign([...salesAssign, {
                salesName: data.result.title,
                salesID: data.result.salesID
            }])
        }
    };

    const onSubmitSalesHandler = async (e) => {
        console.log(e);
        console.log(salesName);
    }

    const onDeleteSalesAssign = (salesID) => {
        const arrayFiltered = salesAssign.filter(sales => sales.salesID !== salesID);
        setSalesAssign(arrayFiltered);
    }

    /** Add setting */
    const [shareable, setShareable] = useState(customerSettingData.shareable ? "TRUE" : "FALSE");
    const [pmoCustomer, setPmoCustomer] = useState(customerSettingData.pmoCustomer ? "TRUE" : "FALSE");

    const handleShareable = () => {
        if(shareable == "FALSE") {
            setShareable("TRUE")
        } else {
            setShareable("FALSE")
        }
    }

    const handlePmoCustomer = () => {
        if(pmoCustomer == "FALSE") {
            setPmoCustomer("TRUE")
        } else {
            setPmoCustomer("FALSE")
        }
    }

    /** Invoicing schedule */
    const invoicingSchedule = useSelector((state: IStore) => selectInvoicingSchedule(state));
    console.log(invoicingSchedule)

    const days = ["All days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [daysArray, setDaysArray] = useState(invoicingSchedule.scheduleDays?.split(", ") || []);
    const [isAllDaysChecked, setIsAllDaysChecked] = useState(invoicingSchedule.scheduleDays === "Monday, Tuesday, Wednesday, Thursday, Friday" || false)

    const checkDay = (day) => {
        if(day == "All days") {
            if(daysArray.includes("Monday") && daysArray.includes("Tuesday") && daysArray.includes("Wednesday") && daysArray.includes("Thursday") && daysArray.includes("Friday")){
                setIsAllDaysChecked(false)
                setDaysArray([])
            } else {
                setDaysArray(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
                setIsAllDaysChecked(true)
            }
        } else {
            const isDaySelected = daysArray.includes(day);

            if (isDaySelected) {
                setDaysArray(daysArray.filter(selectedDay => selectedDay !== day));
            } else {
                setDaysArray([...daysArray, day]);
            }
        }
    }

    const [minDate, setMinDate] = useState(invoicingSchedule.minDate || 0)
    const [maxDate, setMaxDate] = useState(invoicingSchedule.maxDate || 0)
    const [remark, setRemark] = useState(invoicingSchedule.remark || "")

    const onSubmitCustomerSettingHandler = async (values) => {
        let userLogin = JSON.parse(localStorage.getItem('userLogin'));

        console.log("submit setting data")
        console.log(values)
        console.log(daysArray)

        const NewCustomerSettingData = new CustomerSettingById({})
        NewCustomerSettingData.customerSettingID = Number(id);
        NewCustomerSettingData.customerID = customerSettingData.customerID;
        NewCustomerSettingData.customerCategoryID = customerSettingData.customerCategoryID;
        NewCustomerSettingData.shareable = shareable == "TRUE" ? true : false;
        NewCustomerSettingData.pmoCustomer = pmoCustomer == "TRUE" ? true : false;
        NewCustomerSettingData.createUserID = customerSettingData.createUserID;
        NewCustomerSettingData.modifyUserID = userLogin?.employeeID != null ? userLogin.employeeID : 0;
        
        await dispatch(CustomerSetting.putCustomerSetting(NewCustomerSettingData, Number(id)));

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

        dispatch(InvoicingSchedule.putInvoicingSchedule(NewInvoicingSchedule, invoicingSchedule.scheduleID))

        salesAssign.map((data) => {
            const NewAssignSales = new SalesAssignPostModel({});
            NewAssignSales.assignID = 0;
            NewAssignSales.SalesID = data.salesID;
            NewAssignSales.CustomerSettingID = Number(id);
            NewAssignSales.AssignedBy = userLogin?.employeeID;
            NewAssignSales.createDate = new Date();
            NewAssignSales.createUserID = userLogin?.employeeID;
            NewAssignSales.modifyUserID = userLogin?.employeeID;

            dispatch(SalesAssign.postAssignedSales(NewAssignSales));
        })

        // dispatch(CustomerSetting.postCustomerSetting(NewCustomerSettingData));
        dispatch(ToastsAction.add('Edit customer setting data success!', ToastStatusEnum.Success));
        // setCustomerName('');
        // setCustomerData(undefined);
    }

    /** Project Type */
    const [projectType, setProjectType] = useState("")
    const projectTypeData = [
        {
            text: "Manage Operation",
            value: "Manage Operation"
        },
        {
            text: "Manage Service",
            value: "Manage Service"
        },
        {
            text: "Project Type",
            value: "Project Type"
        },
    ]

    const onChangeProjectType = (data: any): any => {
        setProjectType(data)
    }

    const onSubmitData = (data) => {

    }

    /** Invoicing requirement */
    const onAddInvoicingCondition = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewInvoicingCondition customerSettingID={Number(id)} />,
            ModalSizeEnum.Small
          )
        );
    }, [dispatch]);

    const invoicingConditionData = useSelector((state: IStore) => selectInvoicingCondition(state));

    const deleteInvoicingCondition = useCallback((idToDel: number): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp deleteFunc={InvoicingCondition.deleteInvoicingCondition} refreshFunc={InvoicingCondition.requestInvoicingCondition} id={idToDel} customerSettingID={Number(id)} content="invoicing condition" />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch]);

    /** Related customer */
    const onAddRelatedCustomer = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewRelatedCondition customerSettingID={Number(id)} />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch]);

    const relatedCustomerData = useSelector((state: IStore) => selectRelatedCustomer(state));
    
    const deleteRelatedCustomer = useCallback((idToDel: number): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp deleteFunc={RelatedCustomer.deleteRelatedCustomer} refreshFunc={RelatedCustomer.requestRelatedCustomer} id={idToDel} customerSettingID={Number(id)} content="related customer" />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch]);

    /** RelatedFile */
    const onAddRelatedFile = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewRelatedFile customerSettingID={Number(id)} />,
            ModalSizeEnum.Small
          )
        );
      }, [dispatch]);
    
    const relatedFileData = useSelector((state: IStore) => selectRelatedFile(state));

    const deleteRelatedFile = useCallback((idToDel: number): void => {
        dispatch(
        ModalFirstLevelActions.OPEN(
            <DeletePopUp deleteFunc={RelatedFile.deleteRelatedFile} refreshFunc={RelatedFile.requestRelatedFile} id={idToDel} customerSettingID={Number(id)} content="related file" />,
            ModalSizeEnum.Tiny
        )
        );
    }, [dispatch]);
    
    /** data yang perlu di get */
    useEffect(() => {
            dispatch(InvoicingCondition.requestInvoicingCondition(Number(id)))
            dispatch(RelatedCustomer.requestRelatedCustomer(Number(id)))
            dispatch(RelatedFile.requestRelatedFile(Number(id)))
            dispatch(SalesAssign.requestSalesHistory(Number(id)))
            dispatch(InvoicingSchedule.requestInvoicingSchedule(Number(id)))
            dispatch(CustomerSetting.requestCustomerSettingById(Number(id)))

            // setSettingData(customerSettingData)
    }, [dispatch])

    useEffect(() => {
        console.log(customerSettingData)
        if(!Number.isNaN(customerSettingData.customerID)) {
            dispatch(CustomerName.requestCustomerById(customerSettingData.customerID))
            dispatch(ConfigItem.requestConfigItem(customerSettingData.customerID))
            dispatch(CollectionHistory.requestCollectionHistory(customerSettingData.customerID))
            dispatch(CustomerPIC.requestGetCustomerPIC(customerSettingData.customerID))
            dispatch(BrandSummary.requestBrandSummary(customerSettingData.customerID))
            dispatch(ServiceSummary.requestServiceSummary(customerSettingData.customerID))
            dispatch(ProjectHistory.requestServiceSummary(customerSettingData.customerID))
            setShareable(customerSettingData.shareable ? "TRUE": "FALSE")
            setPmoCustomer(customerSettingData.pmoCustomer ? "TRUE": "FALSE")
            
            console.log(customerData)
        }
        
        if(!Number.isNaN(invoicingSchedule.scheduleID)) {
            if(invoicingSchedule.scheduleDays === "Monday, Tuesday, Wednesday, Thursday, Friday") {
                setIsAllDaysChecked(true)
            } else {
                setIsAllDaysChecked(false)
            }

            setDaysArray(invoicingSchedule.scheduleDays.split(", "))
            setMinDate(invoicingSchedule.minDate)
            setMaxDate(invoicingSchedule.maxDate)
            setRemark(invoicingSchedule.remark)

        }
    }, [dispatch, customerSettingData, invoicingSchedule])

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
            ProjectHistory.REQUEST_GET_PROJECT_HISTORY
        ])
    );

    return (
        <Fragment>
            <Link to="/customer-setting" className="link">{"< Back to Customer Setting List"}</Link>

                <div className="form-container">
                    {/* judul add new customer setting */}
                    <p className="page-title grey">VIEW/EDIT CUSTOMER SETTING</p>

                    <Divider></Divider>

                    <LoadingIndicator isActive={isRequesting}>
                    {/* search customer name dan data customer */}
                    <div className="padding-horizontal customer-search-container">

                        {(customerData.customerID != 0 && !Number.isNaN(customerSettingData.customerID)) &&
                         <>
                            <div className="customer-data-container">
                                <label className="address-font-label" style={{ textAlign: "left"}}>Customer Name</label>
                                <p style={{ fontSize: "20px"}} className="grey">{customerData?.customerName}</p>
                            </div>

                            <div className="customer-data-container">
                                <label className="customer-data-label">CustomerID</label>
                                <p style={{fontSize: "24px", fontWeight: "bold"}} className="grey">{customerData.customerID}</p>
                            </div>

                            <div className="customer-data-container">
                                <label className="customer-data-label">Blacklist</label>
                                <Label color={customerData.blacklist ? "red" : "teal"} className="boolean-container">
                                    <Icon name='address book'/>{customerData.blacklist ? "Yes" : "No"}
                                </Label>
                            </div>

                            <div className="customer-data-container">
                                <label className="customer-data-label">Holdshipment</label>
                                <Label color={customerData.holdshipment ? "red" : "blue"} className="boolean-container">
                                    <Icon name='truck'/>{customerData.holdshipment ? "Yes" : "No"}
                                </Label>
                            </div>

                            <div className="customer-data-container">
                                <label className="customer-data-label">Avg. AR (days)</label>
                                <p className="grey avgar-font">{customerData.avgAR}</p>
                            </div>
                         </>
                        }
                    </div>
                    
                    {(customerData.customerID != 0 && !Number.isNaN(customerSettingData.customerID)) ?
                        <>
                            <div style={{ margin: "14px 0" }} className="padding-horizontal">
                                <label className="address-font-label">Address</label>
                                <p style={{ fontSize: "20px"}} className="grey">{customerData?.customerAddress}</p>
                            </div>
                            
                            {/* data get mengenai customer */}
                            <div className="padding-horizontal">
                                <div className="grey get-data-container">
                                    <div className="accordion-container" onClick={() => setOpenPicList(!openPicList)}>
                                        <span className="bold">CUSTOMER PIC LIST</span>
                                        {openPicList ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>
                                    
                                    {openPicList &&
                                        <>
                                        <div className="table-container">
                                            <TableNewCustomerSetting data={picData} header={data.picHeader} sequenceNum={true}/>
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenBrandSummary(!openBrandSummary)}>
                                        <span className="bold">BRAND SUMMARY</span>
                                        {openBrandSummary ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>

                                    {openBrandSummary &&
                                        <>
                                        <div className="table-container">
                                            <TableNewCustomerSetting data={brandSummaryData} header={data.brandHeader} sequenceNum={true}/>
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenServiceSummary(!openServiceSummary)}>
                                        <span className="bold">SERVICE SUMMARY</span>
                                        {openServiceSummary ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>

                                    {openServiceSummary &&
                                        <>
                                        <div className="table-container">
                                            <TableNewCustomerSetting data={serviceSummaryData} header={data.serviceHeader} sequenceNum={true}/>
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenSalesHistory(!openSalesHistory)}>
                                        <span className="bold">SALES ASSIGN HISTORY</span>
                                        {openSalesHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>

                                    {openSalesHistory &&
                                        <>
                                        <div className="table-container">
                                            <TableNewCustomerSetting data={salesHistoryData} header={data.salesHistoryHeader} sequenceNum={true}/>
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenProjectHistory(!openProjectHistory)}>
                                        <span className="bold">PROJECT CUSTOMER HISTORY</span>
                                        {openProjectHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>

                                    {openProjectHistory &&
                                        <>
                                        <div className="table-container">
                                            <TableNewCustomerSetting data={projectHistoryData} header={data.projectHistoryHeader} sequenceNum={false} />
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenCollectionHistory(!openCollectionHistory)}>
                                        <span className="bold">COLLECTION HISTORY</span>
                                        {openCollectionHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>
                                    <Divider className="margin-0"></Divider>

                                    {openCollectionHistory &&
                                        <>
                                        <div className="table-container">
                                        <TableNewCustomerSetting data={collectionHistoryData} header={data.collectionHistoryHeader} sequenceNum={false} />
                                        </div>
                                        <Divider className="margin-0"></Divider>
                                        </>
                                    }

                                    <div className="accordion-container" onClick={() => setOpenConfigItem(!openConfigItem)}>
                                        <span className="bold">CONFIG ITEM</span>
                                        {openConfigItem ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                                    </div>

                                    {openConfigItem &&
                                        <>
                                        <Divider className="margin-0"></Divider>
                                        <div className="table-container">
                                        <TableNewCustomerSetting data={configItemData} header={data.configItemHeader} sequenceNum={false}/>
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <Divider></Divider>
                            
                            <div className="padding-horizontal setting-container">
                                <div className="sales-assign">
                                    <div className="sales-assign-search">
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
                                        )}/>
                                        <Button color='blue' content='Assign Me' className="assign-me-button"/>
                                    </div>

                                    <div className="setting-position">
                                        <Divider className="margin-0"/>

                                        <div className="setting-toggle-container">
                                            <p className="margin-0">Shareable customer</p>
                                            <div><span>OFF</span><Checkbox toggle checked={shareable=="TRUE" ? true : false} onChange={() => handleShareable()} className="toggle-margin"></Checkbox><span>ON</span></div>
                                        </div>

                                        <Divider className="margin-0"/>

                                        <div className="setting-toggle-container">
                                            <p className="margin-0">PMO customer</p>
                                            <div><span>OFF</span><Checkbox toggle  checked={pmoCustomer=="TRUE" ? true : false} onChange={() => handlePmoCustomer()} className="toggle-margin"></Checkbox><span>ON</span></div>
                                        </div>

                                        <Divider className="margin-0"/>
                                    </div>
                                </div>

                                <div className="sales-assign-list">
                                    <div className="sales-list-container">
                                        {salesHistoryData.map((data) => {
                                            return (
                                                <div className="sales-container" key={data.salesID}>
                                                    <div className="sales-name">
                                                        {data.salesName}
                                                    </div>
                                                    <div className="sales-delete" onClick={() => deleteSalesAssign(data.assignID)}>
                                                        <Icon name="close"/>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {salesAssign.map((data) => {
                                            return (
                                                <div className="sales-container" key={data.salesID}>
                                                    <div className="sales-name">
                                                        {data.salesName}
                                                    </div>
                                                    <div className="sales-delete" onClick={() => onDeleteSalesAssign(data.salesID)}>
                                                        <Icon name="close"/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>

                                </div>
                            </div>

                            <Divider></Divider>

                            <p className="padding-horizontal grey margin-0 bold text-align-left">INVOICING SCHEDULE SETTING</p>

                            <Divider></Divider>

                            <FinalForm
                                onSubmit={(values: any) => onSubmitCustomerSettingHandler(values)}
                                render={({ handleSubmit, pristine, invalid }) => (
                                <Form onSubmit={handleSubmit} >

                                    <div className="padding-horizontal">
                                        <div>
                                            <div style={{ marginBottom: "0.5rem"}}>
                                                <label style={{ marginRight: '10px' }}>
                                                Days
                                                    <label style={{ color: 'red' }} className="mandatory">
                                                        {' '}
                                                        *
                                                    </label>
                                                </label>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                                {days.map((day) => {
                                                    return (
                                                        <CheckboxInvoicing label={day} value={day} defaultChecked={isAllDaysChecked && day=="All days" ? isAllDaysChecked : (isAllDaysChecked ? !daysArray.includes(day) : daysArray.includes(day))} disabled={isAllDaysChecked && day !== "All days"} style={{ marginRight: "1rem" }} onClick={() => checkDay(day)}/>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        
                                        <div className="invoicing-schedule-position">
                                            <div className="date-range-container">
                                                <p className="grey bold">Invoicing Date Range <span style={{ color: "red"}}>*</span></p>
                                                <div className="date-range-container-input">
                                                    <div className="date-range-input" style={{ marginRight: "1rem"}}>
                                                        <label htmlFor="minDate">Min. Date(Day)</label>
                                                        <input name="minDate" type="number" value={minDate} onChange={(e) => setMinDate(parseInt(e.target.value, 10))}/>
                                                    </div>
                                                    <div className="date-range-input">
                                                        <label htmlFor="maxDate">Max. Date(Day)</label>
                                                        <input name="maxDate" type="number" value={maxDate} onChange={(e) => setMaxDate(parseInt(e.target.value, 10))}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ width: "100%" }}>
                                                <Field name="remark" defaultValue={remark} value={remark} component={RichTextEditor} placeholder="e.g. Remark" labelName="Remark" />  
                                            </div>
                                        </div>
                                    </div>

                                    <Divider></Divider>

                                    <p className="padding-horizontal grey margin-0 bold text-align-left">INVOICING CONDITION</p>

                                    <Divider></Divider>

                                    <div className="padding-horizontal">
                                        <div className="invoicing-condition-button">
                                            <div style={{ width: "30%"}}>
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

                                            <Button  color="yellow" size="small" type="button" onClick={onAddInvoicingCondition}><Icon name="add"/>Add Invoicing Condition</Button>
                                        </div>

                                        <Table
                                        striped
                                        >
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>No</Table.HeaderCell>
                                                <Table.HeaderCell>Action</Table.HeaderCell>
                                                <Table.HeaderCell>Project Type</Table.HeaderCell>
                                                <Table.HeaderCell>Document Requirement</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {invoicingConditionData.length == 0 ?
                                                <Table.Row>
                                                    <Table.Cell colSpan={16} textAlign="center">
                                                    No data
                                                    </Table.Cell>
                                                </Table.Row>
                                            :
                                                (invoicingConditionData.map((data, index) => (
                                                <Table.Row key={index}>
                                                        <Table.Cell>{index + 1}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="trash-container" onClick={() => deleteInvoicingCondition(data.conditionID)}>
                                                                <Icon className="trash-icon" name="trash alternate"/>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{data.projectType}</Table.Cell>
                                                        <Table.Cell>{data.conditionName}</Table.Cell>
                                                </Table.Row>
                                                )))
                                            }
                                        </Table.Body>
                                        </Table>
                                    </div>

                                    <Divider></Divider>

                                    <div className="padding-horizontal title-button-row">
                                        <p className="grey margin-0 bold text-align-left">RELATED CUSTOMER</p>
                                        <Button color="yellow" size="small" type="button" onClick={onAddRelatedCustomer}><Icon name="add"/>Add Related Customer</Button>
                                    </div>

                                    <Divider></Divider>

                                    <div className="padding-horizontal">
                                        <Table
                                        striped
                                        >
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
                                            {relatedCustomerData.length == 0 ?
                                                <Table.Row>
                                                    <Table.Cell colSpan={16} textAlign="center">
                                                    No data
                                                    </Table.Cell>
                                                </Table.Row>
                                            :
                                                (relatedCustomerData.map((data, index) => (
                                                <Table.Row key={index}>
                                                        <Table.Cell>{index + 1}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="trash-container" onClick={() => deleteRelatedCustomer(data.relatedID)}>
                                                                <Icon className="trash-icon" name="trash alternate"/>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{data.customerName}</Table.Cell>
                                                        <Table.Cell>{data.customerAddress}</Table.Cell>
                                                        <Table.Cell>{data.category}</Table.Cell>
                                                        <Table.Cell>{data.avgAR}</Table.Cell>
                                                        <Table.Cell>
                                                            <Label color={data.blacklist ? "red" : "teal"} className="boolean-container">
                                                                <Icon name='address book'/>{data.blacklist ? "Yes" : "No"}
                                                            </Label>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Label color={data.holdshipment ? "red" : "blue"} className="boolean-container">
                                                                <Icon name='truck'/>{data.holdshipment ? "Yes" : "No"}
                                                            </Label>
                                                        </Table.Cell>
                                                </Table.Row>
                                                )))
                                            }
                                        </Table.Body>
                                        </Table>
                                    </div>

                                    <Divider></Divider>

                                    <div className="padding-horizontal title-button-row">
                                        <p className="grey margin-0 bold text-align-left">UPLOAD RELATED FILE</p>
                                        <Button color="yellow" size="small" type="button" onClick={onAddRelatedFile}><Icon name="add"/>Add Related File</Button>
                                    </div>

                                    <Divider></Divider>

                                    <div style={{ padding: "0 2rem"}}>
                                        <Table
                                        striped
                                        >
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
                                            {relatedFileData.length == 0 ?
                                                <Table.Row>
                                                    <Table.Cell colSpan={16} textAlign="center">
                                                    No data
                                                    </Table.Cell>
                                                </Table.Row>
                                            :
                                                (relatedFileData.map((data, index) => (
                                                <Table.Row key={index}>
                                                        <Table.Cell>{index + 1}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="trash-container" onClick={() => deleteRelatedFile(data.relatedFileID)}>
                                                                <Icon className="trash-icon" name="trash alternate"/>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{data.documentName}</Table.Cell>
                                                        <Table.Cell>{data.documentType}</Table.Cell>
                                                        <Table.Cell>{data.uploadDate}</Table.Cell>
                                                        <Table.Cell>{data.uploadBy}</Table.Cell>
                                                </Table.Row>
                                                )))
                                            }
                                        </Table.Body>
                                        </Table>
                                    </div>
                                
                                    <Divider style={{ marginBottom: "0px"}}></Divider>
                                    <div className="button-container">
                                        <div className="button-inner-container">
                                            <Button color="grey" style={{ marginRight: "1rem" }} type="button">Cancel</Button>
                                            <Button color="blue" type="submit">Submit</Button>
                                        </div>
                                    </div>

                            </Form>
                            )}/>
                        </>
                    :
                        <>
                            <Divider style={{ marginBottom: "0px"}}></Divider>
                            <div className="button-container">
                                <div className="button-inner-container">
                                    <Button color="grey" style={{ marginRight: "1rem" }}>Cancel</Button>
                                    <Button color="blue" disabled>Submit</Button>
                                </div>
                            </div>
                        </>
                    }
                    </LoadingIndicator>
            </div>
        </Fragment>
    )
}

export default ViewCustomerSettingPage;