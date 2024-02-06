"use client";
import { useParams } from "next/navigation";
import React from "react";

function OrganizationIdPage() {
  const params = useParams();
  return <div>Organization Page: {params.organizationId}</div>;
}

export default OrganizationIdPage;
