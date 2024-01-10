import environment from "environment";
import React, { Fragment, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Form, Input, Label } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { DropdownClearInput, Button, FileUpload, RichTextEditor } from "views/components/UI";
import input from "views/components/UI/Input/Input";
import axios from "axios";

interface IProps {
    id: number;
}

const ModalUserStories: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const [story, setStory] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    console.log(props.id);

    const editLog = [
        {
            name: "Rosa Amalia",
            department: "CS",
            date: "02 January 2024"
        },
        {
            name: "Ina Nur Astuti",
            department: "CSI",
            date: "24 December 2023"
        },
        {
            name: "Yoga Maulana",
            department: "CS",
            date: "20 December 2023"
        },
    ]

    const onSubmitStory = async (values) => {
        console.log(values)
    }

    return (
        <Fragment>
            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>VIEW/EDIT CUSTOMER SUCCESS STORIES</p>
            <Divider></Divider>

            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>CUSTOMER STORIES</p>

            <FinalForm
                onSubmit={(values: any) => onSubmitStory(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit} >
                    <Field name="story" defaultValue={story} value={story} component={RichTextEditor} placeholder="e.g. User Story" />  
                    <label style={{ color: "#A0A8B3", fontStyle: "italic" }}>30 Characters Minimun</label>
            </Form>
            )}/>

            <div style={{ color: "#8992A1", backgroundColor: "#E1E1E1", padding: "0.5rem 0", fontStyle: "italic", fontSize: "10px", marginTop: "1rem" }}>
                {editLog.map((data, index) => {
                    return (
                        <p key={index}>Modified by {data.name} ({data.department}) - {data.date}</p>
                    )
                })}
            </div>

        </Fragment>
    )
}

export default ModalUserStories;