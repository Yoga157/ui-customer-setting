import React, { Fragment, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, FileUpload } from "views/components/UI";

interface IProps {
    history: any;
  }

const ModalNewRelatedFile: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [documentType, setDocumentType] = useState("")

    const onSubmitDocumentName = (data) => {

    }

    const onSubmitDocumentType = (data) => {

    }

    const onSubmitFile = (data) => {

    }

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
      };

    return (
        <Fragment>
            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>UPLOAD NEW FILE</p>
            <Divider></Divider>

            <div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
                <label htmlFor="documentName">Document Name <span style={{ color: "red" }}>*</span></label>
                <div>
                    <FinalForm
                        onSubmit={(values: any) => onSubmitDocumentName(values)}
                        render={({ handleSubmit, pristine, invalid }) => (
                        <Form onSubmit={handleSubmit}>
                            <Input name="documentName" style={{ width: "100%" }}/>
                        </Form>
                    )}/>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                <div style={{ width: "49%" }}>
                    <FinalForm
                        onSubmit={(values: any) => onSubmitDocumentType(values)}
                        render={({ handleSubmit, pristine, invalid }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="documentType"
                                component={DropdownClearInput}
                                // placeholder="Type customer name here.."
                                labelName="Document Type"
                                // handleSearchChange={handleSearchChangeCustomer}
                                // onResultSelect={onResultSelectCustomer}
                                // results={customerResult}
                                values={documentType}
                                mandatory={true}
                            />
                        </Form>
                    )}/>
                </div>

                <div style={{ width: "49%" }}>
                    <FinalForm
                        onSubmit={(values: any) => onSubmitFile(values)}
                        render={({ handleSubmit, pristine, invalid }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="uploadFile"
                                component={FileUpload}
                                // placeholder="Type customer name here.."
                                labelName="Upload File"
                                // handleSearchChange={handleSearchChangeCustomer}
                                // onResultSelect={onResultSelectCustomer}
                                // results={customerResult}
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

export default ModalNewRelatedFile;