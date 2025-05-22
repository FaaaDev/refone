import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "@/app/layout/layout";
import HomePage from "@/app/page";
import ProductDetailPage from "@/app/product-detail/$slug/page";

// export const routes: RouteObject[] = [
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "product-detail/:slug",
//         element: <ProductDetailPage />,
//       },
//     ],
//   },
// ];

function RootRouterProvider() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "product-detail/:slug",
          element: <ProductDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RootRouterProvider;
