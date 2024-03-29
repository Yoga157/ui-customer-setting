import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuNavLink from './components/MenuNavLink';
import RouteEnum from '../../../constants/RouteEnum';

interface IProps {}

const MainNav: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return (
    <Segment inverted={false}>
      <Menu inverted={false} pointing={true} secondary={true}>
        <Menu.Item as={MenuNavLink} to={RouteEnum.Home} name="Home" />
        <Menu.Item as={MenuNavLink} to={RouteEnum.About} name="About" />
      </Menu>
    </Segment>
  );
};

export default MainNav;
