import { OrganizationList } from "@clerk/nextjs";
import React from "react";

function SelectOrgPage() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/orgnanization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
}

export default SelectOrgPage;
