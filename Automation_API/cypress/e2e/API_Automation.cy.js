describe('Reqres API Automation Testing - Sherly Mei Yanti', () => {

  const headers = {
    'x-api-key': 'reqres_bbe2ee620e934c8e8e255fcc174176ae'
  }

  // 1. GET List Users
  it('GET List Users', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      headers
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data).to.not.be.empty
    })
  })

  // 2. GET Single User
  it('GET Single User', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.id).to.eq(2)
    })
  })

  // 3. GET User Not Found
  it('GET User Not Found', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      headers,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  // 4. POST Create User
  it('POST Create User', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers,
      body: {
        name: "Sherly",
        job: "QA Engineer"
      }
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.name).to.eq("Sherly")
    })
  })

  // 5. PUT Update User
  it('PUT Update User', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      headers,
      body: {
        name: "Sherly Update",
        job: "QA"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  // 6. DELETE User
  it('DELETE User', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers
    }).then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  // 7. POST Register Successful
  it('POST Register Successful', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers,
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.token).to.exist
    })
  })

  // 8. POST Register Failed
  it('POST Register Failed', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers,
      failOnStatusCode: false,
      body: {
        email: "sydney@fife"
      }
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })

  // 9. POST Login Successful
  it('POST Login Successful', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.token).to.exist
    })
  })

  // 10. POST Login Failed
  it('POST Login Failed', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers,
      failOnStatusCode: false,
      body: {
        email: "peter@klaven"
      }
    }).then((res) => {
      expect(res.status).to.eq(400)
    })
  })

})
