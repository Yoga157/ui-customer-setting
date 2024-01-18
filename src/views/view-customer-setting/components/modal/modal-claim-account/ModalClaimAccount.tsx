import React, { Fragment, useState, useCallback} from "react";
import "../Modal.scss"
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions";
import CustomerClaimAccount from "stores/customer-setting/models/CustomerClaimAccount";

interface IProps {
    customer: any;
}

const ModalClaimAccount: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { customer } = props;

    const onSubmitHandler = async (data: any) => {
        let userLogin = JSON.parse(localStorage.getItem('userLogin'));
    // createDate?: string = null;
    // modifyUserID: number = 0;
    // modifyDate?: Date = undefined;
        const PostCustomerSetting = new CustomerClaimAccount({});
        PostCustomerSetting.customerSettingID = 0;
        PostCustomerSetting.customerID = customer.customerID;
        PostCustomerSetting.customerCategory = customer.customerCategory;
        PostCustomerSetting.salesID = 850;
        PostCustomerSetting.shareable = false;
        PostCustomerSetting.named = true;
        PostCustomerSetting.pmoCustomer = customer.pmoCustomer;
        PostCustomerSetting.status = "approve";
        PostCustomerSetting.requestedBy = 850;
        PostCustomerSetting.createUserID = userLogin?.employeeID || 850;
        PostCustomerSetting.modifyUserID =  userLogin?.employeeID || 850;

        dispatch(CustomerSetting.claimAccount(PostCustomerSetting));
        dispatch(ModalAction.CLOSE());
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
                        Are you sure you want to claim this account?
                        </span>
                        <p style={{  fontWeight: "bold" }}>{customer.customerName}</p>
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
        </Fragment>
    )
}

export default ModalClaimAccount;