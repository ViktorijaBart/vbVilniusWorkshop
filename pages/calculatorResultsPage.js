const answerFieldSelector = '#numberAnswerField';
const errorMsgFieldSelector = '#errorMsgField';

exports.calculatorResultsPage = class calculatorResultsPage {
    constructor(page) {
        this.page = page;
    }
    
    async getResultCalc() {
        return await this.page.inputValue(answerFieldSelector);
        }
       
    async getErrorMessage() {
        return await this.page.textContent(errorMsgFieldSelector);
            }
}