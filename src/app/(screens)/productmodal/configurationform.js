export const formFields = [
  {
    label: 'Category',
    id: 'category',
    name: 'category',
    type: 'select',
    options: ['Casual', 'Formal', 'Party', 'Gym'], 
    required: true
  },
  {
    label: 'Style',
    id: 'style',
    name: 'style',
    type: 'text',
    placeholder: 'Enter style',
    required: true
  },
  {
    label: 'Product Name',
    id: 'name',
    name: 'name',
    type: 'text',
    required: true
  },
  {
    label: 'Price ($)',
    id: 'price',
    name: 'price',
    type: 'number',
    required: true
  },
  {
    label: 'Discount Percentage',
    id: 'discount',
    name: 'discountPercentage',
    type: 'number',
    placeholder: 'e.g., 50'
  },
  {
    label: 'New Price (calculated)',
    id: 'newPrice',
    name: 'newPrice',
    type: 'number',
    readOnly: true
  },
  {
    label: 'Sizes (comma-separated)',
    id: 'sizes',
    name: 'sizes',
    type: 'text',
    placeholder: 'e.g., Small, Medium, Large',
    required: true
  },
  {
    label: 'Colors (comma-separated)',
    id: 'colors',
    name: 'colors',
    type: 'text',
    placeholder: 'e.g., Red, Blue, Green',
    required: true
  },
  {
    label: 'Description',
    id: 'description',
    name: 'description',
    type: 'textarea',
    placeholder: 'Enter product description',
    required: true
  }
];
