//import { createBrowserRouter, createHashRouter, Navigate } from "react-router-dom";
import { createHashRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { AdminLayout } from "@/admin/layout/AdminLayout";


// PARA en LazyLoad (CARGA PEREZOSA)
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));




// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        //   path: '',
        index: true,
        element: <HomePage />
      },
      {
        path: 'heroes/:idSlug',
        element: <HeroPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: '*',
        element: <Navigate to='/' />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        // path: '/admin',
        index: true,
        element: <AdminPage />
      }
    ]
  }
])
