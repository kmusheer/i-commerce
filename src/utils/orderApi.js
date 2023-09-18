const serverUrl = '  http://localhost:3000'; // Replace with your preferred way of configuring the server URL

export function createOrder(order) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/orders`,{
                method : "POST",
                body : JSON.stringify(order),
                headers : { 'content-type' : 'application/json'}
            });
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export function updateOrder(update) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/orders/${update.id}`,{
                method : "PATCH",
                body : JSON.stringify(update),
                headers : { 'content-type' : 'application/json'}
            });
            console.log('response slice', response)
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export function fetchAllOrders(sort, pagination) {

    let queryString = "";
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    //   console.log('`${key}=${sort[key]}&`', `${key}=${sort[key]}&`)
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    //   console.log('`${key}=${pagination[key]}&`', `${key}=${pagination[key]}&`)
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/orders?${queryString}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('queryString data', data)
            const totalOrders = await response.headers.get("X-Total-Count")
            console.log('queryString totalOrders', totalOrders)
        resolve({ data: { orders: data, totalOrders: +totalOrders } });

      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  }