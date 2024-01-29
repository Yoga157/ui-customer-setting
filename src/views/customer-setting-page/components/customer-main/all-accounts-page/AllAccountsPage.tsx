import React, { Fragment, useEffect, useState } from "react";
import { Grid, Checkbox } from "semantic-ui-react";
import CustomerTable from "./components/allaccountspage-main/table/CustomerTable";
import InputSearch from "./components/allaccountspage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import "./AllAccountsPage.scss";
import IStore from "models/IStore";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import TableToExcel from "@linways/table-to-excel";
import { selectAllAccount } from "selectors/customer-setting/CustomerSettingSelector";
import FilterCustomer from "./components/allaccountspage-main/filter/FilterCustomer";
import { format } from "date-fns";

interface IProps {
  history: any;
  role: string;
}

interface FilterData {
  nonameAccount: any;
  namedAccount: any;
  pmo_customer: any;
  newsalesAssign: any;
  holdshipment: any;
  blacklist: any;
  shareableAccount: any;
}

const AllAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const { role } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [rowData, setRowData] = useState([]);
  const [filterData, setFilterData] = useState<FilterData | undefined>(
    undefined
  );
  const [myAccount, setMyAccount] = useState(false);

  const setNewRowData = (data) => {
    setRowData(data);
  };

  const handleMyAccount = () => {
    const userId: any = localStorage.getItem("userLogin");

    if (myAccount == false) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
    } else {
      setMyAccount(false);
      dispatch(
        dispatch(
          CustomerActions.requestAllAcc(
            activePage,
            pageSize,
            "CustomerID",
            "ascending"
          )
        )
      );
    }
  };

  const handleMyApproval = () => {
    const userId: any = localStorage.getItem("userLogin");
    // setMyAccount(!myAccount);

    if (myAccount == false) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID || 26932;
      dispatch(
        CustomerActions.requestSearchAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          null,
          26932
        )
      );
    } else {
      setMyAccount(false);

      dispatch(
        CustomerActions.requestAllAcc(
          activePage,
          pageSize,
          "CustomerID",
          "ascending"
        )
      );
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          1,
          tableData.totalRow,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestAllAcc(
          1,
          tableData.totalRow,
          "CustomerID",
          "ascending"
        )
      );
    }
    if (isRequesting == false) {
      setTimeout(() => {
        let tableSelect: any;
        let tableHead: any;

        if (
          window.location.pathname === "/data-quality/customer-setting-page"
        ) {
          tableSelect = document.getElementById(
            "exporttosetting"
          ) as HTMLTableElement;
          tableHead = document.querySelector(
            "#exporttosetting > thead > tr > th:nth-child(1)"
          ) as HTMLTableElement;
        } else {
          tableSelect = document.getElementById(
            "exportosett"
          ) as HTMLTableElement;
          tableHead = document.querySelector(
            "#exportosett > thead > tr > th:nth-child(1)"
          ) as HTMLTableElement;
        }

        tableHead.style.display = "none";
        for (let i = 0; i < tableSelect.rows.length; i++) {
          const firstCol = tableSelect.rows[i].cells[0];
          firstCol.remove();
        }
        TableToExcel.convert(tableSelect, {
          name: "AllAccounts" + currDate + ".xlsx",
          sheet: {
            name: "Sheet 1",
          },
        });
      }, 3000);
      setTimeout(() => {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 4000);
    }
  };

  const currDate: string = format(new Date(), "cccc LLLL d, yyyy");

  useEffect(() => {
    dispatch(
      CustomerActions.requestAllAcc(1, pageSize, "CustomerID", "ascending")
    );
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;

    // if (window.location.pathname === "/data-quality/customer-setting") {

    if (filterData != undefined) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          filterData.newsalesAssign,
          filterData.pmo_customer,
          filterData.blacklist,
          filterData.holdshipment,
          filterData.nonameAccount,
          filterData.namedAccount,
          filterData.shareableAccount
        )
      );
    } else if (myAccount) {
      const userId: any = localStorage.getItem("userLogin");
      const salesID = JSON.parse(userId)?.employeeID;
      dispatch(
        CustomerActions.requestSearchAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
    } else if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestAllAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          "ascending"
        )
      );
    }
    // }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_ALL_ACCOUNTS,
      CustomerActions.REQUEST_ALL_SEARCH,
    ])
  );

  const tableData = useSelector((state: IStore) => selectAllAccount(state));

  /** Advanced filter */
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <div className="search-container">
          <Button
            className="m-05r"
            icon="sliders horizontal"
            size="big"
            color="yellow"
            disabled={false}
            onClick={() => setOpenFilter(!openFilter)}
          />
          <InputSearch />
        </div>

        <div className="fitur-container">
          <div className=" center-fitur-container">
            <h2 className="h2-container">Customer List</h2>
          </div>

          <div className="posision-container">
            {role === "ADMIN" ? (
              <>
                <div
                  className="myAccount-toggle"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Checkbox
                      style={{ margin: "0.5rem", transform: "scale(0.9)" }}
                      toggle
                      checked={myAccount}
                      onChange={() => handleMyApproval()}
                    ></Checkbox>
                  </div>
                  <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>
                    MY APPROVAL FILTER
                  </p>
                </div>
              </>
            ) : (
              <div
                className="myAccount-toggle"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox
                    style={{ margin: "0.5rem", transform: "scale(0.9)" }}
                    toggle
                    checked={myAccount}
                    onChange={() => handleMyAccount()}
                  ></Checkbox>
                </div>
                <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>
                  My Account
                </p>
              </div>
            )}
          </div>

          <div className="posision-container-right">
            <Tooltips
              content="Export Excel"
              trigger={
                <Button
                  className="m-05r"
                  icon="file excel"
                  color="blue"
                  disabled={false}
                  floated="right"
                  size="small"
                  content="Export Excel"
                  onClick={exportTableToExcel}
                />
              }
            />
          </div>
        </div>

        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <CustomerTable
                history={props.history}
                role={props.role}
                tableData={tableData}
                myAccount={myAccount}
                getRowData={setNewRowData}
                data={rowData}
              />
            </div>
            <Pagination
              activePage={activePage}
              onPageChange={(e, data) => handlePaginationChange(e, data)}
              totalPage={tableData.totalRow}
              pageSize={pageSize}
            />
          </Grid.Column>
        </Grid>
      </LoadingIndicator>

      {openFilter && (
        <FilterCustomer
          setOpenFilter={setOpenFilter}
          openFilter={openFilter}
          rowData={rowData}
          getFilterData={setFilterData}
        />
      )}
    </Fragment>
  );
};

export default AllAccountsPage;
