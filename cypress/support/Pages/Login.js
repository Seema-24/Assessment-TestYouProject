const header = '//div[contains(@id,"login")]/div/span';
const loginBox = '[id*="login"] .login_box';
const loginBtn = '//input[contains(@id,"btnLogin")]';
const linkBtn = (link) => `[id*="login"] [href="${link}.aspx"]`; //dynamic element inspect for most same link
const facebookLink =   '.facebook_login_btn';
const googleLink = '[src*="sign-in-with-google"]';
const inputTextbox = (field) => `.login_box.clearfix [id*='Container_${field}']`; //dynamic element inspect for most same filed
const error = '.lblboxerror';
const submitBtn = '[name*="btnChangePassword"]';
const forgotPwdError = '[id*="Container_lblOutput"]';

export default class Login {    //export class Signup page to other file 

    verifyLoginHeader() {
        cy.xpath(header).should('be.visible');
    }

    verifyHeaderText(value) {
        cy.xpath(header).should('contain.text', value); //verify assertion with dynamic value pass
    }

    verifyLoginElements(elements) {                  
        /** arguments receive in array format so for use array element we use for loop with index given, it will go till index elements */
        for (let i = 0; i < elements.length; i++) {   
            cy.get(loginBox).contains(elements[i]).should('be.visible');
        }
    }

    verifyLoginBtn() {
        cy.xpath(loginBtn).should('be.visible'); //assertions for verify visiblity
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
        cy.get(inputTextbox('txtUserLogin')).type(value) // type with dynmic value
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
        cy.get(inputTextbox('valsAll')).should('contain.text', errorMsg); //assertion use and take arguments from function
    }

    clickOnForgotPasswordLink() {
        cy.get(inputTextbox('hprlnkForgetPassword')).click();
    }

    clickOnSignUpLink() {
        cy.get(linkBtn('SignUp')).click();
    }

    verifyRedirectedUrl(page) {
        cy.url().should('eq', `https://www.testyou.in/${page}.aspx`);
         /** cy.url() is built-in command
         *  here ${} dollar with curly used for take exact argument, easy to understand and use rather than append with plus sign 
         */
    }

    enterForgotPassEmail(email) {
        cy.get(inputTextbox('txtEmailId')).type(email);
    }

    clickSubmitBtn() {
        cy.get(submitBtn).click();
    }

    forgotPasswordErrorMsg(text) {
        cy.get(forgotPwdError).should('contain.text', text);
    }


}