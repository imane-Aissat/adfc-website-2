
import React from 'react';

import '../../style/SuperAdminStyles/SuperAdminNotificationPage.css'; 
import SuperAdminLayout from './SuperAdminLayout';
import SuperAdminFilteringFields from '../../components/SuperAdminComponents/SuperAdminFilteringFields';
import SuperAdminUserManagementTable from '../../components/SuperAdminComponents/SuperAdminUserManagementTable';



function SuperAdminUserManagementPage() {
  return (
    <SuperAdminLayout>
      <SuperAdminFilteringFields />
      <SuperAdminUserManagementTable />
    </SuperAdminLayout>
  );
}

export default SuperAdminUserManagementPage;
