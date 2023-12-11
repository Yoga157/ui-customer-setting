import environment from "environment";
import React, { Fragment, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, FileUpload } from "views/components/UI";
import input from "views/components/UI/Input/Input";
import axios from "axios";

interface IProps {
    customerSettingID: number;
}

const ModalNewRelatedFile: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [documentType, setDocumentType] = useState("")
    const [documentName, setDocumentName] = useState("")
    const [uploadFile, setUploadFile] = useState("")

    const documentTypeData = [
        {
            text: "Diagram",
            value: "Diagram"
        },
        {
            text: "Diagram Lainnya",
            value: "Diagram Lainnya"
        },
    ]

    const onSubmitDocument = async (data) => {
        console.log(uploadFile)
        console.log(documentName)
        console.log(data)

        let formData = new FormData();
        formData.append("customerSettingID", `${props.customerSettingID}`);
        formData.append("documentType", data.documentType);
        formData.append("file", uploadFile);

        try {
            const endpoint: string = environment.api.customer.replace(":controller", "CustomerSetting/RelatedFile");

            const response = await axios.post(endpoint, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
            setUploadFile("")
            dispatch(ModalAction.CLOSE());
        } catch (error) {
            console.error(error);
        }
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

            <FinalForm
                onSubmit={(values: any) => onSubmitDocument(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
                        <label htmlFor="documentName">Document Name <span style={{ color: "red" }}>*</span></label>
                        <div>
                            <Input name="documentName" style={{ width: "100%" }} onChange={(e) => setDocumentName(e.target.value)}/> 
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                        <div style={{ width: "49%" }}>
                            <Field
                                name="documentType"
                                component={DropdownClearInput}
                                placeholder="Select document type..."
                                labelName="Document Type"
                                options={documentTypeData}
                                values={documentType}
                                mandatory={true}
                            />
                        </div>

                        <div style={{ width: "49%" }}>
                            <Field
                                name="uploadFile"
                                component={FileUpload}
                                labelName="Upload File"
                                onChanged={(e) => setUploadFile(e.target.files[0])}
                                mandatory={true}
                            />
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
            </Form>
            )}/>
        </Fragment>
    )
}

export default ModalNewRelatedFile;