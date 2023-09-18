const serverUrl = '  http://localhost:3000'; // Replace with your preferred way of configuring the server URL

export function addToCart(item) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/cart`,{
                method : "POST",
                body : JSON.stringify(item),
                headers : { 'content-type' : 'application/json'}
            });
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export function fetchItemsByUserId(userId) {

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${serverUrl}/cart?user=${userId}`);
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

  export function updateCart(update) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/cart/${update.id}`,{
                method : "PATCH",
                body : JSON.stringify(update),
                headers : { 'content-type' : 'application/json'}
            });
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

  export function deleteItemFromCart(itemId) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/cart/${itemId}`,{
                method : "DELETE",
                headers : { 'content-type' : 'application/json'}
            });
            await response.json()
            resolve({data :{id : itemId}})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export const resetCart = (userId) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            const response = await fetchItemsByUserId(userId)
            const items = response.data;
        for (const item of items) {
            await deleteItemFromCart(item.id)
        }
        resolve({ status : "success"})
        } catch (error) {
            reject(error)
        }
        
    })
}