import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CMSTabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const CMSTabNavigation: React.FC<CMSTabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start border-b mb-6 rounded-none bg-transparent overflow-x-auto">
        <TabsTrigger
          value="products"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Products
        </TabsTrigger>

        <TabsTrigger
          value="families"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Families
        </TabsTrigger>
        <TabsTrigger
          value="brands"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Brands
        </TabsTrigger>
        <TabsTrigger
          value="categories"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Categories
        </TabsTrigger>
        <TabsTrigger
          value="subcategories"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Subcategories
        </TabsTrigger>
        <TabsTrigger
          value="product-lines"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Product Model
        </TabsTrigger>
        <TabsTrigger
          value="orders"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Orders
        </TabsTrigger>
        <TabsTrigger
          value="customers"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Customers
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 rounded-none bg-transparent"
        >
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CMSTabNavigation;
