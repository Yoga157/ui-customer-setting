import React, { Fragment, useState, useCallback, useEffect, useRef} from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModalClaimAccount from "../modal/modal-claim-account/ModalClaimAccount";
import ModalReleaseAccount from "../modal/modal-release-account/ModalReleaseAccount";
import ModalRequestShareableAccount from "../modal/modal-request-shareable/ModalRequestShareable";


interface IProps {
    customer: any,
    accountStatus: string,
    isEmployeeOwnCustomer: boolean,
    role: string
}

const ClaimReleaseButton: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {   
    const dispatch: Dispatch = useDispatch();
    const { customer, accountStatus, isEmployeeOwnCustomer, role } = props;
    
    /** Claim Account */
    const onClaimAccount = useCallback((): void => {
        dispatch(
          ModalFirstLevelActions.OPEN(
            <ModalClaimAccount customer={customer} />,
            ModalSizeEnum.Tiny
          )
        );
    }, [dispatch]);

    /** Release Account */
    const onReleaseAccount = useCallback((): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalReleaseAccount customer={customer} accountStatus={accountStatus} />,
          ModalSizeEnum.Tiny
        )
      );
    }, [dispatch]);

    /** Request Shareable Account */
    const onRequestShareableAccount = useCallback((): void => {
      dispatch(
        ModalFirstLevelActions.OPEN(
          <ModalRequestShareableAccount customer={customer} />,
          ModalSizeEnum.Tiny
        )
      );
    }, [dispatch]);
    

    return (
      <Fragment>
        
        {/* claim no name account */}
        {(accountStatus == "No Name Account" && role.toUpperCase() == "SALES") &&
            <Button color="yellow" size="small" type="button" onClick={() => onClaimAccount()}><Icon name="check circle"/>Claim Account</Button>
        }

        {/* release named account */}
        {(accountStatus == "Named Account" && isEmployeeOwnCustomer && role.toUpperCase() == "SALES") &&
            <Button color="red" size="small" type="button" onClick={() => onReleaseAccount()}><Icon name="remove circle"/>Release Account</Button>
        }

        {/* request shareable account */}
        {(accountStatus == "Named Account" && !isEmployeeOwnCustomer && role.toUpperCase() == "SALES") &&
            <Button color="yellow" size="small" type="button" onClick={() => onRequestShareableAccount()}><Icon name="share"/>Request Shareable Account</Button>
        }

        {/* release shareable account */}
        {(accountStatus == "Shareable Account" && isEmployeeOwnCustomer && role.toUpperCase() == "SALES") &&
            <Button color="red" size="small" type="button" onClick={() => onReleaseAccount()}><Icon name="remove circle"/>Release Account</Button>
        }

        {/* claim shareable account */}
        {(accountStatus == "Shareable Account" && !isEmployeeOwnCustomer && role.toUpperCase() == "SALES") &&
            <Button color="yellow" size="small" type="button" onClick={() => {}}><Icon name="check circle"/>Claim Account</Button>
        }

        {/* accept shareable request */}
        {(accountStatus == "Shareable Account" && role.toUpperCase() == "ADMIN") &&
          <div style={{ display: "flex", flexDirection: "row", alignContent: "center"}}>
            <p style={{ color: "red", fontStyle: "italic", marginBottom: 0, marginRight: "1rem", padding: 0, alignSelf: "center" }}>Request by {customer.shareableApprovalStatus?.requestedBy}</p>
            <Button color="red" size="small" type="button" onClick={() => {}}><Icon name="share"/>Accept Shareable Request</Button>
          </div>
        }

      </Fragment>
    )
}

export default ClaimReleaseButton;