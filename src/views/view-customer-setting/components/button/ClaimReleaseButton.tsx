import React, { Fragment, useState, useCallback, useEffect, useRef} from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalClaimAccount from "../modal/modal-claim-account/ModalClaimAccount";


interface IProps {
    customer: any,
    accountStatus: string,
    isEmployeeOwnCustomer: boolean
}

const ClaimReleaseButton: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {   
    const dispatch: Dispatch = useDispatch();
    const { customer, accountStatus, isEmployeeOwnCustomer } = props;
    
    /** Claim Account */
    const onClaimAccount = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalClaimAccount customer={customer} />,
            ModalSizeEnum.Tiny
          )
        );
    }, [dispatch]);

    return (
      <Fragment>
        {accountStatus == "No Name Account" &&
            <Button color="yellow" size="small" type="button" onClick={() => onClaimAccount()}><Icon name="check circle"/>Claim Account</Button>
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