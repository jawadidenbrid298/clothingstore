/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProductshopcojawad = /* GraphQL */ `
  mutation CreateProductshopcojawad(
    $input: CreateProductshopcojawadInput!
    $condition: ModelProductshopcojawadConditionInput
  ) {
    createProductshopcojawad(input: $input, condition: $condition) {
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
export const updateProductshopcojawad = /* GraphQL */ `
  mutation UpdateProductshopcojawad(
    $input: UpdateProductshopcojawadInput!
    $condition: ModelProductshopcojawadConditionInput
  ) {
    updateProductshopcojawad(input: $input, condition: $condition) {
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
export const deleteProductshopcojawad = /* GraphQL */ `
  mutation DeleteProductshopcojawad(
    $input: DeleteProductshopcojawadInput!
    $condition: ModelProductshopcojawadConditionInput
  ) {
    deleteProductshopcojawad(input: $input, condition: $condition) {
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
export const createReviewshop = /* GraphQL */ `
  mutation CreateReviewshop(
    $input: CreateReviewshopInput!
    $condition: ModelReviewshopConditionInput
  ) {
    createReviewshop(input: $input, condition: $condition) {
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
export const updateReviewshop = /* GraphQL */ `
  mutation UpdateReviewshop(
    $input: UpdateReviewshopInput!
    $condition: ModelReviewshopConditionInput
  ) {
    updateReviewshop(input: $input, condition: $condition) {
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
export const deleteReviewshop = /* GraphQL */ `
  mutation DeleteReviewshop(
    $input: DeleteReviewshopInput!
    $condition: ModelReviewshopConditionInput
  ) {
    deleteReviewshop(input: $input, condition: $condition) {
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
