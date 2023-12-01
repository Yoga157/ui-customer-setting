import React, { Fragment, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Label, Icon, Divider, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";

interface IProps {
    history: any;
  }

const ModalNewRelatedCondition: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [customerName, setCustomerName] = useState();
    const [documentInvoicing, setDocumentInvoicing] = useState("")

    const onSubmitCustomerName = (data) => {

    }

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
      };

    return (
        <Fragment>
            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>ADD NEW RELATED CUSTOMER</p>
            <Divider></Divider>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                <div style={{ width: "49%" }}>
                    <FinalForm
                        onSubmit={(values: any) => onSubmitCustomerName(values)}
                        render={({ handleSubmit, pristine, invalid }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="customerName"
                                component={DropdownClearInput}
                                // placeholder="Type customer name here.."
                                labelName="Customer Name"
                                // handleSearchChange={handleSearchChangeCustomer}
                                // onResultSelect={onResultSelectCustomer}
                                // results={customerResult}
                                values={customerName}
                                mandatory={true}
                            />
                        </Form>
                    )}/>
                    <p style={{ fontStyle: "italic", color: "#A9B0BC", marginTop: "0", fontSize: "12px"}}>Type customer name and press ENTER</p>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "14px 0"}}>
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

            <div style={{ margin: "14px 0" }}>
                <label style={{ marginRight: '10px', marginBottom: "5px", color: "#A0A8B3" }}>Address</label>
                <p style={{ color: "#55637A", fontSize: "20px"}}>Jalani saja dulu</p>
            </div>

            <Divider></Divider>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Button
                    textAlign="center"
                    className="MarBot10"
                    type="submit"
                    color="blue"
                >
                    Submit
                </Button>
                <Button type="button" onClick={cancelClick}>
                Cancel
                </Button>
            </div>
        </Fragment>
    )
}

export default ModalNewRelatedCondition;