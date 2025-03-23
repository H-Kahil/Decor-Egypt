import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddButton from "../AddButton";

interface CustomersTabProps {
  customerSearchQuery: string;
  handleCustomerSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomersTab: React.FC<CustomersTabProps> = ({
  customerSearchQuery,
  handleCustomerSearch,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-9"
            value={customerSearchQuery}
            onChange={handleCustomerSearch}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <AddButton label="Add Customer" disabled={true} onClick={() => {}} />
      </div>

      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Customer Management Coming Soon
          </h3>
          <p className="text-gray-500">
            This feature is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersTab;
