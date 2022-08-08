const axios = require('axios')

function get(req, res) {
    axios({
        method: "get",
        url: "https://cuse-atlassian.alionscience.com:8446/rest/api/1.0/projects/DNET/repos/Simulink/branches",
        // url: "https://cuse-atlassian.alionscience.com:8446/rest/api/1.0/projects/DNET/repos/Simulink/commits?until=feat/DNET-346-Google-Earth-To-Python",
        headers: { 
            'Authorization': 'Basic ' + process.env.BITBUCKET_AUTH
          }
    }).then(data => {
        res.json(data.data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

function getCommits(req, res) {
    const { branch } = req.params;
    axios({
        method: "get",
        url: "https://cuse-atlassian.alionscience.com:8446/rest/api/1.0/projects/DNET/repos/Simulink/commits?until=" + branch,
        headers: { 
            'Authorization': 'Basic ' + process.env.BITBUCKET_AUTH
          }
    }).then(data => {
        res.json(data.data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

module.exports = { get, getCommits };