import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Grid, Header } from "semantic-ui-react";
import CustomerTable from "./components/customer-main/table/CustomerTable";
import InputSearch from "./components/customer-main/search/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import IStore from "models/IStore";
import * as CustomerActions from "stores/customer-setting/CustomerActivityActions";
import { selectRequesting } from "selectors/requesting/RequestingSelector";
import LoadingIndicator from "views/components/loading-indicator/LoadingIndicator";
import { Pagination, Tooltips, Button } from "views/components/UI";
import { selectUserResult } from "selectors/user/UserSelector";
import IUserResult from "selectors/user/models/IUserResult";
import TableToExcel from "@linways/table-to-excel";

// import TotalSalesAndGpm from './components/total-sales-n-gpm/totalSalesAndGpm';
import ModalSizeEnum from "constants/ModalSizeEnum";
import { defaultDecoder } from "qs";
import { format } from "date-fns";
import CreateForm from "./components/customer-main/form/form-create/FormAdd";
import AdjustSettingForm from "./components/customer-main/form/form-setting/FormSetting";
import DeleteCustomer from "./components/customer-main/delete/delete-customer";
import { selectCustomerSetting } from "selectors/customer-setting/CustomerSettingSelector";
// import FormUpload from './components/funnel-main/form/form-create/FormUpload';
import * as ToastsAction from "stores/toasts/ToastsAction";
import ToastStatusEnum from "constants/ToastStatusEnum";
import { Column } from "jspdf-autotable";
import RouteEnum from "constants/RouteEnum";
// import * as FunnelActionss from 'stores/funnel/FunnelActions';

interface IProps {
  history: any;
}

const CustomerSettingPage: React.FC<IProps> = (
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
    // console.log(data);
  };

  const onAddSales = useCallback((): void => {
    // console.log(rowData);
    dispatch(
      ModalFirstLevelActions.OPEN(
        <CreateForm rowData={rowData} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const onAddSetting = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <AdjustSettingForm rowData={rowData} />,
        ModalSizeEnum.Small
      )
    );
  }, [dispatch, rowData]);

  const onDelete = useCallback((): void => {
    dispatch(
      ModalFirstLevelActions.OPEN(
        <DeleteCustomer rowData={rowData} />,
        ModalSizeEnum.Tiny
      )
    );
  }, [dispatch, rowData]);

  const moveToAddCustomer = () => {
    props.history.push({
      pathname: RouteEnum.AddNewCustomerSetting,
      state: { rowData },
    });
  };
  const exportTableToExcel = (tableID: string, filename: string): void => {
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    if (search.value.length > 0) {
      dispatch(
        CustomerActions.requesSearchCustomerSett(
          1,
          tableData.totalRow,
          "CustomerSettingID",
          search.value
        )
      );
    } else {
      //dispatch(FunnelActions.requestFunnelOpp(1, tableData.totalRow, 'FunnelOpportunityID', 'ascending'));
      dispatch(
        CustomerActions.requestCustomerSett(
          tableData.activePage,
          pageSize,
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
      }, 2000);
      setTimeout(() => {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 4000);
    }
  };

  useEffect(() => {
    // if (window.location.pathname === "/data-quality/customer-setting")

    dispatch(
      CustomerActions.requestCustomerSett(1, pageSize, "CustomerSettingID")
    );
  }, [dispatch]);

  const handlePaginationChange = (e: any, data: any) => {
    dispatch(CustomerActions.setActivePage(data.activePage));
    const search = document.querySelector(
      "#search-input-customer"
    )! as HTMLInputElement;
    // console.log(search.value);

    if (window.location.pathname === "/data-quality/customer-setting") {
      if (search.value.length > 0) {
        console.log("search");
        dispatch(
          CustomerActions.requesSearchCustomerSett(
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
    selectRequesting(state, [CustomerActions.REQUEST_CUSTOMERS_SETTING])
  );

  // const tableData = [
  //   {
  //     customerSettingID: 10,
  //     customerGenID: 124,
  //     customerCategory: "Entripise",
  //     customerName: "Yoga",
  //     lastProjectName: "HP",
  //     salesAssign: "Tofa",
  //     relatedCustomer: "relate",
  //     invoiceCondition: "afa",
  //     shareable: true,
  //     pmoCustomer: "false",
  //     blacklist: false,
  //     holdshipment: false,
  //     createUserID: "",
  //     createDate: undefined,
  //     modifyUserID: undefined,
  //     modifyDate: undefined,
  //   },
  // ];

  const tableData = useSelector((state: IStore) =>
    selectCustomerSetting(state)
  );

  return (
    <Fragment>
      <LoadingIndicator isActive={isRequesting}>
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <InputSearch />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column width={2} verticalAlign="middle">
            <Header as="h4">
              <Header.Content className="ml-1r-767">
                {"Customer Setting"}
              </Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column width={14}>
            <Tooltips
              content="Sales Assign"
              trigger={
                <Button
                  className="m-05r"
                  icon="user"
                  color="blue"
                  disabled={rowData.length == 0 ? true : false}
                  floated="left"
                  size="tiny"
                  content="Sales Assign"
                  onClick={onAddSales}
                />
              }
            />
            <Tooltips
              content="Adjust Setting"
              trigger={
                <Button
                  className="m-05r"
                  icon="setting"
                  color="teal"
                  disabled={rowData.length == 0 ? true : false}
                  floated="left"
                  size="tiny"
                  content="Adjust Setting"
                  onClick={onAddSetting}
                />
              }
            />
            <Tooltips
              content="Delete"
              trigger={
                <Button
                  className="m-05r"
                  icon="trash"
                  color="pink"
                  disabled={rowData.length == 0 ? true : false}
                  floated="left"
                  size="tiny"
                  content="Delete"
                  onClick={onDelete}
                />
              }
            />
            <Tooltips
              content="Export Xls"
              trigger={
                <Button
                  className="m-05r"
                  icon="file excel"
                  color="teal"
                  disabled={false}
                  floated="right"
                  size="tiny"
                  content="Export Xls"
                  onClick={exportTableToExcel}
                />
              }
            />
            <Tooltips
              content="New Customer Setting"
              trigger={
                <Button
                  className="m-05r"
                  icon="plus"
                  color="yellow"
                  disabled={false}
                  floated="right"
                  size="tiny"
                  content="New Customer Setting"
                  onClick={moveToAddCustomer}
                />
              }
            />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <div className="wrapper-table">
              <CustomerTable
                history={props.history}
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
    </Fragment>
  );
};

export default CustomerSettingPage;
