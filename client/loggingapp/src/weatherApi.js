const baseAPI = '/api';

const weatherApiService = {

    get() {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/weather`)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                })
        })
    }
}

export default weatherApiService;