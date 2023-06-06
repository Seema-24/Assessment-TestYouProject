import Login from "../support/Pages/Login";   /** import class with location */ 

let testData;      /** declare variable by datatype let which is block scope*/

/** Constructor created of Login page so that method/function can be called from one file to other
 *  const is fixed data type declared
 *  login is reference variable
 */
const login = new Login();     

/** describe block is test suite where give description or scenarios of that page working on*/
describe('TestYou - Login Page scenarios', () => {     

    /** before is a hook which will run first before testcase execute */
    before(() => {         
        cy.fixture('testData').then((data) => {     
            testData = data;              /** fixture file is used as data driven test for take dynamic data from file*/ 
        });
    });

    /** BeforeEach is also a hook which will execute before each of the test case */
    beforeEach(() => {
        /** dynamic url given i.e baseUrl from cypress config file,
         *  need not to hard code url in every spec file, it will take baseUrl as append with '/' 
         */
        cy.visit('/');  
    });


    /** it block where testcase written  */
    it('TC_001: Verify the elements of the Login page', () => { 

        /** login is reference variable by which function call and logic written in class file */
        login.verifyLoginHeader();
        login.verifyHeaderText('TestYou Login'); //Parameter pass to function, easy understandable & Logic need not to changed if Header name change  
        login.verifyLoginElements([              
            'Email Address / Login Id:',         //Array parameter pass to function so that not need to create same elements multiple time, only text is changing
            'Password : ',                       //Reusability the function
            'Stay Signed In',
            'Forgot Password ?'
        ]);
        login.verifySignUpLinkBtn();
        login.verifyLoginBtn();
        login.verifyLoginByFacebook();
        login.verifyLoginByGoogle();
    });

    it('TC_002: Verify that user is able to login successfully with valid credentials', () => {
        login.enterEmailAdd(testData.email);       // take data from fixture file   
        login.enterPassword(testData.password);    // user's Email and password can be dynamic
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