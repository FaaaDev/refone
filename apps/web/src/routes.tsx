import type { RouteObject } from "react-router-dom";
import Layout from "@/app/layout/layout";
import HomePage from "@/app/page";
import ProductDetailPage from "@/app/product-detail/$slug/page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />, // now shows product list
      },
      {
        path: "product-detail/:slug",
        element: <ProductDetailPage />,
      },
    ],
  },
];
