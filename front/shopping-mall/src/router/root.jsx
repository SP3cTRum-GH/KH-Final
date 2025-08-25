import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "./../include/Header";
import Footer from "./../include/Footer";
import GoogleRedirectPage from "../pages/member/GoogleRedirectPage";

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
const EventReadPage = lazy(() => import("../pages/event/EventReadPage"));
const EventModifyPage = lazy(() => import("../pages/event/EventModifyPage"));
const EventAddPage = lazy(() => import("../pages/event/EventAddPage"));
// cart 페이지
const CartPage = lazy(() => import("../pages/member/CartPage"));

// my 페이지
const MyPage = lazy(() => import("../pages/member/MyPage"));
const ModifyMyPage = lazy(() => import("../pages/member/ModifyMyPage"));

// 로그인 페이지
const LoginPage = lazy(() => import("../pages/member/LoginPage"));

// admin 페이지
const ModifyPage = lazy(() => import("../pages/admin/ModifyPage"));
const UploadPage = lazy(() => import("../pages/admin/UploadPage"));
const MemberListPage = lazy(() => import("../pages/admin/MemberListPage"));
const SalesChartPage = lazy(() => import("../pages/admin/SalesChartPage"));

// 회원가입 페이지
const SignUpPage = lazy(() => import("../pages/member/SignUpPage"));

// review 페이지
const ReviewPage = lazy(() => import("../pages/member/ReviewPage"));
const ReviewModifyPage = lazy(() => import("../pages/member/ReviewModifyPage"));

// 카카오 리다이렉트 페이지
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));

const SocialSignUp = lazy(() => import("../pages/member/SocialSignUpPage"));

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
    path: "/shopdetail/:productNo",
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
    path: "/dealdetail/:productNo",
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
    path: "/event/:no",
    element: (
      <Suspense fallback={<Loading />}>
        <EventReadPage />
      </Suspense>
    ),
  },
  {
    path: "/event/modify/:no",
    element: (
      <Suspense fallback={<Loading />}>
        <EventModifyPage />
      </Suspense>
    ),
  },
  {
    path: "/event/add",
    element: (
      <Suspense fallback={<Loading />}>
        <EventAddPage />
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
    path: "/modifymypage",
    element: (
      <Suspense fallback={<Loading />}>
        <ModifyMyPage />
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
    path: "/admin/modify/:productNo",
    element: (
      <Suspense fallback={<Loading />}>
        <ModifyPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/upload",
    element: (
      <Suspense fallback={<Loading />}>
        <UploadPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/memberlist",
    element: (
      <Suspense fallback={<Loading />}>
        <MemberListPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/saleschart",
    element: (
      <Suspense fallback={<Loading />}>
        <SalesChartPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/review/:productNo",
    element: (
      <Suspense fallback={<Loading />}>
        <ReviewPage />
      </Suspense>
    ),
  },
  {
    path: "/reviewmodify",
    element: (
      <Suspense fallback={<Loading />}>
        <ReviewModifyPage />
      </Suspense>
    ),
  },
  {
    path: "/member/kakao",
    element: (
      <Suspense fallback={<Loading />}>
        <KakaoRedirect />
      </Suspense>
    ),
  },
  {
    path: "/member/google",
    element: (
      <Suspense fallback={<Loading />}>
        <GoogleRedirectPage />
      </Suspense>
    ),
  },
  {
    path: "/social/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <SocialSignUp />
      </Suspense>
    ),
  },
]);

export default root;
