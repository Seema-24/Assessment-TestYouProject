const header = '//div[contains(@id,"login")]/div/span';
const loginBox = '[id*="login"] .login_box';
const loginBtn = '//input[contains(@id,"btnLogin")]';
const linkBtn = (link) => `[id*="login"] [href="${link}.aspx"]`;
const facebookLink =   '.facebook_login_btn';
const googleLink = '[src*="sign-in-with-google"]';
const inputTextbox = (field) => `.login_box.clearfix [id*='Container_${field}']`;
const error = '.lblboxerror';

export default class Login {

    verifyLoginHeader() {
        cy.xpath(header).should('be.visible');
    }

    verifyHeaderText(value) {
        cy.xpath(header).should('contain.text', value);
    }

    verifyLoginElements(elements) {
        for (let i = 0; i < elements.length; i++) {
            cy.get(loginBox).contains(elements[i]).should('be.visible');
        }
    }

    verifyLoginBtn() {
        cy.xpath(loginBtn).should('be.visible');
    }

    verifySignUpLinkBtn() {
        cy.get(linkBtn('SignUp')).should('be.visible');
    }

    verifyLoginByFacebook() {
        cy.get(facebookLink).should('be.visible');
    }

    verifyLoginByGoogle() {
        cy.get(googleLink).should('be.visible');
    }

    enterEmailAdd(value) {
        cy.get(inputTextbox('txtUserLogin')).type(value)
    }

    enterPassword(value) {
        cy.get(inputTextbox('txtPassword')).type(value)
    }

    clickCheckbox() { 
        cy.get(inputTextbox('chkRememberMe')).check();
    }

    clickLoginBtn() {
        cy.xpath(loginBtn).click();
    }

    verifyErrorMsg(errorMsg) {
        cy.get(error).should('contain.text', errorMsg);
    }

    mandatoryFieldError(errorMsg) {
        cy.get(inputTextbox('valsAll')).should('contain.text', errorMsg);
    }

    clickOnForgotPasswordLink() {
        cy.get(inputTextbox('hprlnkForgetPassword')).click();
    }

    clickOnSignUpLink() {
        cy.get(linkBtn('SignUp')).click();
    }

    verifyRedirectedUrl(page) {
        cy.url().should('eq', `https://www.testyou.in/${page}.aspx`);
    }



}