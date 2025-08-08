import React from 'react';
import { Toggle, DataTable, AdminActions } from '../components/admin';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <Toggle label="Enable Group Offers from Suppliers" />
        <Toggle label="Enable Dynamic Discounts" />
        <DataTable title="All Offers" columns={["Title", "Supplier", "Status", "Participants"]} />
        <AdminActions editOffer cancelOffer />
      </div>
    </div>
  );
};

export default AdminDashboard;


