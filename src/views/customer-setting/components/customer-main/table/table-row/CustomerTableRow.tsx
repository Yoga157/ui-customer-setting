import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
  Table,
  Dropdown,
  Confirm,
  Icon,
  Button,
  Checkbox,
  TableCell,
} from "semantic-ui-react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import "./CustomerTableRowStyle.scss";
// import { SalesFormCard } from '../../form/index';
import AddSalesAssign from "../../form/form-create/FormAdd";
import RouteEnum from "constants/RouteEnum";
import * as CustomerSettActions from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  readonly rowData: any;
  readonly history: any;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTableRow: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );

  const [colorStatus, setColorStatus] = useState("grey" as any);
  const { rowData, getRowData } = props;

  const setRowData = (data) => {
    let checkData = props.data.find(
      (obj) => obj.customerGenID === data.customerGenID
    );

    if (checkData) {
      getRowData(
        props.data.filter(
          (selectedData) => selectedData.customerGenID !== data.customerGenID
        )
      );
    } else {
      getRowData([...props.data, data]);
    }
  };

  const reassignClick = () => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <AddSalesAssign rowData={[rowData]} />,
        ModalSizeEnum.Small
      )
    );
  };

  const onEdit = () => {
    props.history.push({
      pathname: RouteEnum.AddNewCustomerSetting,
      state: { rowData },
    });
  };

  useEffect(() => {
    console.log("Efect");
  }, []);

  return (
    <Fragment>
      <Table.Row key={rowData.CustomerSettingID}>
        <TableCell>
          <div>
            <label>
              <input
                type="checkbox"
                onClick={() => setRowData(rowData)}
              ></input>
            </label>
          </div>
        </TableCell>
        <Table.Cell width="1">
          <Dropdown pointing="left" icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item
                text="View/Edit"
                icon="edit outline"
                onClick={onEdit}
              />

              <Dropdown.Item
                text="Assign Sales"
                icon="users"
                onClick={reassignClick}
              />

              {rowData.status != "CANCEL" &&
                rowData.CustomerSettingID == "" && (
                  <Dropdown.Item text="Cancel" icon="remove circle" />
                )}
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.customerGenID}</Table.Cell>
        <Table.Cell>{rowData.customerCategory}</Table.Cell>
        <Table.Cell>{rowData.customerName}</Table.Cell>
        <Table.Cell>{rowData.lastProjectName}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.shareable}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.salesAssign}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.pmoCustomer}</Table.Cell>
        <Table.Cell textAlign="center">{rowData.relatedCustomer}</Table.Cell>
        <Table.Cell>{rowData.invoiceCondition}</Table.Cell>
        <Table.Cell textAlign="center">
          {rowData.blacklist === "Yes" ? (
            <Icon name="phone" color="red" />
          ) : (
            <Icon name="phone" color="green" />
          )}
        </Table.Cell>{" "}
        <Table.Cell textAlign="center">
          {rowData.holdshipment === "Yes" ? (
            <Icon name="truck" color="yellow" />
          ) : (
            <Icon name="truck" color="blue" />
          )}
        </Table.Cell>
        <Table.Cell textAlign="center">{rowData.createUserID}</Table.Cell>
        <Table.Cell>{rowData.createDate}</Table.Cell>
        <Table.Cell>{rowData.modifyUserID}</Table.Cell>
        <Table.Cell>{rowData.modifyDate}</Table.Cell>
      </Table.Row>
    </Fragment>
  );
};

export default CustomerTableRow;
