import React, { Fragment, useEffect, useState } from "react";
import {
  Menu,
  Sidebar,
  Icon,
  Divider,
  IconGroup,
  Image,
  Modal,
  Grid,
  Card,
} from "semantic-ui-react";
import classes from "./SidebarNav.module.scss";
import MenuNavLink from "../main-nav/components/MenuNavLink";
import RouteEnum from "constants/RouteEnum";
import "./SidebarNavStyle.scss";
import IUserResult from "selectors/user/models/IUserResult";
import { selectUserResult } from "selectors/user/UserSelector";
import IStore from "models/IStore";
import { useDispatch, useSelector } from "react-redux";
import { Tooltips } from "../UI";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import * as ModalFirstLevelActions from "stores/modal/first-level/ModalFirstLevelActions";
import ModalSizeEnum from "constants/ModalSizeEnum";

interface IProps {
  size: any;
}

const SidebarNav: React.FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const currentUser: IUserResult = useSelector((state: IStore) =>
    selectUserResult(state)
  );
  const [opens, setOpens] = useState(false);
  const [sizes, setSizes] = useState(undefined);

  const exampleReducer = (size) => {
    setOpens(true);
    setSizes(size);
  };
  const openSidebarTransparent = () => {
    if (visibleSidebar) setVisibleSidebar(false);
    else setVisibleSidebar(true);
  };

  const handleLeaveFunnelFormEdit = (route) => {
    const isLeave = window.confirm("Are you sure want to discard changes?");
    //isLeave && setClearStorage(true);

    isLeave && history.push(route);
  };

  return (
    <Fragment>
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="left"
        icon
        inverted
        vertical
        visible={visibleSidebar}
        width="thin"
        className={classes.SideBarTransparent + "" + " ZeroBorRad  "}
      >
        <Menu.Item
          as={MenuNavLink}
          to={RouteEnum.Dashboard}
          header
          className={classes.SidebarMenu}
        >
          <Image src="/assets/logo.png" style={{ width: "29px" }} />
        </Menu.Item>
        <Menu.Item className={classes.SidebarMenu + "" + " HeaderNavPad "}>
          <Icon size="small" />
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            handleLeaveFunnelFormEdit(RouteEnum.FunnelOpportunity);
          }}
          as={MenuNavLink}
          to={RouteEnum.FunnelOpportunity}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Event/Product Management Generated Funnel</IconGroup>
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            handleLeaveFunnelFormEdit(RouteEnum.CustomerSetting);
          }}
          as={MenuNavLink}
          to={RouteEnum.CustomerSetting}
          className={classes.SidebarMenu2}
        >
          <IconGroup>Customer Setting</IconGroup>
        </Menu.Item>
      </Sidebar>

      <Sidebar
        as={Menu}
        animation="overlay"
        icon
        inverted
        vertical
        visible={true}
        width="very thin"
        className={
          classes.SideBar + "" + " SideBarDq " + "" + " OverlayHide-y "
        }
      >
        <Menu.Item
          className={" SidebarLogo " + "" + classes.NoBorderMenu}
          onClick={() => {
            handleLeaveFunnelFormEdit(RouteEnum.Home);
          }}
          as={MenuNavLink}
          to={RouteEnum.Home}
          header
        >
          <Image src="/assets/logo.png" size="mini" />
        </Menu.Item>
        <Menu.Item
          className={" SideBarClose " + "" + classes.NoBorderMenu}
          icon="ellipsis vertical"
          onClick={openSidebarTransparent}
        />
        <Tooltips
          className="leftToolTip"
          content="Event/Product Management Generated Funnel"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                handleLeaveFunnelFormEdit(RouteEnum.FunnelOpportunity);
              }}
              as={MenuNavLink}
              to={RouteEnum.FunnelOpportunity}
            >
              <Image src="/assets/Opportunity-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
        <Tooltips
          className="leftToolTip8"
          content="Customer Setting"
          trigger={
            <Menu.Item
              className={classes.NoBorderMenu + "" + " BlueIcon "}
              onClick={() => {
                handleLeaveFunnelFormEdit(RouteEnum.CustomerSettingPage);
              }}
              as={MenuNavLink}
              to={RouteEnum.CustomerSettingPage}
            >
              <Image src="/assets/Opportunity-Dq.svg " size="mini" />
            </Menu.Item>
          }
          position="left center"
        />
      </Sidebar>
    </Fragment>
  );
};

export default SidebarNav;
