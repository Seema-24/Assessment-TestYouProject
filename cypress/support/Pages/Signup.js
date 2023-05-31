const textbox = (field) => `input[id*="txt${field}"]`;
const btn = '[id*="btnRegistration"]';
const termsCondn = '.common_label [href="TermsAndCondition.aspx"]';
const captcha = '[id*="Captcha_RTS"]';
const captchImg = 'img[id*="Captcha_IMG"]';

export default class Signup {

    verifyNameField() {
        cy.get(textbox('Fname')).should('be.visible');
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
    }

    clickToChangeCaptcha() {
        cy.get(captcha).click();
    }

    clickAndVerifyCaptchImageChanges() {
        cy.get(captchImg).then((pic) => {
            const firstCaptcha = pic.attr('src');
            this.clickToChangeCaptcha();
            
            cy.wait(2000);
            cy.get(captchImg).then((secPic) => {
                const secondCaptcha = secPic.attr('src');
                expect(firstCaptcha).to.not.equal(secondCaptcha);
            })
        });
    }
    
}