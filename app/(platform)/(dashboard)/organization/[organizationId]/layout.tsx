import React from "react";
import { OrgControl } from "./_components/org-control";

function OrganizationIdPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdPage;
