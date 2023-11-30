import React, { Fragment, useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import styles from "./CustomerTable.module.scss";
import "./CustomerTableStyle.scss";
import CustomerTableRow from "./table-row/CustomerTableRow";
import ICustomerTable from "selectors/customer-setting/models/ICustomerTable";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import IStore from "models/IStore";
import { useSelector, useDispatch } from "react-redux";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { Dispatch } from "redux";
import { selectFunnels } from "selectors/funnel/FunnelSelector";

interface IProps {
  readonly tableData: any;
  readonly history: any;
  getRowData: (data: any) => void;
  data: any;
}

const CustomerTable: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const dispatch: Dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState("");
  const [direction, setDirection] = useState("ascending" as any);

  const reloads = (columns: any) => {
    setColumns(columns);
    setDirection(direction === "ascending" ? "descending" : "ascending");
    dispatch(
      CustomerActions.requestCustomerSett(
        activePage,
        pageSize,
        columns,
        direction
      )
    );
  };

  return (
    <Table
      sortable
      striped
      id={
        window.location.pathname === "/data-quality/customer-setting"
          ? "exporttosetting"
          : "exportosett"
      }
      data-cols-width={
        window.location.pathname === "/data-quality/customer-setting"
          ? "10,10,10,20,40,30,30,15,15,15"
          : "10,20,40,30,30,15,15,15,15,15"
      }
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center"></Table.HeaderCell>
          <Table.HeaderCell textAlign="center"></Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "CustomerGenID" ? direction : null}
            onClick={() => reloads("CustomerGenID")}
          >
            Cust. ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "CustomerCategory" ? direction : null}
            onClick={() => reloads("CustomerCategory")}
          >
            Cust. Category
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "CustomerName" ? direction : null}
            onClick={() => reloads("CustomerName")}
          >
            Customer Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "LastProjectName" ? direction : null}
            onClick={() => reloads("LastProjectName")}
          >
            Last Project Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "Shareable" ? direction : null}
            onClick={() => reloads("Shareable")}
          >
            Shareable
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "SalesAssign" ? direction : null}
            onClick={() => reloads("SalesAssign")}
          >
            Sales Assign
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "PMOCustomer" ? direction : null}
            onClick={() => reloads("PMOCustomer")}
          >
            PMO Cust.
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "RelatedCustomer" ? direction : null}
            onClick={() => reloads("RelatedCustomer")}
          >
            Related Cust
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "InvoiceCondition" ? direction : null}
            onClick={() => reloads("InvoiceCondition")}
          >
            Invoice Condition
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "Blacklist" ? direction : null}
            onClick={() => reloads("Blacklist")}
          >
            Blacklist
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "Holdshipment" ? direction : null}
            onClick={() => reloads("Holdshipment")}
          >
            Hold Shipment
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "CreateUserID" ? direction : null}
            onClick={() => reloads("CreateUserID")}
          >
            Create By
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "CreateDate" ? direction : null}
            onClick={() => reloads("CreateDate")}
          >
            Created Date
          </Table.HeaderCell>

          <Table.HeaderCell
            sorted={columns === "modifyUserID" ? direction : null}
            onClick={() => reloads("modifyUserID")}
          >
            Latest Modified By
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={columns === "modifyDate" ? direction : null}
            onClick={() => reloads("modifyDate")}
          >
            Latest Modified Date
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {props.tableData.rows.length === 0 ? (
        <Table.Body>
          <Table.Row>
            <Table.Cell
              colSpan={16}
              textAlign="center"
              className={styles.nodata}
            >
              No data
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ) : (
        props.tableData.rows.map((item) => (
          <CustomerTableRow
            history={props.history}
            key={item.customerSettingID}
            rowData={item}
            getRowData={props.getRowData}
            data={props.data}
          />
        ))
      )}
    </Table>
  );
};

export default CustomerTable;
