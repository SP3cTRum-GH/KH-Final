import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "./../include/Header";
import Footer from "./../include/Footer";

// 메인 페이지
const MainPage = lazy(() => import("../pages/MainPage"));

// 로딩 페이지
const Loading = lazy(() => import("../pages/Loading"));

// shop 페이지
const ShopPage = lazy(() => import("../pages/buy/ShopPage"));
const ShopDetailPage = lazy(() => import("../pages/buy/ShopDetailPage"));

// deal 페이지
const DealPage = lazy(() => import("../pages/buy/DealPage"));
const DealDetailPage = lazy(() => import("../pages/buy/DealDetailPage"));

// event 페이지
const EventPage = lazy(() => import("../pages/event/EventPage"));

// cart 페이지
const CartPage = lazy(() => import("../pages/member/CartPage"));

// my 페이지
const MyPage = lazy(() => import("../pages/member/MyPage"));

// 로그인 페이지
const LoginPage = lazy(() => import("../pages/member/LoginPage"));

// review 페이지
const ReviewPage = lazy(() => import("../pages/member/ReviewPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/shop",
    element: (
      <Suspense fallback={<Loading />}>
        <ShopPage />
      </Suspense>
    ),
  },
  {
    path: "/shopdetail",
    element: (
      <Suspense fallback={<Loading />}>
        <ShopDetailPage />
      </Suspense>
    ),
  },
  {
    path: "/deal",
    element: (
      <Suspense fallback={<Loading />}>
        <DealPage />
      </Suspense>
    ),
  },
  {
    path: "/dealdetail",
    element: (
      <Suspense fallback={<Loading />}>
        <DealDetailPage />
      </Suspense>
    ),
  },
  {
    path: "/event",
    element: (
      <Suspense fallback={<Loading />}>
        <EventPage />
      </Suspense>
    ),
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <MyPage />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<Loading />}>
        <CartPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/review",
    element: (
      <Suspense fallback={<Loading />}>
        <ReviewPage />
      </Suspense>
    ),
  },
]);

export default root;
