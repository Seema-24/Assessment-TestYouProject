import { beforeEach } from "mocha";
import Login from "../support/Pages/Login";

let testData;
const login = new Login();

describe('TestYou - Login Page scenerios', () => {

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('TC_001: Verify TestYou Login header', () => {
        login.verifyLoginHeader();
        login.verifyHeaderText('TestYou Login');
    });

    it('TC_002: Verify the elements of the Login page', () => {
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

    it('TC_003: Verify that user is able to login successfully with valid credentials', () => {
        login.enterEmailAdd(testData.email);
        login.enterPassword(testData.password);
        login.clickCheckbox();
        login.clickLoginBtn();
    });

    it('TC_004: Verify that user is not able to login with incorrect credentials', () => {
        login.enterEmailAdd(testData.email);
        login.enterPassword(testData.password);
        login.clickCheckbox();
        login.clickLoginBtn();
        login.verifyErrorMsg(testData.loginError);
    });

    it('TC_005: Verify mandatory field error message should displayed when user click on Login button with empty credentials', () => {
        login.clickLoginBtn();
        login.mandatoryFieldError(testData.mandatoryFieldError);
    });

    it('TC_006: Verify that user can click on Forgot password link and it redirected to forgot password page', () => {
        login.clickOnForgotPasswordLink();
        login.verifyRedirectedUrl('ForgetPassword');
    });

    it('TC_007: Verify that user can click on Signup for TestYou link and it redirected to Signup page', () => {
        login.clickOnSignUpLink();
        login.verifyRedirectedUrl('SignUp');
    });

});