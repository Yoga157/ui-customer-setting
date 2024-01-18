import React, { Fragment, useState, useCallback} from "react";
import "../Modal.scss"
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";

interface IProps {
    customer: any;
    accountStatus: string;
}

const ModalReleaseAccount: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { customer, accountStatus } = props;

    const onSubmitHandler = async (data: any) => {
        if(accountStatus.toUpperCase() == "NAMED ACCOUNT") {
            console.log("submit named account")
        } else if(accountStatus.toUpperCase() == "SHAREABLE ACCOUNT") {
            console.log("submit shareable account")
        }

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
                        Are you sure you want to release this {accountStatus.toLowerCase()}?
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

export default ModalReleaseAccount;