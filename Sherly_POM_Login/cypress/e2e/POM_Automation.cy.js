import LoginPage from '../support/pages/LoginPage'

describe('POM Automation Login - OrangeHRM', () => {

  let data

  before(() => {
    cy.fixture('login').then((loginData) => {
        data = loginData
    })
  })

  beforeEach(() => {
    LoginPage.visit(data.url)
  })

  // ===============================
  // POSITIVE TEST CASE
  // ===============================

  it('TC01 - Login valid', () => {
    LoginPage.login(data.validUser, data.validPass)
    LoginPage.verifyDashboard()
  })

  it('TC02 - Login dengan Enter', () => {
    LoginPage.inputUsername(data.validUser)
    LoginPage.pressEnterPassword(data.validPass)
    LoginPage.verifyDashboard()
  })

  // ===============================
  // NEGATIVE TEST CASE
  // ===============================

  it('TC03 - Username kosong', () => {
    LoginPage.inputPassword(data.validPass)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC04 - Password kosong', () => {
    LoginPage.inputUsername(data.validUser)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()
  })

  it('TC05 - Username salah', () => {
    LoginPage.login(data.invalidUser, data.validPass)
    LoginPage.verifyInvalid()
  })

  it('TC06 - Password salah', () => {
    LoginPage.login(data.validUser, data.invalidPass)
    LoginPage.verifyInvalid()
  })

  // ===============================
  // UI TEST CASE
  // ===============================

  it('TC07 - Password hidden', () => {
    LoginPage.verifyPasswordHidden()
  })

  it('TC08 - Logo tampil', () => {
    LoginPage.verifyLogo()
  })

  it('TC09 - Forgot Password', () => {
    LoginPage.clickForgotPassword()
  })

  it('TC10 - Form tampil', () => {
    LoginPage.verifyForm()
  })

})
