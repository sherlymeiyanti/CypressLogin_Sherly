describe('Login Feature - OrangeHRM (All Intercept)', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  const validUser = 'Admin'
  const validPass = 'admin123'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
    cy.get('input[name="username"]', { timeout: 15000 }).should('be.visible')
  })


  it('TC01 - Login valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginValid')

    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type(validPass)
    cy.get('button[type="submit"]').click()

    cy.wait('@loginValid').its('response.statusCode').should('be.oneOf',[200,302])
    cy.url().should('include', '/dashboard')
  })


  it('TC02 - Login tombol Enter', () => {

    cy.intercept('GET', '**/dashboard/**').as('dashboardLoad')

    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type(validPass + '{enter}')

    cy.wait('@dashboardLoad').its('response.statusCode').should('eq',200)
  })


  it('TC05 - Username salah', () => {

    cy.intercept({
      method: 'POST',
      url: '**/auth/validate'
    }).as('wrongUser')

    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type(validPass)
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUser')
    cy.contains('Invalid credentials').should('be.visible')
  })


  it('TC06 - Password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('wrongPass')

    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPass').its('response.statusCode')
      .should('be.oneOf', [200,302])

    cy.contains('Invalid credentials').should('be.visible')
  })


  it('TC09 - Forgot Password', () => {

    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPage')

    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPage').its('response.statusCode').should('eq',200)
    cy.url().should('include', 'requestPasswordResetCode')
  })


})
