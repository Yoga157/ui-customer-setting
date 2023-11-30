import React, { useEffect, useState } from 'react';
import { Menu, Container, Dropdown, Image, Icon } from 'semantic-ui-react';
import './NavBar.scss';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'models/IStore';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Dispatch } from 'redux';
import * as UserActions from 'stores/users/UserActions';
import RouteEnum from 'constants/RouteEnum';
import { History } from 'history';
import { Button, ButtonWhatsNew, Tooltips } from '../UI';
import * as WhatsNewActions from 'stores/whats-new/WhatsNewAction';
//import GetAllLocalStorageFunnelFormEdit from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/getAllLocalStorageFunnelFormEdit';
//import RemoveAllLocalStorageFunnelFormEdit from 'views/funnel-page/components/funnel-main/form/form-edit/child-edit/main-content/approval-steps/components/hooks/removeAllLocalStorageFunnelFormEdit';
import MenuNavLink from '../main-nav/components/MenuNavLink';

interface IProps {
  history: History;
}
export const NavBar: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const dispatch: Dispatch = useDispatch();
  const { history } = props;
  //const [localStoragFunnelFormEdit] = GetAllLocalStorageFunnelFormEdit();
  //const [, setClearStorage] = RemoveAllLocalStorageFunnelFormEdit();

  useEffect(() => {
    dispatch(UserActions.requestCurrentUser());
    dispatch(WhatsNewActions.requestWhatsNew('Latest'));
  }, [dispatch]);

  const handleLeaveFunnelFormEdit = (route) => {
    const isLeave = window.confirm('Are you sure want to discard changes?');
    //isLeave && setClearStorage(true);

    isLeave && history.push(route);
  };

  const onLogout = () => {
    /*if (localStoragFunnelFormEdit) {
      const isLeave = window.confirm('Are you sure want to discard changes?');
      if (isLeave) {
        dispatch(UserActions.postLogout());
        const timeout = setTimeout(() => {
          setClearStorage(true);
          history.replace(RouteEnum.Home);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      dispatch(UserActions.postLogout());
      const timeout = setTimeout(() => {
        history.replace(RouteEnum.Home);
      }, 1000);

      return () => clearTimeout(timeout);
    }*/
  };

  const countUpdate = useSelector((state: IStore) => state.whatsNew.resultActions.resultObj);

  const [currentDate] = useState(new Date());

  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  return (
    <Menu fixed="top" inverted>
      <Container className="DisInlineBlock">
        <Menu.Item className="NoBorder UserNameNav pl-0 mt-1r-767" position="left">
          <ButtonWhatsNew iconName="info circle" iconColor="violet" countUpdate={countUpdate && countUpdate.rows.length} txtSys="System Update" />
        </Menu.Item>
        <Menu.Item className="MainTitleText NavCalendar">
          <Icon name="calendar" />
          {format(new Date(currentDate), 'dd MMMM yyyy')}
        </Menu.Item>
        <Menu.Item className="MainTitleText AvatarMar" position="right">
          <Dropdown className="CuzUsrDropdown" icon="ellipsis vertical" pointing="top left" text={currentUser.fullName}>
            <Dropdown.Menu>
              <Dropdown.Item text="Logout" icon="power" onClick={onLogout} />
            </Dropdown.Menu>
          </Dropdown>
          <Image className="AvatarPosition" avatar spaced="right" src={'/assets/user.png'} />
        </Menu.Item>
        <div className="FaqButton">
          <Tooltips
            position="bottom right"
            content="Go To FAQ Page"
            trigger={
              <Button circular color="yellow" icon="question circle outline" onClick={() => window.open('https://dqfaq.berca.co.id/', '_blank')} />
            }
          />
        </div>
      </Container>
    </Menu>
  );
};

export default NavBar;
