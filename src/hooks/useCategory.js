import { useLocation } from "react-router-dom";
import { gql } from "@apollo/client";

import { useFragments } from "./useFragments";
import { useArchive } from "./useArchive";

export const useCategory = () => {
  const { fragments } = useFragments();

  const QUERY = gql`
    query CategoryHook(
      $filter: String!
      $id: ID!
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
        where: { categoryName: $filter, status: PUBLISH, hasPassword: false }
      ) {
        pageInfo {
          ...edgePageInfo
        }
        edges {
          node {
            ...postInfo
          }
        }
      }
      category(id: $id, idType: SLUG) {
        ...categoryInfo
      }
    }
    ${fragments.FragmentSeo}
    ${fragments.FragmentPageInfo}
    ${fragments.FragmentCategory}
    ${fragments.FragmentPost}
  `;

  const { pathname } = useLocation();
  const id = [...pathname.replace(/\/+$/, "").split("/")].pop();
  const variables = {
    filter: pathname,
    id,
  };

  const { data, ...props } = useArchive({
    QUERY,
    variables,
  });

  const category = data?.category || {};

  return { category, ...props };
};
