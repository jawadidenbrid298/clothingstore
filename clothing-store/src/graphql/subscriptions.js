/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProductshopcojawad = /* GraphQL */ `
  subscription OnCreateProductshopcojawad(
    $filter: ModelSubscriptionProductshopcojawadFilterInput
  ) {
    onCreateProductshopcojawad(filter: $filter) {
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
export const onUpdateProductshopcojawad = /* GraphQL */ `
  subscription OnUpdateProductshopcojawad(
    $filter: ModelSubscriptionProductshopcojawadFilterInput
  ) {
    onUpdateProductshopcojawad(filter: $filter) {
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
export const onDeleteProductshopcojawad = /* GraphQL */ `
  subscription OnDeleteProductshopcojawad(
    $filter: ModelSubscriptionProductshopcojawadFilterInput
  ) {
    onDeleteProductshopcojawad(filter: $filter) {
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
export const onCreateReviewshop = /* GraphQL */ `
  subscription OnCreateReviewshop(
    $filter: ModelSubscriptionReviewshopFilterInput
  ) {
    onCreateReviewshop(filter: $filter) {
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
export const onUpdateReviewshop = /* GraphQL */ `
  subscription OnUpdateReviewshop(
    $filter: ModelSubscriptionReviewshopFilterInput
  ) {
    onUpdateReviewshop(filter: $filter) {
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
export const onDeleteReviewshop = /* GraphQL */ `
  subscription OnDeleteReviewshop(
    $filter: ModelSubscriptionReviewshopFilterInput
  ) {
    onDeleteReviewshop(filter: $filter) {
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
