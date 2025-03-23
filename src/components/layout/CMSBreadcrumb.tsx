import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

interface CMSBreadcrumbProps {
  activeTab: string;
}

const CMSBreadcrumb: React.FC<CMSBreadcrumbProps> = ({ activeTab }) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/account">My Account</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Content Management</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CMSBreadcrumb;
