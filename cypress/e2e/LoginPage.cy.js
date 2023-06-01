import Login from "../support/Pages/Login";

let testData;
const login = new Login();

describe('TestYou - Login Page scenarios', () => {

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('TC_001: Verify the elements of the Login page', () => {
        login.verifyLoginHeader();
        login.verifyHeaderText('TestYou Login');
        login.verifyLoginElements([
            'Email Address / Login Id:',
            'Password : ',
            'Stay Signed In',
            'Forgot Password ?'
        ]);
        login.verifySignUpLinkBtn();
        login.verifyLoginBtn();
        login.verifyLoginByFacebook();
        login.verifyLoginByGoogle();
    });

    it('TC_002: Verify that user is able to login successfully with valid credentials', () => {
        login.enterEmailAdd(testData.email);
        login.enterPassword(testData.password);
        login.clickCheckbox();
        login.clickLoginBtn();
    });

    it('TC_003: Verify that user is not able to login with incorrect credentials', () => {
        login.enterEmailAdd(testData.invalidEmail);
        login.enterPassword(testData.password);
        login.clickCheckbox();
        login.clickLoginBtn();
        login.verifyErrorMsg(testData.loginError);
    });

    it('TC_004: Verify validation messages with empty Email address and Password', () => {
        login.clickLoginBtn();
        login.mandatoryFieldError(testData.mandatoryFieldError);
    });

    it('TC_005: Verify the functionality of Forget password link', () => {
        login.clickOnForgotPasswordLink();
        login.verifyRedirectedUrl('ForgetPassword');
    });

    it('TC_006: Verify user is able to Forgot your password', () => {
        login.clickOnForgotPasswordLink();
        login.enterForgotPassEmail(testData.email);
        login.clickSubmitBtn();
        cy.wait(1000);
        login.forgotPasswordErrorMsg(testData.forgotPasswordError);
    }); 

    it('TC_007: Verify that user can click on Signup for TestYou link and it redirected to Signup page', () => {
        login.clickOnSignUpLink();
        login.verifyRedirectedUrl('SignUp');
    });

});