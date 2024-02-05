import environment from "environment";
import React, { Fragment, useState, useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Button, Divider, Form } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { RichTextEditor } from "views/components/UI";
import * as ProjectHistory from "stores/project-history/ProjectHistoryActivityActions"
import CustomerStoryPostModel from "stores/project-history/models/CustomerStoryPostModel";

interface IProps {
    funnelID: number;
    customerID: number;
    successStory: string;
    modifiedStoryBy: any[];
}

const ModalUserStories: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { funnelID, customerID, successStory, modifiedStoryBy } = props;
    const [story, setStory] = useState(successStory)
    const [charLength, setCharLength] = useState(0);
    const [error, setError] = useState(false)

    useEffect(() => {
        const doc = new DOMParser().parseFromString(story, 'text/html');
        let teks = doc.body.textContent == "null" ? "" : doc.body.textContent;

        setCharLength(teks.length)

        if(charLength < 30) {
            setError(true)
        } else {
            setError(false)
        }
    }, [story, charLength])

    const onChangeStory = (content : any) => {
        setStory(content)
    }

    const onSubmitStory = async (values) => {
        let userLogin = JSON.parse(localStorage.getItem('userLogin'));

        let postUserStory = new CustomerStoryPostModel({});
        postUserStory.storyID = 0;
        postUserStory.funnelID = funnelID;
        postUserStory.story = story;
        postUserStory.createUserID = userLogin?.employeeID || 850;
        postUserStory.createDate = new Date();

        dispatch(ProjectHistory.postInvoicingSchedule(postUserStory)).then(() => {
            dispatch(ProjectHistory.requestProjectHistory(customerID))
            dispatch(ModalAction.CLOSE());
        });
    }

    const cancelClick = () => {
        dispatch(ModalAction.CLOSE());
      };

    return (
        <Fragment>
            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>VIEW/EDIT CUSTOMER SUCCESS STORIES</p>
            <Divider></Divider>

            <p style={{ textAlign: "left", margin:"0", color: "#55637A", fontWeight: "bold" }}>CUSTOMER STORIES</p>

            <FinalForm
                onSubmit={(values: any) => onSubmitStory(values)}
                render={({ handleSubmit, pristine, invalid }) => (
                <Form onSubmit={handleSubmit}>
                    
                    <Field name="story" initialValue={story} component={RichTextEditor} placeholder="e.g. User Story" input={{value: story, onChange: onChangeStory}} />
                    
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label style={{ color: error ? "red" : "#A0A8B3", fontStyle: "italic" }}>{error ? "Not meeting the minimum limit of 30 characters" : "30 Characters Minimum"}</label>
                        <label style={{ color: "#A0A8B3", fontStyle: "italic" }}>{charLength} Characters</label>
                    </div>

                    {modifiedStoryBy.length > 0 &&
                        <div style={{ color: "#8992A1", backgroundColor: "#E1E1E1", padding: "0.5rem 0", fontStyle: "italic", fontSize: "10px", marginTop: "1rem" }}>
                            {modifiedStoryBy.map((data, index) => {
                                return (
                                    <p key={index}>Modified by {data}</p>
                                )
                            })}
                        </div>
                    }

                    <Divider></Divider>
                    <div style={{ textAlign: "center" }}>
                        <Button type="button" onClick={cancelClick}>
                        Cancel
                        </Button>
                        <Button className="MarBot10" type="submit" color="blue" disabled={error}>
                        Submit
                        </Button>
                    </div>
                </Form>
            )}/>


        </Fragment>
    )
}

export default ModalUserStories;