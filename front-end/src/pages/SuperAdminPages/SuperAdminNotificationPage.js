
import React from 'react';

import '../../style/SuperAdminStyles/SuperAdminNotificationPage.css'; 
import SuperAdminLayout from './SuperAdminLayout';
import SuperAdminNotificationTable from '../../components/SuperAdminComponents/SuperAdminNotificationTable';
import SuperAdminFilteringFields from '../../components/SuperAdminComponents/SuperAdminFilteringFields';



function SuperAdminNotificationPage() {
  return (
    <SuperAdminLayout>
      <SuperAdminFilteringFields />
      <SuperAdminNotificationTable />
    </SuperAdminLayout>
  );
}

export default SuperAdminNotificationPage;
