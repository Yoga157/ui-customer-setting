import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import CustomerTable from "./components/nonamepage-main/table/CustomerTable";
import InputSearch from "./components/nonamepage-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import "./NoNameAccountsPage.scss";
import IStore from "models/IStore";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import TableToExcel from "@linways/table-to-excel";
import ModalSizeEnum from "constants/ModalSizeEnum";
import ClaimForm from "./components/nonamepage-main/form/form-claim/FormClaim";
import CreateForm from "./components/nonamepage-main/form/form-create/FormAdd";
import AdjustSettingForm from "./components/nonamepage-main/form/form-setting/FormSetting";
import DeleteCustomer from "./components/nonamepage-main/delete/delete-customer";
import { selectCustomerSetting } from "selectors/customer-setting/CustomerSettingSelector";
import RouteEnum from "constants/RouteEnum";
import FilterCustomer from "./components/nonamepage-main/filter/FilterCustomer";
import { noNameData } from "./Nodataname";

interface IProps {
  history: any;
}

const NoNameAccountsPage: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const dispatch: Dispatch = useDispatch();
  const [pageSize, setPage] = useState(10);
  const activePage = useSelector(
    (state: IStore) => state.customerSetting.activePage
  );
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [rowData, setRowData] = useState([]);

  const setNewRowData = (data) => {
    setRowData(data);
  };

  const onClaimAccount = useCallback((): void => {
    // console.log(rowData);
    dispatch(
      ModalFirstLevelActions.OPEN(
        <ClaimForm rowData={rowData} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const moveToAddCustomer = () => {
    props.history.push({
      pathname: RouteEnum.AddNewCustomerSetting,
    });
  };

  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requestSearchCustomerSett(
          1,
          tableData.totalRow,
          "CustomerSettingID",
          search.value
        )
      );
    } else {
      dispatch(
        CustomerActions.requestCustomerSett(
          1,
          tableData.totalRow,
          "CustomerSettingID",
          "ascending"
        )
      );
    }
    if (isRequesting == false) {
      setTimeout(() => {
        let tableSelect: any;
        let tableHead: any;

        if (window.location.pathname === "/data-quality/customer-setting") {
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
          name: "CustomerSetting" + ".xlsx",
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

  useEffect(() => {
    dispatch(
      CustomerActions.requestCustomerSett(1, pageSize, "CustomerSettingID")
    );
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;

    if (window.location.pathname === "/data-quality/customer-setting") {
      if (search.value.length > 0) {
        // console.log("search");
        dispatch(
          CustomerActions.requestSearchCustomerSett(
            data.activePage,
            pageSize,
            "CustomerSettingID",
            search.value
          )
        );
      } else {
        dispatch(
          CustomerActions.requestCustomerSett(
            data.activePage,
            pageSize,
            "CustomerSettingID",
            "ascending"
          )
        );
      }
    }
  };

  const isRequesting: boolean = useSelector((state: IStore) =>
    selectRequesting(state, [
      CustomerActions.REQUEST_CUSTOMERS_SETTING,
      CustomerActions.REQUEST_CUSTOMERS_SETTING_SEARCH,
    ])
  );

  const tableData = useSelector((state: IStore) =>
    selectCustomerSetting(state)
  );

  /** Advanced filter */
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Fragment>
      {/* <LoadingIndicator isActive={isRequesting}> */}
      <div className="search-container">
        <Button
          className="m-05r"
          icon="sliders horizontal"
          color="yellow"
          size="big"
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
            content="Claim Account"
            trigger={
              <Button
                style={{
                  height: "fit-content",
                  marginLeft: "1rem",
                  color: "#656dd1",
                  background: "white",
                  fontSize: "0.8rem",
                  alignItems: "center",
                }}
                color="yellow"
                icon="check circle"
                disabled={rowData.length == 0 ? true : false}
                size="mini"
                content="Claim Account"
                onClick={onClaimAccount}
              />
            }
          />
        </div>

        <div className="posision-container">
          <div className="posision-container">
            {rowData.length === 0 ? (
              <p></p>
            ) : (
              <p className="p-account">
                {rowData.length} of 5 accounts has been pick.
              </p>
            )}
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
              // tableData={tableData}
              tableData={noNameData}
              getRowData={setNewRowData}
              data={rowData}
            />
          </div>
          <Pagination
            activePage={activePage}
            onPageChange={(e, data) => handlePaginationChange(e, data)}
            // totalPage={tableData.totalRow}
            totalPage={tableData.totalRow}
            pageSize={pageSize}
          />
        </Grid.Column>
      </Grid>
      {/* </LoadingIndicator> */}

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

export default NoNameAccountsPage;