export const createProductFormData = (productData, files, sizes) => {
  const formData = new FormData();

  // Append basic product fields
  for (const key in productData) {
    // Skip complex objects that need special handling
    if (key === 'images' || key === 'sizes' || key === 'files' || key === 'uploadFileNames') {
      continue;
    }
    // Handle boolean type conversion for Spring
    if (typeof productData[key] === 'boolean') {
      formData.append(key, productData[key] ? 'true' : 'false');
    } else {
      formData.append(key, productData[key]);
    }
  }

  // Append files
  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append('files', file);
    });
  }

  // Append sizes (crucial for nested objects in multipart/form-data)
  if (sizes && sizes.length > 0) {
    sizes.forEach((sizeItem, index) => {
      formData.append(`sizes[${index}].productSize`, sizeItem.productSize);
      formData.append(`sizes[${index}].stock`, sizeItem.stock);
    });
  }

  return formData;
};
