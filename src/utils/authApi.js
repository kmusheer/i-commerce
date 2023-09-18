
const serverUrl = '  http://localhost:3000'; // Replace with your preferred way of configuring the server URL

export function createUser(userData) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${serverUrl}/users`,{
                method : "POST",
                body : JSON.stringify(userData),
                headers : { 'content-type' : 'application/json'}
            });
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export function checkUser(loginInfo) {

    return new Promise(async (resolve, reject) => {
        const email = loginInfo.email;
        const password = loginInfo.password;
        try {

            const response = await fetch(`${serverUrl}/users?email=${email}`);
            const data = await response.json()
            if (data.length) {
                if (password == data[0].password) {
                    resolve({data: data[0] })
                } else {
                    reject({ message : "Wrong credentials"})
                }
            }else {
                reject({ message : "user not found"})
            }
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}

export function signOut(loginInfo) {

    return new Promise(async (resolve, reject) => {
        try {
            resolve ({ data : "success"})
        } catch (error) {
            reject(error); // Reject the promise if there's an error
        }
    });
}
