import React from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status = "" }) => {
  let colorClasses = "bg-gray-100 text-gray-800";

  if (status === "Active") {
    colorClasses = "bg-green-100 text-green-800";
  } else if (status === "Delivered") {
    colorClasses = "bg-green-100 text-green-800";
  } else if (status === "Processing") {
    colorClasses = "bg-blue-100 text-blue-800";
  } else if (status === "Shipped") {
    colorClasses = "bg-purple-100 text-purple-800";
  } else if (status === "Cancelled") {
    colorClasses = "bg-red-100 text-red-800";
  } else if (status === "Completed") {
    colorClasses = "bg-green-100 text-green-800";
  } else if (status === "Inactive") {
    colorClasses = "bg-red-100 text-red-800";
  } else if (status === "Pending") {
    colorClasses = "bg-yellow-100 text-yellow-800";
  } else if (status === "Draft") {
    colorClasses = "bg-gray-100 text-gray-800";
  } else if (status === "Out of Stock") {
    colorClasses = "bg-red-100 text-red-800";
  } else if (status === "Low Stock") {
    colorClasses = "bg-yellow-100 text-yellow-800";
  } else if (status === "On Sale") {
    colorClasses = "bg-blue-100 text-blue-800";
  } else if (status === "Featured") {
    colorClasses = "bg-purple-100 text-purple-800";
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}
    >
      {status || "Unknown"}
    </span>
  );
};

export default StatusBadge;
