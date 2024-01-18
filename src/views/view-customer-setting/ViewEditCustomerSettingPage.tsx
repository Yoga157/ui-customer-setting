import React, { Fragment, useState, useCallback, useEffect, useRef} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ViewEditCustomer from "./components/base/ViewEditCustomer";

interface IProps {
    history: any;
}

interface routeParams {
    id: string;
}

const ViewEditCustomerSettingPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { id } = useParams<routeParams>();

    const customer = {
        customerSettingID: 1,
        customerID: 984,
        shareable: true,
        named: false,
        pmoCustomer: true,
        customerCategory: "Enterprise",
        customerName: "ANTILOPE MADJU PURI INDAH PT",
        customerAddress: "MAL PURI INDAH JL.PURI AGUNG PURI INDAH, KEMBANGAN SELATAN KEMBANGAN JAKARTA BARAT  DKI JAKARTA RAYA - 00000   Jakarta Barat",
        blacklist: false,
        holdshipment: false,
        salesName: "Rosa Amalia",
        avgAR: 0,
        shareableApprovalStatus: {
            requestedBy: "Rosa Amalia",
            requestedDate: "01 January 2023 14:38",
            approvalBy: "Rima Wulansari",
            approvalDate: "15 January 2023 14:38",
            approvalStatus: "rejected"
        }
    }
    
    /** Customer data */
    
    return (
      <ViewEditCustomer customer={customer} role={"Admin"}/>  
    )
}

export default ViewEditCustomerSettingPage;