import { gql, useQuery } from "@apollo/client";

import { useFragments } from "./useFragments";
import { usePagination, getPageInfo, useNavigation } from "./usePagination";

export const useArchive = (props = {}) => {
  const { fragments } = useFragments();

  const DEFAULT_QUERY = gql`
    query ArchiveHook(
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      posts(
        first: $first
        last: $last
        after: $after
        before: $before
        where: { status: PUBLISH, hasPassword: false }
      ) {
        edges {
          node {
            ...postInfo
          }
        }
        pageInfo {
          ...edgePageInfo
        }
      }
    }
    ${fragments.FragmentSeo}
    ${fragments.FragmentCategory}
    ${fragments.FragmentPageInfo}
    ${fragments.FragmentPost}
  `;

  const {
    QUERY = DEFAULT_QUERY,
    variables: propVariables = {},
    field = "posts",
    perPage = 10,
  } = props;
  const { variables, goNext, goPrev } = usePagination(perPage);

  const { data = {}, loading, error } = useQuery(QUERY, {
    variables: { ...variables, ...propVariables },
    errorPolicy: "all",
  });

  const edges = data[field]?.edges?.length ? data[field].edges : [];
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    data[field]?.pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
    data,
  };
};
