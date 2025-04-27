
import React from 'react';

import '../../style/SuperAdminStyles/SuperAdminNotificationPage.css'; 
import SuperAdminLayout from './SuperAdminLayout';
import SuperAdminFilteringFields from '../../components/SuperAdminComponents/SuperAdminFilteringFields';
import SuperAdminPendingUsersTable from '../../components/SuperAdminComponents/SuperAdminPendingUsersTable';



function SuperAdminPendingUsersPage() {
  return (
    <SuperAdminLayout>
      <SuperAdminFilteringFields />
      <SuperAdminPendingUsersTable />
    </SuperAdminLayout>
  );
}

export default SuperAdminPendingUsersPage;
