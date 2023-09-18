const serverUrl = 'http://localhost:3000'; // Replace with your preferred way of configuring the server URL

export function fetchAllProducts() {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

export function fetchProductById(id) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

export function createProduct(product) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/products/`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

export function updateProduct(update) {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/products/${update.id}`,{
        method : "PATCH",
        body : JSON.stringify(update),
        headers : { 'content-type' : 'application/json'}
    });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {

  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
    console.log('key ,sort[key]', key ,sort[key])
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    console.log('key ,pagination[key]', key ,pagination[key])
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/products?${queryString}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('queryString ', response)
      const data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count")
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}



export function fetchAllBrands() {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/brands`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
export function fetchAllCategories() {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

