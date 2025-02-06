/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const Toprated = /* GraphQL */ `
  query Toprated {
    Toprated {
      productID
      averageRating
      __typename
    }
  }
`;
export const getTotalProducts = /* GraphQL */ `
  query GetTotalProducts {
    getTotalProducts {
      totalProducts
      __typename
    }
  }
`;
export const topReviews = /* GraphQL */ `
  query TopReviews {
    topReviews {
      id
      rating
      __typename
    }
  }
`;
export const getUsershopjawad = /* GraphQL */ `
  query GetUsershopjawad($id: ID!) {
    getUsershopjawad(id: $id) {
      id
      description
      name
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsershopjawads = /* GraphQL */ `
  query ListUsershopjawads(
    $filter: ModelUsershopjawadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsershopjawads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        name
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
      discount
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
        discount
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
