const baseAPI = '/api';

const mapsApiService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/map`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(map) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/createMap`, {
        method: 'PUT',
        body: JSON.stringify(map),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(map) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/updateMap`, {
        method: 'POST',
        body: JSON.stringify(map),
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

  destroy(map) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/deleteMap/${map._id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default mapsApiService;