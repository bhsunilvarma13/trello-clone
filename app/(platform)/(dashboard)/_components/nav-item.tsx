"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, Settings, Layout, CreditCard } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  organization: Organization;
  isExpanded: boolean;
  isActive: boolean;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  organization,
  isActive,
  isExpanded,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      href: `/organization/${organization.id}`,
      icon: <Layout className="w-4 h-4 mr-2" />,
    },
    {
      label: "Activity",
      href: `/organization/${organization.id}/activity`,
      icon: <Activity className="w-4 h-4 mr-2" />,
    },
    {
      label: "Settings",
      href: `/organization/${organization.id}/settings`,
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
    {
      label: "Billing",
      href: `/organization/${organization.id}/billing`,
      icon: <CreditCard className="w-4 h-4 mr-2" />,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-2 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl ? organization.imageUrl : "/logo.svg"}
              alt="Organization"
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
