const serverUrl = '  http://localhost:3000'; // Replace with your preferred way of configuring the server URL

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${serverUrl}/orders/?user.id=${userId}`);
    // const response = await fetch('http://localhost:3000/orders/?user.id='+userId) 
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    // } else {
    //   resolve({ data: [] }); // Resolve the promise with an empty array or appropriate error handling
    }
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/users/${userId}`);

      console.log('userId fetchLoggedInUser', userId)
      console.log('response fetchLoggedInUser', response)
      // if (response.ok) {
        // const data = await response.json();
        const data = await response.json()

        console.log('data fetchLoggedInUser', data)
        resolve({ data });
      // }
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${serverUrl}/users/${update.id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' }
      });
      const data = await response.json()
      resolve({ data })
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
