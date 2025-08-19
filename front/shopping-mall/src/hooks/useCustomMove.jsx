import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (param === null || param === undefined || param === "")
    return defaultValue;
  const n = parseInt(param, 10);
  return Number.isNaN(n) ? defaultValue : n;
};

const useCustomMove = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  // general list
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 20);
  // review list (shopdetail 하단 리뷰)
  const reviewPage = getNum(queryParams.get("reviewPage"), 1);
  const reviewSize = getNum(queryParams.get("reviewSize"), 5);

  const queryDefault = createSearchParams({ page, size }).toString();
  const reviewQueryDefault = createSearchParams({
    reviewPage,
    reviewSize,
  }).toString();

  const moveToProductList = (pageParam, type) => {
    let queryStr = queryDefault;
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    }

    const pathname = type?.startsWith("/") ? type : `../${type}`;
    navigate({ pathname, search: queryStr });
  };

  const moveToReviewList = (pageParam, pathname) => {
    let queryStr = reviewQueryDefault;
    if (pageParam) {
      const pageNum = getNum(pageParam.page, reviewPage);
      const sizeNum = getNum(pageParam.size, reviewSize);
      queryStr = createSearchParams({
        reviewPage: pageNum,
        reviewSize: sizeNum,
      }).toString();
    }

    navigate({ pathname, search: queryStr });
  };

  const moveToEventList = () => {
    navigate("/event");
  };

  const moveToEventRead = (no) => {
    navigate({
      pathname: `/event/${no}`,
    });
  };

  const moveToEventModify = (no) => {
    navigate({
      pathname: `/event/modify/${no}`,
    });
  };

  return {
    // 일반 목록
    moveToProductList,
    page,
    size,
    // 리뷰 목록
    moveToReviewList,
    reviewPage,
    reviewSize,
    // 이벤트
    moveToEventList,
    moveToEventRead,
    moveToEventModify,
  };
};

export default useCustomMove;
