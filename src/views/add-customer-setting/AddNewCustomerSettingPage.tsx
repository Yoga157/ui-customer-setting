import React, { Fragment, useState, useCallback, useEffect,} from "react";
import "./AddNewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { Divider, Dropdown, Form, Label, Icon, Table, Button, Checkbox } from "semantic-ui-react";
import { SearchInput, DropdownClearInput, CheckBox as CheckboxInvoicing, RichTextEditor } from "views/components/UI";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import * as data from "./data"
import axios from "axios";
import environment from "environment";

import ModalNewInvoicingCondition from "./components/modal/modal-new-invoicing-condition/ModalNewInvoicingCondition";
import ModalNewRelatedCondition from "./components/modal/modal-new-related-customer/ModalNewRelatedCustomer";
import ModalNewRelatedFile from "./components/modal/modal-new-related-file/ModalNewRelatedFile";
import TableNewCustomerSetting from "./components/table/table-new-customer-setting/TableNewCustomerSetting";
import { DeletePopUp } from "./components/delete";

import { selectCustomerSearchOptions } from "selectors/select-options/CustomerNameSelector";
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
import * as ToastsAction from 'stores/toasts/ToastsAction';
import { selectCustomerPIC } from "selectors/customer-pic/CustomerPICSelectors";
import { selectCustomerSettingByCustomerId, selectPostResponseCustomerSetting } from "selectors/customer-setting/CustomerSettingSelector";
import { selectBrandSummary } from "selectors/brand-summary/BrandSummarySelector";
import { selectServiceSummary } from "selectors/service-summary/ServiceSummarySelector";
import { selectInvoicingCondition } from "selectors/invoicing-condition/InvoicingConditionSelector";
import { selectRelatedCustomer } from "selectors/related-customer/RelatedCustomerSelector";
import { selectRelatedFile } from "selectors/related-file/RelatedFileSelector";
import { selectSalesSearchOptions } from "selectors/select-options/SalesAssignSelector";
import InvoicingScheduleModel from "stores/invoicing-schedule/models/InvoicingScheduleModel";
import SalesAssignPostModel from "stores/customer-sales/models/SalesAssignPostModel";
import CustomerSettingById from "stores/customer-setting/models/CustomerSettingById";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { selectConfigItem } from "selectors/config-item/ConfigItemSelector";
import { selectCollectionHistory } from "selectors/collection-history/CollectionHistorySelector";
import InvoicingConditionModel from "stores/invoicing-condition/models/InvoicingConditionModel";
import RelatedCustomerPostModel from "stores/related-customer/models/RelatedCustomerPostModel";
import { selectRequesting } from "selectors/requesting/RequestingSelector";

interface IProps {
    history: any;
}

interface CustomerData {
    key: number;
    title: string;
    customerID: number;
    customerAddress: string;
    blacklist: boolean;
    holdshipment: boolean;
    avgAR: number;
}

const AddNewCustomerSettingPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    /** Search customer */

    const [customerName, setCustomerName] = useState('');
    
    /** Customer data */
    const [customerData, setCustomerData] = useState<CustomerData | undefined>(undefined)

    const customerStoreSearch = useSelector((state: IStore) =>
        selectCustomerSearchOptions(state)
    );

    const handleSearchChangeCustomer = useCallback((data) => {
        setCustomerName(data);
        if(data.length >= 5) {
            dispatch(CustomerName.requestSearchCustomerName(data))
        } 
    }, [dispatch])

    const onResultSelectCustomer = async (data: any) => {
        setCustomerName(data.result.customerName);
        
        setCustomerData(data.result)
    };

    const onSubmitCustomerHandler = async (values) => {
        console.log(values);
    }

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

    // const picData = useSelector((state: IStore) => selectCustomerPIC(state));
    // const brandSummaryData = useSelector((state: IStore) => selectBrandSummary(state));
    // const serviceSummaryData = useSelector((state: IStore) => selectServiceSummary(state));
    // const configItemData = useSelector((state: IStore) => selectConfigItem(state));
    // const collectionHistoryData = useSelector((state: IStore) => selectCollectionHistory(state));

    /** Search Sales */
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
        setSalesName(null);
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
    const [shareable, setShareable] = useState("FALSE");
    const [pmoCustomer, setPmoCustomer] = useState("FALSE");

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
    const days = ["All days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [daysArray, setDaysArray] = useState([]);
    const [isAllDaysChecked, setIsAllDaysChecked] = useState(false)

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

    const [minDate, setMinDate] = useState(0)
    const [maxDate, setMaxDate] = useState(0)
    const [remark, setRemark] = useState("")

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
    
    /** Invoicing requirement */
    const [invoicingConditionData, setInvoicingConditionData] = useState([]);

    const onAddInvoicingCondition = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewInvoicingCondition invoicingConditionData={invoicingConditionData} setInvoicingConditionData={setInvoicingConditionData} />,
            ModalSizeEnum.Small
          )
        );
    }, [dispatch, invoicingConditionData]);

    const deleteInvoicingCondition = useCallback((index: number): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp array={invoicingConditionData} setArray={setInvoicingConditionData} index={index} content="invoicing condition" />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch, invoicingConditionData]);

    /** Related customer */
    const [relatedCustomerData, setRelatedCustomerData] = useState([])

    const onAddRelatedCustomer = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewRelatedCondition relatedCustomerData={relatedCustomerData} setRelatedCustomerData={setRelatedCustomerData} />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch, relatedCustomerData]);
    
    const deleteRelatedCustomer = useCallback((index: number): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <DeletePopUp array={relatedCustomerData} setArray={setRelatedCustomerData} index={index} content="related customer" />,
            ModalSizeEnum.Tiny
          )
        );
      }, [dispatch, relatedCustomerData]);

    /** RelatedFile */
    const [relatedFileData, setRelatedFileData] = useState([]);

    const onAddRelatedFile = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalNewRelatedFile relatedFileData={relatedFileData} setRelatedFileData={setRelatedFileData} />,
            ModalSizeEnum.Small
          )
        );
      }, [dispatch, relatedFileData]);

    const deleteRelatedFile = useCallback((index: number): void => {
        dispatch(
        ModalFirstLevelActions.OPEN(
            <DeletePopUp array={relatedFileData} setArray={setRelatedFileData} index={index} content="related file" />,
            ModalSizeEnum.Tiny
        )
        );
    }, [dispatch, relatedFileData]);
    
    /** data yang perlu di get */
    useEffect(() => {
        // if(!Number.isNaN(1) || (1 === undefined)) {
        //     dispatch(CustomerPIC.requestGetCustomerPIC(1))
        //     dispatch(BrandSummary.requestBrandSummary(1))
        //     dispatch(ServiceSummary.requestServiceSummary(1))
        //     dispatch(InvoicingCondition.requestInvoicingCondition(1))
        //     dispatch(RelatedCustomer.requestRelatedCustomer(1))
        //     dispatch(RelatedFile.requestRelatedFile(1))
        //     dispatch(ConfigItem.requestConfigItem(1))
        //     dispatch(CollectionHistory.requestCollectionHistory(1))
        // }
    }, [dispatch])

    /** submit data baru */
    const postResponse = useSelector((state: IStore) => selectPostResponseCustomerSetting(state));
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));

    const onSubmitCustomerSettingHandler = async (values) => {
        setRemark(values.remark)
        
        /** post customer setting data */
        const NewCustomerSettingData = new CustomerSettingById({})
        NewCustomerSettingData.customerSettingID = 0;
        NewCustomerSettingData.customerID = customerData.customerID;
        NewCustomerSettingData.customerCategoryID = "CATEGORY";
        NewCustomerSettingData.shareable = shareable == "TRUE" ? true : false;
        NewCustomerSettingData.pmoCustomer = pmoCustomer == "TRUE" ? true : false;
        NewCustomerSettingData.createUserID = userLogin?.employeeID != null ? userLogin.employeeID : 0;
        NewCustomerSettingData.modifyUserID = userLogin?.employeeID != null ? userLogin.employeeID : 0;
        
        await dispatch(CustomerSetting.postCustomerSetting(NewCustomerSettingData));
    }

    const [isRequesting, setIsRequesting] = useState(false)

    useEffect(() => {
        if(postResponse.customerSettingID != undefined) {
            setIsRequesting(true)

            console.log(postResponse)
            console.log("submit setting data")
            console.log(invoicingConditionData)
            console.log(relatedCustomerData)
            console.log(relatedFileData)
            console.log(salesAssign)
            console.log(customerData)
            console.log(shareable, pmoCustomer)

            /** post sales assign */
            salesAssign.map((data) => {
                const NewAssignSales = new SalesAssignPostModel({});
                NewAssignSales.assignID = 0;
                NewAssignSales.SalesID = data.salesID;
                NewAssignSales.CustomerSettingID = postResponse.customerSettingID;
                NewAssignSales.AssignedBy = userLogin?.employeeID;
                NewAssignSales.createUserID = userLogin?.employeeID;
                NewAssignSales.modifyUserID = userLogin?.employeeID;
    
                dispatch(SalesAssign.postAssignedSales(NewAssignSales));
            })

            /** post invoicing schedule */
            const NewInvoicingSchedule = new InvoicingScheduleModel({});
            NewInvoicingSchedule.scheduleID = 0;
            NewInvoicingSchedule.customerSettingID = postResponse.customerSettingID;
            NewInvoicingSchedule.scheduleDays = daysArray.join(", ");
            NewInvoicingSchedule.remark = remark;
            NewInvoicingSchedule.minDate = minDate;
            NewInvoicingSchedule.maxDate = maxDate;
            NewInvoicingSchedule.createUserID = 0;
            NewInvoicingSchedule.modifyUserID = 0;

            dispatch(InvoicingSchedule.postInvoicingSchedule(NewInvoicingSchedule))

            /** post invoicing condition */
            invoicingConditionData.map((data) => {
                const NewInvoicingCondition = new InvoicingConditionModel({});
                NewInvoicingCondition.conditionID = 0;
                NewInvoicingCondition.customerSettingID = postResponse.customerSettingID;
                NewInvoicingCondition.projectType = data.projectType;
                NewInvoicingCondition.conditionName = data.conditionName;
                NewInvoicingCondition.createUserID = data.createUserID;
                NewInvoicingCondition.modifyUserID = data.modifyUserID;

                dispatch(InvoicingCondition.postInvoicingCondition(NewInvoicingCondition))
            })

            /** post related customer */
            relatedCustomerData.map((data) => {
                let NewRelatedCustomer = new RelatedCustomerPostModel({})
                NewRelatedCustomer.relatedID = 0;
                NewRelatedCustomer.customerSettingID = postResponse.customerSettingID;
                NewRelatedCustomer.relatedCustomerID = data.customerID;
                NewRelatedCustomer.createUserID = userLogin?.employeeID;
                NewRelatedCustomer.modifyUserID = userLogin?.employeeID;

                dispatch(RelatedCustomer.postRelatedCustomer(NewRelatedCustomer));
            })

            /** post related file */
            relatedFileData.map((data) => {
                let formData = new FormData();
                formData.append("customerSettingID", `${postResponse.customerSettingID}`);
                formData.append("documentName", data.documentName);
                formData.append("documentType", data.documentType);
                formData.append("file", data.file);
                formData.append("createUserID", data.createUserID == undefined ? "0" : data.createUserID);

                try {
                    const endpoint: string = environment.api.customer.replace(":controller", "CustomerSetting/RelatedFile");

                    const response = axios.post(endpoint, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    });
            
                } catch (error) {
                    console.error(error);
                }
            })

            dispatch(CustomerSetting.requestResetFilter())
            setCustomerName('');
            setCustomerName('');
            setCustomerData(undefined);
            setIsRequesting(false)
            dispatch(ToastsAction.add('Insert new customer setting data success!', ToastStatusEnum.Success));
        }
    }, [dispatch, axios, postResponse, remark])

    return (
        <Fragment>
            <Link to="/customer-setting" className="link">{"< Back to Customer Setting List"}</Link>

                <div className="form-container">
                    {/* judul add new customer setting */}
                    <p className="page-title grey">ADD NEW CUSTOMER SETTING</p>

                    <Divider></Divider>

                    {/* search customer name dan data customer */}
                    <div className="padding-horizontal customer-search-container">
                        <div>
                            <FinalForm
                                onSubmit={(values: any) => onSubmitCustomerHandler(values)}
                                render={({ handleSubmit }) => (
                                <Form onSubmit={() => handleSubmit}>
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
                            )}/>
                            <p className="customer-foot-note">Type customer name and press ENTER</p>
                        </div>

                        {(customerData != undefined) &&
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
                                )}/>
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
                    
                    {(customerData != undefined) ?
                        <LoadingIndicator isActive={isRequesting}>
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
                                            <TableNewCustomerSetting data={data.picData} header={data.picHeader} sequenceNum={true}/>
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
                                            <TableNewCustomerSetting data={data.brandData} header={data.brandHeader} sequenceNum={true}/>
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
                                            <TableNewCustomerSetting data={data.serviceData} header={data.serviceHeader} sequenceNum={true}/>
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
                                            <TableNewCustomerSetting data={data.salesHistoryData} header={data.salesHistoryHeader} sequenceNum={true}/>
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
                                            <TableNewCustomerSetting data={data.projectHistoryData} header={data.projectHistoryHeader} sequenceNum={false} />
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
                                        <TableNewCustomerSetting data={data.collectionHistoryData} header={data.collectionHistoryHeader} sequenceNum={false} />
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
                                        <TableNewCustomerSetting data={data.configItemData} header={data.configItemHeader} sequenceNum={false}/>
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <Divider></Divider>
                            
                            <div className="padding-horizontal setting-container">
                                <div className="sales-assign-container">
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
                                                        <CheckboxInvoicing label={day} value={day} disabled={isAllDaysChecked && day !== "All days"} style={{ marginRight: "1rem" }} onClick={() => checkDay(day)}/>
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
                                                <Field name="remark" component={RichTextEditor} placeholder="e.g. Remark" labelName="Remark" />  
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
                                                            <div className="trash-container" onClick={() => deleteInvoicingCondition(index)}>
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
                                                            <div className="trash-container" onClick={() => deleteRelatedCustomer(index)}>
                                                                <Icon className="trash-icon" name="trash alternate"/>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{data.customerName}</Table.Cell>
                                                        <Table.Cell>{data.customerAddress}</Table.Cell>
                                                        <Table.Cell>Category</Table.Cell>
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
                        </LoadingIndicator>
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
            </div>
        </Fragment>
    )
}

export default AddNewCustomerSettingPage;