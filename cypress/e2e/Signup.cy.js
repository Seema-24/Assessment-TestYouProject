import Signup from "../support/Pages/Signup";

const sign = new Signup();

describe('TestYou - Signup Page scenerios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('signupUrl'));
    });

    it('TC_008: Verify the elements of the Signup page', () => {
       sign.verifyNameField();
       sign.verifyEmailField();
       sign.verifyLoginIdField();
       sign.verifyPasswordField();
       sign.verifyRetypePasswordField();
       sign.verifyVarficationCodeField();
       sign.verifyCreateAccountBtn();
    });
     
    it('TC_009: Verify that user can click on Terms of Service link then it redirected to Terms and condition page', () => {
        sign.clickTermsOfService();
        sign.verifyRedirectedUrl('TermsAndCondition');
    });

    it('TC_010: Verify that user is able to change another captcha code in Signup page', () => {
        sign.clickAndVerifyCaptchImageChanges();
    });
});