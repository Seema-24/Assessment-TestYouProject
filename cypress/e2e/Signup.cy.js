import Signup from "../support/Pages/Signup";  /** import class with location */

/** Constructor created of Signup page so that method/function can be called from one file to other 
 *  const is fixed variable datatypes
 *  sign is refercence variable by which function need to call
 */
const sign = new Signup();

/** describe block is test suite where give description or scenarios of that page working on*/
describe('TestYou - Signup Page scenarios', () => {

    /** BeforeEach is a hook which will execute before each of the test case i.e visit url */
    beforeEach(() => {

        /** visit is built-in method for visit to Url 
         *  dynamic envirnoment variable given for signup Url from cypress configuration file
         *  signupUrl is a key of cypress env use in config file, 
         *  also can give valid username and password that will mostly use in all over the sepc file 
        */
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
     
    it('TC_009: Verify that user can click on Terms of Service link', () => {
        sign.clickTermsOfService();
        sign.verifyRedirectedUrl('TermsAndCondition'); //parameter pass to function in string format
    });

    it('TC_010: Verify that user is able to change another captcha code in Signup page', () => {
        sign.clickAndVerifyCaptchImageChanges();
    });
});