let emailField = '#login'
let passField = '#password'
let loginButton = '.login .puco-button'
let acceptCookie = '.banner-actions-container > #onetrust-accept-btn-handler'
let loginLink = '.puco-header__right-wrapper .puco-navigation-link.puco-navigation-link .puco-navigation-link__text'
let accountMenu = 'button[data-test="account-menu-button"]'
let logoutOption = 'a[data-test="submenu-item-logout"]'

export class LoginPage {

    static getTypeEmail(emailaddress) {
        cy.get(emailField).type(emailaddress)
    }

    static getPassField(password) {
        cy.get(passField).type(password)
    }

    static getLogin() {
        cy.get(loginButton).click()
        cy.url().should('include', '/deals')

    }

    static getAcceptCookies() {
        cy.get(acceptCookie).click()
    }

    static getLoginLink() {
        cy.get(loginLink).click()
        cy.url().should('eq', 'https://app.pipedrive.com/auth/login')
    }

    static getLogout() {
        cy.get(accountMenu).click()
        cy.get(logoutOption).click()
        cy.url().should('eq', 'https://www.pipedrive.com/')

    }

}