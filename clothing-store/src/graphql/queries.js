/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProductshopcojawad = /* GraphQL */ `
  query GetProductshopcojawad($id: ID!) {
    getProductshopcojawad(id: $id) {
      id
      name
      category
      style
      image
      images
      price
      newPrice
      sizes
      colors
      description
      reviews {
        items {
          id
          productID
          name
          rating
          comment
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProductshopcojawads = /* GraphQL */ `
  query ListProductshopcojawads(
    $filter: ModelProductshopcojawadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductshopcojawads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category
        style
        image
        images
        price
        newPrice
        sizes
        colors
        description
        reviews {
          items {
            id
            productID
            name
            rating
            comment
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReviewshop = /* GraphQL */ `
  query GetReviewshop($id: ID!) {
    getReviewshop(id: $id) {
      id
      productID
      name
      rating
      comment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReviewshops = /* GraphQL */ `
  query ListReviewshops(
    $filter: ModelReviewshopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviewshops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productID
        name
        rating
        comment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reviewshopsByProductIDAndCreatedAt = /* GraphQL */ `
  query ReviewshopsByProductIDAndCreatedAt(
    $productID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewshopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewshopsByProductIDAndCreatedAt(
      productID: $productID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        name
        rating
        comment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
