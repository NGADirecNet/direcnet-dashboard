const baseAPI = '/api';

const atlassianApiService = {
    get() {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/bitbucket/branches`)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
        });
    },

    getCommits(branch) {
        return new Promise((resolve, reject) => {
            fetch(`${baseAPI}/bitbucket/commits/${encodeURIComponent(branch)}`)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default atlassianApiService;