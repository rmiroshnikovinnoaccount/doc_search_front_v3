import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import PrivateLayout from '../layouts/private/PrivateLayout';
import Main from '../pages/main/Main';
import QueryConstructor from '../pages/queryConstructor/QueryConstructor';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import DataSourcesConnection from '../pages/dataSourcesConnection/DataSourcesConnection';

const PrivateRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<PrivateLayout/>}>
          <Route index element={<Main/>}/>
          <Route path="query-constructor" element={<QueryConstructor/>}/>
          <Route path="admin-panel" element={<AdminPanel/>}/>
          <Route path="data-sources-connection" element={<DataSourcesConnection/>}/>
          <Route path="login" element={<Navigate to="/"/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Route>
      </Routes>
  );
};

export default PrivateRoutes;
