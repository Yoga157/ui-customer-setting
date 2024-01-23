import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid, Checkbox } from "semantic-ui-react";
import CustomerTable from "./components/namepage-main/table/CustomerTable";
import InputSearch from "./components/namepage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import "./NamedAccountsPage.scss";
import IStore from "models/IStore";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import TableToExcel from "@linways/table-to-excel";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ModReleaseForm from "./components/namepage-main/form/form-releasemodal/FormRealeseMod";
import { format } from "date-fns";
import { selectNameAccount } from "selectors/customer-setting/CustomerSettingSelector";
import FilterCustomer from "./components/namepage-main/filter/FilterCustomer";
import * as CustomerSettingAct from "stores/customer-setting/CustomerActivityActions";

interface IProps {
  history: any;
  role: string;
}

const NamedAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  // const { role } = props;
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [rowData, setRowData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [myAccount, setMyAccount] = useState(false);

  const setNewRowData = (data) => {
    setRowData(data);
  };

  const onReleaseAccount = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ModReleaseForm rowData={rowData} />,
        ModalSizeEnum.Small
      )
    );
    setRowData([]);
  }, [dispatch, rowData, setRowData]);

  const handleMyAccount = () => {
    const userId: any = localStorage.getItem("userLogin");

    if (!myAccount) {
      setMyAccount(true);
      const salesID = JSON.parse(userId)?.employeeID || 830;
      dispatch(
        CustomerSettingAct.requestSearchNamedAcc(
          1,
          10,
          "CustomerID",
          null,
          "ascending",
          salesID
        )
      );
      // console.log(salesID);
    } else {
      setMyAccount(false);
      dispatch(
        CustomerSettingAct.requestNamedAcc(1, 10, "CustomerID", "ascending")
      );
    }
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchNamedAcc(
          1,
          tableData.totalRow,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestNamedAcc(
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
          name: "NamedAccounts_" + currDate + ".xlsx",
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
      CustomerActions.requestNamedAcc(1, pageSize, "CustomerID", "ascending")
    );
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;

    // if (window.location.pathname === "/data-quality/customer-setting-page") {
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchNamedAcc(
          data.activePage,
          pageSize,
          "CustomerID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestNamedAcc(
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
      CustomerActions.REQUEST_NAMED_ACCOUNTS,
      CustomerActions.REQUEST_NAMED_SEARCH,
    ])
  );

  const tableData = useSelector((state: IStore) => selectNameAccount(state));

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
            <Tooltips
              content="Release Account"
              trigger={
                <Button
                  style={{
                    height: "fit-content",
                    marginLeft: "1rem",
                    color: "white",
                    background: "#f97452",
                    fontSize: "0.8rem",
                    alignItems: "center",
                  }}
                  // color="red"
                  icon="times circle"
                  disabled={rowData.length === 0 || rowData.length > 5}
                  size="mini"
                  content="Release Account"
                  onClick={onReleaseAccount}
                />
              }
            />
          </div>

          <div className="posision-container">
            {rowData.length === 0 ? (
              <p></p>
            ) : (
              <p className="p-account">
                {rowData.length} of 5 accounts has been pick.
              </p>
            )}
          </div>

          <div className="posision-container">
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
              <p style={{ fontSize: "0.8rem", margin: "0.5rem" }}>My Account</p>
            </div>
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
        />
      )}
    </Fragment>
  );
};

export default NamedAccountsPage;
