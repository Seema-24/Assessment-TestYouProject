const textbox = (field) => `input[id*="txt${field}"]`;  // ${} dynamic element inspect for most same field, resuablility perform 
const btn = '[id*="btnRegistration"]';
const termsCondn = '.common_label [href="TermsAndCondition.aspx"]';
const captcha = '[id*="Captcha_RTS"]';
const captchImg = 'img[id*="Captcha_IMG"]';

export default class Signup {        //export class Signup page to other file 

    verifyNameField() {
        cy.get(textbox('Fname')).should('be.visible');  //should assertion use
    }

    verifyEmailField() {
        cy.get(textbox('Email')).should('be.visible');
    }

    verifyLoginIdField() {
        cy.get(textbox('UserLogin1')).should('be.visible');
    }

    verifyPasswordField() {
        cy.get(textbox('password')).should('be.visible');
    }

    verifyRetypePasswordField() {
        cy.get(textbox('ReType')).should('be.visible');
    }

    verifyVarficationCodeField() {
        cy.get(textbox('VarificationCode')).should('be.visible');
    }

    verifyCreateAccountBtn() {
        cy.get(btn).should('be.visible');
    }

    clickTermsOfService() {
        //cypress not support to open multiple tab so need to remove target attribute
        cy.get(termsCondn).invoke('removeAttr', 'target').click(); 
    }

    verifyRedirectedUrl(page) {
        cy.url().should('eq', `https://www.testyou.in/${page}.aspx`);
        /** cy.url() is built-in command
         *  here ${} dollar with curly used for take exact argument, easy to understand and use rather than append with plus sign 
         */
    }

    clickToChangeCaptcha() {
        cy.get(captcha).click();
    }

    clickAndVerifyCaptchImageChanges() {
        cy.get(captchImg).then((pic) => {          // call back function use with pic variable which use inside the block
            const firstCaptcha = pic.attr('src');  //it will take src attribute value from html page 
            this.clickToChangeCaptcha();           // this keyword use for current class function, function use above
            
            cy.wait(2000);
            cy.get(captchImg).then((secPic) => {
                const secondCaptcha = secPic.attr('src');
                expect(firstCaptcha).to.not.equal(secondCaptcha);  //verify expected and actual value not equal
            })
        });
    }
    
}