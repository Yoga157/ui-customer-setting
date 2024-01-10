import React, { Fragment, useState, useCallback,} from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { Table, Icon } from "semantic-ui-react";
import ModalUserStories from "../../modal/modal-user-stories/ModalUserStories";

interface IProps {
    data: any[];
    setOpenCollectionHistory: (data: any) => void;
}

const TableProjectHistory: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { data, setOpenCollectionHistory } = props;

    /** success stories */
    const onViewEditCustomerStory = useCallback((id): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalUserStories id={Number(id)} />,
            ModalSizeEnum.Small
          )
        );
    }, [dispatch]);

    const scrollToTarget = (id) => {
        setTimeout(() => {
            setOpenCollectionHistory(true);
            const navbarElement = document.querySelector(".DisInlineBlock");
            const targetElement = document.getElementById(`${id}`);
        
            if (targetElement) {
                const targetRect = targetElement.getBoundingClientRect();
                const navbarRect = navbarElement.getBoundingClientRect();
                const scrollTop = document.documentElement.scrollTop;
                let targetPosition =  targetRect.top + scrollTop - navbarRect.height;
                console.log(targetPosition)
        
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
              });
            }
        }, 0)
    };

    return (
        <div className="wrapper-table" style={{ height: "fit-content"}}>
            <Table
            striped
            >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Funnel ID</Table.HeaderCell>
                    <Table.HeaderCell>SO ID</Table.HeaderCell>
                    <Table.HeaderCell>Project Name</Table.HeaderCell>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Sales Name</Table.HeaderCell>
                    <Table.HeaderCell>Sales Dept.</Table.HeaderCell>
                    <Table.HeaderCell>SO Close Date</Table.HeaderCell>
                    <Table.HeaderCell>SO Amount (IDR)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.length == 0 ?
                    <Table.Row>
                        <Table.Cell colSpan={16} textAlign="center">
                        No data
                        </Table.Cell>
                    </Table.Row>
                :
                    (data.map((data, index) => (
                    <Table.Row key={index}>
                            <Table.Cell textAlign="center">
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <div onClick={() => scrollToTarget(data.so) } style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#656DD1", padding: "0.5rem", borderRadius: "100%", width: "fit-content"}}>
                                        <Icon style={{ margin: "0", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", color:"white"}} name="eye"/>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#656DD1", padding: "0.5rem", borderRadius: "100%", width: "fit-content", cursor: "pointer"}} onClick={() => onViewEditCustomerStory(index)}>
                                        <Icon style={{ margin: "0", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", color:"white"}} name="user"/>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell textAlign="center">{data.funnelID}</Table.Cell>
                            <Table.Cell textAlign="center">{data.so}</Table.Cell>
                            <Table.Cell textAlign="center">{data.projectName}</Table.Cell>
                            <Table.Cell textAlign="center">{data.customerName}</Table.Cell>
                            <Table.Cell textAlign="center">{data.salesName}</Table.Cell>
                            <Table.Cell textAlign="center">{data.salesDepartment}</Table.Cell>
                            <Table.Cell textAlign="center">{data.soCloseDate}</Table.Cell>
                            <Table.Cell textAlign="center">{data.soAmount}</Table.Cell>
                    </Table.Row>
                    )))
                }
            </Table.Body>
            </Table>
        </div>
    )
}

export default TableProjectHistory;