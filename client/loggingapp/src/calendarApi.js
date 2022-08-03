const baseAPI = '/api';

const calendarApiService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/getCalendar`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(cal) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/createCalendar`, {
        method: 'PUT',
        body: JSON.stringify(cal),
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

  update(cal) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/updateCalendar`, {
        method: 'POST',
        body: JSON.stringify(cal),
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

  destroy(cal) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/deleteCalendar/${cal.Id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default calendarApiService;