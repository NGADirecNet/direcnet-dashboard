const baseAPI = '/api';

const dashApiService = {
    get() {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/dash`)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
        });
    },

    update(d) {
        return new Promise((resolve, reject) => {
          fetch(`${baseAPI}/updateDash`, {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
}

export default dashApiService;