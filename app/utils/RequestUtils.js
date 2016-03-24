export function request(url, method, body) {
    var isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            body: body,
        })
            .then((response) => {
                if (response.ok) {
                    isOk = true;
                } else {
                    isOk = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    })
}