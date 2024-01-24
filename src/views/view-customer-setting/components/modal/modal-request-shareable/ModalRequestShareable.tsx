import React, { Fragment, useState, useCallback} from "react";
import "../Modal.scss"
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";

interface IProps {
    customer: any;
}

const ModalAcceptRequestShareableAccount: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { customer } = props;

    const onSubmitHandler = async (type: string) => {
        // console.log(data)
        let userLogin = JSON.parse(localStorage.getItem('userLogin'));

        dispatch(CustomerSetting.acceptRequestShareableAccount(customer.customerID, userLogin?.employeeID || 812, type.toUpperCase() == "APPROVE" ? true : false, userLogin?.employeeID || 812)).then(() => {
            dispatch(CustomerSetting.requestCustomerDataById(customer.customerID))
            dispatch(ModalAction.CLOSE());
        });

        // dispatch(CustomerSetting.acceptRequestShareableAccount(customer.customerID, 812, type.toUpperCase() == "APPROVE" ? true : false, 812)).then(() => {
        //     dispatch(CustomerSetting.requestCustomerDataById(customer.customerID))
        //     dispatch(ModalAction.CLOSE());
        // });
    }

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
      };

    return (
        <Fragment>
            <FinalForm
                onSubmit={onSubmitHandler}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                    <Grid.Row>
                        <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }}
                        >
                        <div style={{ padding: "0px" }}>
                            <img
                            className="ui centered medium"
                            src="/assets/info.png"
                            sizes="small"
                            />
                        </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row centered style={{ textAlign: "center" }}>
                        <span style={{ padding: "10px" }}>
                        Are you sure want to approve this shareable account request?
                        </span>
                        <p style={{  fontWeight: "bold", margin: 0 }}>{customer.customerName}</p>
                        <span>Request By <span style={{  fontWeight: "bold" }}>{customer.shareableApprovalStatus.requestedBy}</span></span>
                    </Grid.Row>
                    <Divider></Divider>
                    <div style={{ textAlign: "center" }}>
                        <Button className="MarBot10" type="button" color="red" onClick={() => onSubmitHandler("reject")}>
                        Reject
                        </Button>
                        <Button className="MarBot10" type="button" color="blue" onClick={() => onSubmitHandler("approve")}>
                        Approve
                        </Button>
                    </div>
                    </Form>
                )}
            />
        </Fragment>
    )
}

export default ModalAcceptRequestShareableAccount;