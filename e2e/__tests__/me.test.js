const request = require('../request');
const { dropCollection } = require('../db');
const { signupAdmin } = require('../data-helpers');

describe('me API', () => {
  beforeEach(() => dropCollection('users'));

  let user = null;

  beforeEach(() => {
    return signupAdmin()
      .then(newUser => user = newUser);
  });

  const data = {
    name: 'English',
    region: {
      name: 'Global',
      countries: 67
    },
    population: 1500000000,
    isEndangered: false,
    wordOrder: ['SVO'],
  };

  function postLang(language) {
    return request
      .post('/api/languages')
      .set('Authorization', user.token)
      .send(language)
      .expect(200)
      .then(({ body }) => body);
  }





  it('getting no favs returns empty array', () => {
    return request
      .get('/api/me/favorites')
      .set('Authorization', user.token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });

  it('updates a favorite language', () => {
    return postLang(data)
      .then(lang => {
        return request
          .put(`/api/me/favorites/${lang._id}`)
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body[0].name).toBe(data.name);
      });
  });

  it('getting favs returns favs', () => {
    return Promise.all([
      postLang(data),
      postLang(data),
      postLang(data)
    ])
      .then(body => {
        return request
          .put(`/api/me/favorites/${body[0]._id}`)
          .set('Authorization', user.token)
          .send(body[0]._id)
          .expect(200);
      })
      .then(() => {
        return request
          .get('/api/me/favorites')
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body[0].name).toBe('English');
      });
  });

  it('removes a favorite language', () => {
    return postLang(data)
      .then(body => {
        return request
          .put(`/api/me/favorites/${body._id}`)
          .set('Authorization', user.token)
          .send(body)
          .expect(200);
      })
      .then(({ body }) => {
        return request
          .delete(`/api/me/favorites/${body[0]._id}`)
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });



});

