import React, { Fragment, useState, useCallback, useEffect, useRef} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

interface IProps {
    accountStatus: string,
    isEmployeeOwnCustomer: boolean
}

const ClaimReleaseButton: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {   
    const { accountStatus, isEmployeeOwnCustomer } = props;
    console.log(accountStatus, isEmployeeOwnCustomer)

    return (
      <Fragment>
        {accountStatus == "No Name Account" &&
            <Button color="yellow" size="small" type="button" onClick={() => {}}><Icon name="check circle"/>Claim Account</Button>
        }

        {(accountStatus == "Named Account" && isEmployeeOwnCustomer) &&
            <Button color="red" size="small" type="button" onClick={() => {}}><Icon name="remove circle"/>Release Account</Button>
        }

        {(accountStatus == "Named Account" && !isEmployeeOwnCustomer) &&
            <Button color="yellow" size="small" type="button" onClick={() => {}}><Icon name="share"/>Request Shareable Account</Button>
        }

        {(accountStatus == "Shareable Account" && isEmployeeOwnCustomer) &&
            <Button color="red" size="small" type="button" onClick={() => {}}><Icon name="remove circle"/>Release Account</Button>
        }

      </Fragment>
    )
}

export default ClaimReleaseButton;