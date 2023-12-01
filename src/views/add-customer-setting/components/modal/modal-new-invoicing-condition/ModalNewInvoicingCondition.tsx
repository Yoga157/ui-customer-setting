import React, { Fragment, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button } from "views/components/UI";

interface IProps {
    history: any;
  }

const ModalNewInvoicingCondition: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [projectType, setProjectType] = useState("")
    const [documentInvoicing, setDocumentInvoicing] = useState("")

    const onSubmitProjectType = (data) => {

    }

    const onSubmitDocumentInvoicing = (data) => {

    }

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
      };

    return (
        <Fragment>
            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>ADD NEW INVOICING CONDITION</p>
            <Divider></Divider>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{ width: "49%" }}>
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
                                values={projectType}
                                mandatory={true}
                            />
                        </Form>
                    )}/>
                </div>

                <div style={{ width: "49%" }}>
                    <FinalForm
                        onSubmit={(values: any) => onSubmitDocumentInvoicing(values)}
                        render={({ handleSubmit, pristine, invalid }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="documentInvoicing"
                                component={DropdownClearInput}
                                // placeholder="Type customer name here.."
                                labelName="Document Invoicing"
                                // handleSearchChange={handleSearchChangeCustomer}
                                // onResultSelect={onResultSelectCustomer}
                                // results={customerResult}
                                values={projectType}
                                mandatory={true}
                            />
                        </Form>
                    )}/>
                </div>
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

export default ModalNewInvoicingCondition;