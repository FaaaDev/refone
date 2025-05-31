import {
    BadgeDollarSign,
  Coins,
  Database,
  HandCoins,
  LayoutDashboard,
  Newspaper,
  ScanBarcode,
  ShoppingBag,
  ShoppingCart,
  SquarePercent,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarItems } from "./ui/sidebar_items";
import logo from "@/assets/refone.png";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function AppSidebar() {
  const items = [
    {
      group: "General",
      items: [
        {
          title: "Inventory",
          url: "",
          icon: Database,
          isActive: true,
          items: [
            { title: "Products", url: "/admin/master/product" },
            { title: "Categories", url: "" },
            { title: "Unit", url: "" },
          ],
        },
        {
          title: "Accounting",
          url: "",
          icon: HandCoins,
          items: [
            { title: "Account", url: "" },
            { title: "Partner", url: "" },
            { title: "Cost Center", url: "" },
          ],
        },
        {
          title: "Taxity",
          url: "",
          icon: Coins,
          items: [
            { title: "Tax", url: "" },
          ],
        },
        {
          title: "Transaction",
          url: "",
          icon: ScanBarcode,
          items: [
            { title: "Term of Payment", url: "" },
            { title: "Paymen Method", url: "" },
            { title: "Guarantee", url: "" },
          ],
        },
      ],
    },
    {
      group: "Report",
      items: [
        {
          title: "Accounting",
          url: "",
          icon: Newspaper,
          items: [
            { title: "Balance Sheet", url: "" },
            { title: "General Ledger", url: "" },
            { title: "Transaction Journal", url: "" },
            { title: "Income Statement", url: "" },
          ],
        },
        {
          title: "Sales Report",
          url: "",
          icon: SquarePercent,
          items: [
            { title: "Account Receivable", url: "" },
            { title: "Receivable Age", url: "" },
            { title: "Sales General", url: "" },
            { title: "Sales per Product", url: "" },
            { title: "Sales per Customer", url: "" },
          ],
        },
        {
          title: "Purchase Report",
          url: "",
          icon: ShoppingCart,
          items: [
            { title: "Account Payable", url: "" },
            { title: "Payable Age", url: "" },
          ],
        },
      ],
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Link to="/admin">
            <img src={logo} alt="Logo" className="max-w-20 object-contain" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full text-left justify-start py-4 text-sm"
              >
                <LayoutDashboard /> Dashboard
              </Button>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full text-left justify-start py-4 text-sm"
              >
                <ShoppingBag /> Purchase
              </Button>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full text-left justify-start py-4 text-sm"
              >
                <BadgeDollarSign /> Sales
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {items.map((item) => (
          <SidebarItems group_name={item.group} items={item.items} />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
