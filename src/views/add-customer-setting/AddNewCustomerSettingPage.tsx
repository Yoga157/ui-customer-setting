import React, { Fragment, useState, useCallback} from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { Divider, Dropdown, Form, Label, Icon, Table, Button, Checkbox } from "semantic-ui-react";
import { SearchInput, DropdownClearInput, CheckBox as CheckboxInvoicing, RichTextEditor } from "views/components/UI";

interface IProps {
    history: any;
  }

const AddNewCustomerSettingPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    /** Search customer */

    const [customerName, setCustomerName] = useState('');
    const customerData = [
        {
            title: "A W Faber Castell",
            customerName: "A W Faber Castell",
            customerGenID: 123
        },
        {
            title: "ADARO ENERGY INDONESIA TBK, PT",
            customerName: "ADARO ENERGY INDONESIA TBK, PT",
            customerGenID: 124
        },
        {
            title: "AFFINITY HEALTH INDONESIA PT",
            customerName: "AFFINITY HEALTH INDONESIA PT",
            customerGenID: 125
        },
        {
            title: "PT. HAWLETT PACKARD",
            customerName: "PT. HAWLETT PACKARD",
            customerGenID: 126
        },
    ]
    const [customerResult, setCustomerResult] = useState(customerData);

    const [customerCategory, setCustonerCategory] = useState("");

    const handleSearchChangeCustomer = (data) => {
        setCustomerName(data);
        if(data.length >= 2) {
            setCustomerResult(customerData.filter((sales) => sales.customerName.includes(data)))
            console.log(customerResult)
            // results.filter(({name, city}) => filters.name.some(n => name.includes(n)) && filters.city.includes(city));
        } else if(data.length == 0) {
            setCustomerResult(customerData);
        }
    }

    const onResultSelectCustomer = (data: any) => {
        // console.log(data);
        setCustomerName(data.result.customerName);
        // console.log("select result: ", customerName);
        // setCustomerId(data.result.price);
    };


    const onSubmitCustomerHandler = async (e) => {
        console.log(e);
        console.log(customerName);
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

    const handlePICList = () => {
        if(!openPicList) {
            setOpenPicList(true);
        } else {
            setOpenPicList(false);
        }
    }

    const handleBrandSummary = () => {
        if(!openBrandSummary) {
            setOpenBrandSummary(true);
        } else {
            setOpenBrandSummary(false);
        }
    }

    const handleServiceSummary = () => {
        if(!openServiceSummary) {
            setOpenServiceSummary(true);
        } else {
            setOpenServiceSummary(false);
        }
    }

    const handleSalesHistory = () => {
        if(!openSalesHistory) {
            setOpenSalesHistory(true);
        } else {
            setOpenSalesHistory(false);
        }
    }

    const handleProjectHistory = () => {
        if(!openProjectHistory) {
            setOpenProjectHistory(true);
        } else {
            setOpenProjectHistory(false);
        }
    }

    const handleCollectionHistory = () => {
        if(!openCollectionHistory) {
            setOpenCollectionHistory(true);
        } else {
            setOpenCollectionHistory(false);
        }
    }
    
    const handleConfigItem = () => {
        if(!openConfigItem) {
            setOpenConfigItem(true);
        } else {
            setOpenConfigItem(false);
        }
    }

    /** Search Sales */
    const [salesName, setSalesName] = useState('');
    const salesData = [
        {
            title: "Rosa Amalia",
            salesName: "Rosa Amalia",
            salesID: 1
        },
        {
            title: "Anjar Whayudi",
            salesName: "Anjar Wahyudi",
            salesID: 2
        },
        {
            title: "Yoga Zikri Spautra",
            salesName: "Yoga Zikri Saputra",
            salesID: 3
        },
        {
            title: "Rosa Amalia",
            salesName: "Rosa Amalia",
            salesID: 4
        },
        {
            title: "Anjar",
            salesName: "Anjar",
            salesID: 5
        },
        {
            title: "Agoy",
            salesName: "Agoy",
            salesID: 6
        },
    ]
    
    const [salesAssign, setSalesAssign] = useState([]);
    const [salesResult, setSalesResult] = useState(salesData);

    const handleSearchChangeSales = (data) => {
        setSalesName(data);
        if(data.length >= 2) {
            setSalesResult(salesData.filter((sales) => sales.salesName.includes(data)))
            console.log(customerResult)
            // results.filter(({name, city}) => filters.name.some(n => name.includes(n)) && filters.city.includes(city));
        } else if(data.length == 0) {
            setSalesResult(salesData);
        }
    }

    const onResultSelectSales = (data: any) => {
        // console.log(data);
        setSalesName("");
        setSalesAssign([...salesAssign, {
            salesName: data.result.salesName,
            salesID: data.result.salesID
        }])
        // console.log("select result: ", customerName);
        // setCustomerId(data.result.price);
    };

    const onSubmitSalesHandler = async (e) => {
        console.log(e);
        console.log(salesName);
    }

    const onDeleteSalesAssign = (salesID) => {
        const arrayFltered = salesAssign.filter(sales => sales.salesID !== salesID);
        setSalesAssign(arrayFltered);
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

        console.log(daysArray)
    }

    /** Project Type */
    const onSubmitProjectType = (data) => {

    }

    return (
        <Fragment>
            <Link to="/customer-setting" style={{fontSize: "1.25rem", color:"grey", fontWeight:"bold"}}>{"< Back to Customer Setting List"}</Link>

            <div style={{ margin:"2.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "1rem" }}>
                    {/* judul add new customer setting */}
                    <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold", padding:"14px 2rem 0 2rem" }}>ADD NEW CUSTOMER SETTING</p>

                    <Divider></Divider>

                    {/* search customer name dan data customer */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding:"0 2rem"}}>
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
                                        results={customerResult}
                                        values={customerName}
                                        mandatory={true}
                                    />
                                </Form>
                            )}/>
                            <p style={{ fontStyle: "italic", color: "#A9B0BC", marginTop: "0", fontSize: "12px"}}>Type customer name and press ENTER</p>
                        </div>

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

                        <div style={{ display: "flex", flexDirection: "column", textAlign: "center"}}>
                            <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>CustomerID</label>
                            <p style={{ color: "#55637A", fontSize: "24px", fontWeight: "bold"}}>12345</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>Blacklist</label>
                            <Label color="teal" style={{ borderRadius: "20px", width: "fit-content"}}>
                                <Icon name='address book'/>No
                            </Label>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>Holdshipment</label>
                            <Label color="purple" style={{ borderRadius: "20px", width: "fit-content" }}>
                                <Icon name='truck'/>No
                            </Label>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", textAlign: "center"}}>
                            <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>Avg. AR (days)</label>
                            <p style={{ color: "#55637A", fontSize: "24px", fontWeight: "bold"}}>12.5</p>
                        </div>
                    </div>

                    <div style={{ margin: "14px 0", padding:"0 2rem"}}>
                        <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>Address</label>
                        <p style={{ color: "#55637A", fontSize: "20px"}}>Jalani saja dulu</p>
                    </div>
                    
                    {/* data get mengenai customer */}
                    <div style={{ padding:"0 2rem" }}>
                        <div style={{ backgroundColor: "#FFFB9A", borderRadius: "1rem", color: "#55637A"}}>
                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handlePICList()}>
                                <span style={{ fontWeight: "bold"}}>CUSTOMER PIC LIST</span>
                                {openPicList ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>
                            
                            {openPicList &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>No</Table.HeaderCell>
                                            <Table.HeaderCell>PIC Name</Table.HeaderCell>
                                            <Table.HeaderCell>PIC Title</Table.HeaderCell>
                                            <Table.HeaderCell>Phone</Table.HeaderCell>
                                            <Table.HeaderCell>Email</Table.HeaderCell>
                                            <Table.HeaderCell>Latest Project</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleBrandSummary()}>
                                <span style={{ fontWeight: "bold"}}>BRAND SUMMARY</span>
                                {openBrandSummary ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>

                            {openBrandSummary &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>No</Table.HeaderCell>
                                            <Table.HeaderCell>Brand Name</Table.HeaderCell>
                                            <Table.HeaderCell>Years</Table.HeaderCell>
                                            <Table.HeaderCell>% Purchase</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleServiceSummary()}>
                                <span style={{ fontWeight: "bold"}}>SERVICE SUMMARY</span>
                                {openServiceSummary ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>

                            {openServiceSummary &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>No</Table.HeaderCell>
                                            <Table.HeaderCell>Service Name</Table.HeaderCell>
                                            <Table.HeaderCell>Years</Table.HeaderCell>
                                            <Table.HeaderCell>% Purchase</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleSalesHistory()}>
                                <span style={{ fontWeight: "bold"}}>SALES ASSIGN HISTORY</span>
                                {openSalesHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>

                            {openSalesHistory &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>No</Table.HeaderCell>
                                            <Table.HeaderCell>Sales Name</Table.HeaderCell>
                                            <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                            <Table.HeaderCell>Year Assign</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleProjectHistory()}>
                                <span style={{ fontWeight: "bold"}}>PROJECT CUSTOMER HISTORY</span>
                                {openProjectHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>

                            {openProjectHistory &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>View Payment</Table.HeaderCell>
                                            <Table.HeaderCell>Funnel ID</Table.HeaderCell>
                                            <Table.HeaderCell>SO ID</Table.HeaderCell>
                                            <Table.HeaderCell>TOP Number</Table.HeaderCell>
                                            <Table.HeaderCell>Project Name</Table.HeaderCell>
                                            <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                            <Table.HeaderCell>Sales Name</Table.HeaderCell>
                                            <Table.HeaderCell>Sales Dept.</Table.HeaderCell>
                                            <Table.HeaderCell>SA Date</Table.HeaderCell>
                                            <Table.HeaderCell>SO Close Date</Table.HeaderCell>
                                            <Table.HeaderCell>SO Amount (IDR)</Table.HeaderCell>
                                            <Table.HeaderCell>Last Collection Date</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleCollectionHistory()}>
                                <span style={{ fontWeight: "bold"}}>COLLECTION HISTORY</span>
                                {openCollectionHistory ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>
                            <Divider style={{ margin: "0px"}}></Divider>

                            {openCollectionHistory &&
                                <>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
                                            <Table.HeaderCell>Invoice Date</Table.HeaderCell>
                                            <Table.HeaderCell>SO ID</Table.HeaderCell>
                                            <Table.HeaderCell>TOP Number</Table.HeaderCell>
                                            <Table.HeaderCell>Collection Amount (IDR)</Table.HeaderCell>
                                            <Table.HeaderCell>Collection Date</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <Divider style={{ margin: "0px"}}></Divider>
                                </>
                            }

                            <div style={{ padding: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", cursor: "pointer"}} onClick={() => handleConfigItem()}>
                                <span style={{ fontWeight: "bold"}}>CONFIG ITEM</span>
                                {openConfigItem ? <Icon name="triangle down"/> : <Icon name="triangle right"/>}
                            </div>

                            {openConfigItem &&
                                <>
                                <Divider style={{ margin: "0px"}}></Divider>
                                <div style={{ padding: "1rem", backgroundColor: "#FFEF9A"}}>
                                <Table
                                    striped
                                    >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Product Number</Table.HeaderCell>
                                            <Table.HeaderCell>SO Number</Table.HeaderCell>
                                            <Table.HeaderCell>PO Number</Table.HeaderCell>
                                            <Table.HeaderCell>PO Date</Table.HeaderCell>
                                            <Table.HeaderCell>ETA By. Purchasing</Table.HeaderCell>
                                            <Table.HeaderCell>ETA By. PMO</Table.HeaderCell>
                                            <Table.HeaderCell>DO Date</Table.HeaderCell>
                                            <Table.HeaderCell>Description Item</Table.HeaderCell>
                                            <Table.HeaderCell>Brand</Table.HeaderCell>
                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                            <Table.HeaderCell>Cust. Warranty Start Date</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell colSpan={16} textAlign="center">
                                            No data
                                            </Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                </>
                            }
                        </div>
                    </div>

                    <Divider></Divider>
                    
                    <div style={{ display: "flex", flexDirection: "column", padding: "0 2rem" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", width: "50%" }}>
                                <FinalForm
                                    onSubmit={(values: any) => onSubmitSalesHandler(values)}
                                    render={({ handleSubmit, pristine, invalid }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Field
                                            name="salesAssign"
                                            component={SearchInput}
                                            placeholder="Search sales name here.."
                                            labelName="Search sales to assign"
                                            handleSearchChange={handleSearchChangeSales}
                                            onResultSelect={onResultSelectSales}
                                            results={salesResult}
                                            values={salesName}
                                            mandatory={true}
                                        />
                                    </Form>
                                )}/>
                                <Button color='purple' content='Assign Me' style={{ height: "fit-content", marginLeft: "2rem"}}/>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                <Divider style={{ margin: "0px"}}/>

                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0.5rem"}}>
                                    <p style={{ margin: 0 }}>Shareable customer</p>
                                    <div><span>OFF</span><Checkbox toggle style={{ margin: "0 0.5rem"}}></Checkbox><span>ON</span></div>
                                </div>

                                <Divider style={{ margin: "0px"}}/>

                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "0.5rem"}}>
                                    <p style={{ margin: 0 }}>PMO customer</p>
                                    <div><span>OFF</span><Checkbox toggle style={{ margin: "0 0.5rem"}}></Checkbox><span>ON</span></div>
                                </div>

                                <Divider style={{ margin: "0px"}}/>
                            </div>
                        </div>

                        <div style={{ width: "50%" }}>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {salesAssign.map((data) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "row", width: "fit-content", margin: "0 0.5rem 0.5rem 0" }} key={data.salesID}>
                                            <div style={{ backgroundColor: "#DCDCDC", borderRadius: "2rem 0 0 2rem", padding: "0.75rem"}}>
                                                {data.salesName}
                                            </div>
                                            <div style={{ backgroundColor: "#C8C8C8", borderRadius: "0 2rem 2rem 0", padding: "0.75rem"}} onClick={() => onDeleteSalesAssign(data.salesID)}>
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

                    <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold", padding:"0 2rem" }}>INVOICING SCHEDULE SETTING</p>

                    <Divider></Divider>

                    <div style={{ padding: "0 2rem" }}>
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
                            <div style={{ display: "flex", flexDirection: "row"}}>
                                {days.map((day) => {
                                    return (
                                        <CheckboxInvoicing label={day} value={day} disabled={isAllDaysChecked && day !== "All days"} style={{ marginRight: "1rem" }} onClick={() => checkDay(day)}/>
                                    )
                                })}
                            </div>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: "14px" }}>
                            <div style={{ backgroundColor: "#DCDCDC", display: "flex", flexDirection: "column", width: "fit-content", height: "fit-content", padding: "1rem", borderRadius: "1rem", marginRight: "1rem"}}>
                                <p style={{ color: "#55637A", fontWeight: "bold" }}>Invoicing Date Range <span style={{ color: "red"}}>*</span></p>
                                <div style={{ display: "flex", flexDirection: "row"}}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "7rem", marginRight: "1rem"}}>
                                        <label htmlFor="minDate">Min. Date(Day)</label>
                                        <input name="minDate"/>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "7rem"}}>
                                        <label htmlFor="maxDate">Max. Date(Day)</label>
                                        <input name="maxDate"/>
                                    </div>
                                </div>
                            </div>

                            <div style={{ width: "100%" }}>
                                <FinalForm
                                    onSubmit={(values: any) => onSubmitSalesHandler(values)}
                                    render={({ handleSubmit, pristine, invalid }) => (
                                    <Form onSubmit={handleSubmit} >
                                        <Field name="remark" component={RichTextEditor} placeholder="e.g. Remark" labelName="Remark" />
                                    </Form>
                                )}/>
                            </div>
                        </div>
                    </div>

                    <Divider></Divider>

                    <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold", padding:"0 2rem" }}>INVOICING CONDITION</p>

                    <Divider></Divider>

                    <div style={{ padding: "0 2rem" }}>
                        <div>
                            <FinalForm
                                onSubmit={(values: any) => onSubmitProjectType(values)}
                                render={({ handleSubmit, pristine, invalid }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        name="projectType"
                                        component={DropdownClearInput}
                                        // placeholder="Type customer name here.."
                                        labelName="Project Type"
                                        // handleSearchChange={handleSearchChangeCustomer}
                                        // onResultSelect={onResultSelectCustomer}
                                        // results={customerResult}
                                        values={customerName}
                                        mandatory={true}
                                    />
                                </Form>
                            )}/>

                            <Button></Button>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default AddNewCustomerSettingPage;