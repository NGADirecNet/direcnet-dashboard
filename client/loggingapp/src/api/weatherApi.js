const baseAPI = '/api';

const weatherApiService = {

    get(lat, long) {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/weather/${lat}/${long}`)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                })
        })
    }
}

export default weatherApiService;