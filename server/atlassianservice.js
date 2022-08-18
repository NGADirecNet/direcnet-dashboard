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
        if (data && data.data)
            res.json(data.data);
        else res.status(500).send(err);
    })
        .catch(err => {
            res.status(500).send(err);
        });
}

async function getProgress(req, res) {
    let branchIds = [];
    let commits = [];
    // takes latest 5 branches and queries all the recent commits from them
    await axios({
        method: "get",
        url: "https://cuse-atlassian.alionscience.com:8446/rest/api/1.0/projects/DNET/repos/Simulink/branches?limit=5",
        headers: {
            'Authorization': 'Basic ' + process.env.BITBUCKET_AUTH
        }
    }).then(data => {
        if (data && data.data && data.data.values) {
            branchIds = data.data.values.map(branch => branch.displayId)
        }
        else res.status(500).send(err);
        res.end();
    })
        .catch(err => {
            res.status(500).send(err);
            res.end();
        });
    for (var i = 0; i < branchIds.length; i++) {
        await axios({
            method: "get",
            url: "https://cuse-atlassian.alionscience.com:8446/rest/api/1.0/projects/DNET/repos/Simulink/commits?until=" + branchIds[i],
            headers: {
                'Authorization': 'Basic ' + process.env.BITBUCKET_AUTH
            }
        }).then(commit => {
            if (commit.data) commits.push({branch: branchIds[i], ...commit.data})
            else commits.push({})
        })
    }
    if (commits.length) res.json({ commits: commits });
}

module.exports = { get, getCommits, getProgress };