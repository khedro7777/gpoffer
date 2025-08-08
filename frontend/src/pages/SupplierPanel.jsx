import React from 'react';
import { Form, Input, Select, DynamicTable, DatePicker, Textarea, FileUpload, DiscountChart, RadioGroup, KYCStatusCheck, SubmitButton } from '../components/shared';

const SupplierPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Supplier Offer Panel</h1>
      <Form>
        <Input label="Offer Title" type="text" />
        <Select label="Product / Service" options={["Custom", "Product 1", "Product 2"]} />
        <Select label="Target Region" options={["MENA", "EU", "Asia", "Africa"]} />
        <Input label="Base Price" type="number" />
        <DynamicTable label="Discount Strategy" columns={["Participants", "Price"]} />
        <DatePicker label="Deadline to Join" />
        <Input label="Minimum Joiners (Optional)" type="number" />
        <Textarea label="Terms & Conditions" />
        <FileUpload label="Upload PDF or Terms File" />
        <DiscountChart />
        <RadioGroup label="Visibility" options={["Public", "Invite Only"]} />
        <KYCStatusCheck />
        <Input label="GPO Points to Publish Offer" disabled value="15" />
        <SubmitButton label="Create Offer" />
      </Form>
    </div>
  );
};

export default SupplierPanel;


