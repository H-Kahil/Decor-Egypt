import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "../SearchBar";
import StatusBadge from "../StatusBadge";
import ActionButtons from "../ActionButtons";
import { Order } from "../types";

interface OrdersTabProps {
  orders: Order[];
  orderSearchQuery?: string;
  handleOrderSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  setOrders?: (orders: Order[]) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({
  orders = [],
  orderSearchQuery = "",
  handleOrderSearch,
  searchQuery = "",
  setSearchQuery,
  setOrders,
}) => {
  // Use either orderSearchQuery or searchQuery based on what's provided
  const effectiveSearchQuery = orderSearchQuery || searchQuery || "";

  // Handle search if handleOrderSearch is not provided but setSearchQuery is
  const handleSearch =
    handleOrderSearch ||
    (setSearchQuery
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
      : undefined);

  // Filter orders based on search query with null checks
  const filteredOrders = orders.filter(
    (order) =>
      (order.id?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ) ||
      (order.customer?.toLowerCase() || "").includes(
        effectiveSearchQuery.toLowerCase(),
      ),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search orders..."
          value={effectiveSearchQuery}
          onChange={handleSearch}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total?.toFixed(2) || "0.00"}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionButtons showDelete={false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTab;
