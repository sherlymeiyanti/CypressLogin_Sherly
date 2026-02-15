describe('Login Feature - OrangeHRM', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  const validUser = 'Admin'
  const validPass = 'admin123'

  beforeEach(() => {
    cy.visit(url, { failOnStatusCode: false })
    cy.get('input[name="username"]', { timeout: 15000 }).should('be.visible')
  })

  // ===============================
  // POSITIVE TEST CASE
  // ===============================

  it('TC01 - Login dengan username & password valid', () => {
    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type(validPass)
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC02 - Login dengan tombol Enter', () => {
    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type(validPass + '{enter}')

    cy.url().should('include', '/dashboard')
  })

  // ===============================
  // NEGATIVE TEST CASE
  // ===============================

  it('TC03 - Username kosong', () => {
    cy.get('input[name="password"]').type(validPass)
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC04 - Password kosong', () => {
    cy.get('input[name="username"]').type(validUser)
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  it('TC05 - Username salah', () => {
    cy.get('input[name="username"]').type('SalahUser')
    cy.get('input[name="password"]').type(validPass)
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC06 - Password salah', () => {
    cy.get('input[name="username"]').type(validUser)
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  // ===============================
  // UI TEST CASE
  // ===============================

  it('TC07 - Password field harus hidden', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
  })

  it('TC08 - Logo OrangeHRM tampil', () => {
    cy.get('img').should('be.visible')
  })

  it('TC09 - Link Forgot Password berfungsi', () => {
    cy.contains('Forgot your password?').click()
    cy.url().should('include', 'requestPasswordResetCode')
  })

  it('TC10 - Form Login tampil', () => {
    cy.get('form').should('exist')
  })

})
