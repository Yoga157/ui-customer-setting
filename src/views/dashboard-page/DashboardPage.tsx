import IStore from 'models/IStore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { ReportViewer } from './components/ReportViewer';
import './DashboardPageStyle.scss';
import * as UserActions from 'stores/users/UserActions';

interface IProps {}

const DashboardPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  return <ReportViewer />;
};

export default DashboardPage;
