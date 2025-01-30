/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUsershopjawad = /* GraphQL */ `
  mutation CreateUsershopjawad(
    $input: CreateUsershopjawadInput!
    $condition: ModelUsershopjawadConditionInput
  ) {
    createUsershopjawad(input: $input, condition: $condition) {
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
export const updateUsershopjawad = /* GraphQL */ `
  mutation UpdateUsershopjawad(
    $input: UpdateUsershopjawadInput!
    $condition: ModelUsershopjawadConditionInput
  ) {
    updateUsershopjawad(input: $input, condition: $condition) {
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
export const deleteUsershopjawad = /* GraphQL */ `
  mutation DeleteUsershopjawad(
    $input: DeleteUsershopjawadInput!
    $condition: ModelUsershopjawadConditionInput
  ) {
    deleteUsershopjawad(input: $input, condition: $condition) {
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
