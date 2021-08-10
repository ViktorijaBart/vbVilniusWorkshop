exports.calculatorPage = class calculatorPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }
    
    async selectBuild(buildVersion) {
    await this.page.selectOption('select#selectBuild', buildVersion);
    }

    async fieldsInputAndOparation(inputField1, inputField2, operation) {
        await this.page.fill('#number1Field',inputField1);
        await this.page.fill('#number2Field',inputField2);
        await this.page.selectOption('select#selectOperationDropdown', operation);
        await this.page.click('#calculateButton');
    }
}