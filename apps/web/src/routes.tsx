import Layout from "@/app/layout/layout";
import HomePage from "@/app/page";
import ProductDetailPage from "@/app/product-detail/$slug/page";
import type { RouteObject } from "react-router-dom";
import ProductSearch from "./app/search/$q/page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "product-detail/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "search/:q",
        element: <ProductSearch/>,
      },
    ],
  },
];
