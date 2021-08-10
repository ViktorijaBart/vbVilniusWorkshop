const { test, expect } = require('@playwright/test');
const {calculatorPage} = require('../pages/calculatorPage');
const {calculatorResultsPage} = require('../pages/calculatorResultsPage');

test.describe('', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      startPage = new calculatorPage(page);
      resultsPage = new calculatorResultsPage(page);
    });
    test.beforeEach(async () => {
        await startPage.goto();
      });

test('1- Calculator Website Loading', async () => {
  const CalculatorForm = await page.isVisible('#calcForm');
  expect(CalculatorForm).toBe(true);
});

test('2 - Checking basic functions of Calculator', async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.fieldsInputAndOparation('1','9','0');
    const resultCalc1 = await page.inputValue('#numberAnswerField');
    expect(resultCalc1).toBe('10');
  });

  test('3 - Checking all Calculator functions and clearing the field', async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.selectBuild('0');
    await startPage.fieldsInputAndOparation('5.7','6','0');
    const resultCalc = await resultsPage.getResultCalc();
    //console.log(resultCalc1);
    expect(resultCalc).toBe('11.7');
    await page.check('#integerSelect');
    expect(await page.isChecked('#integerSelect')).toBeTruthy();
    const resultCalcInteger = await resultsPage.getResultCalc();
    //console.log(resultCalc2);
    expect(resultCalcInteger).toBe('11');
    await page.click('#clearButton');
    const resultCalcAfterClear = await resultsPage.getResultCalc();
    expect(resultCalcAfterClear).toEqual('');
  });

  const invalidInputsIn1Field = ['vgsdasf', '6jsaka', '%$£'];
  invalidInputsIn1Field.forEach(invalidInputIn1Field => {
  test.only(`4 - Checking error messages in Calculator using ${invalidInputIn1Field} in 1 Field`, async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.selectBuild('0');
    await startPage.fieldsInputAndOparation(invalidInputIn1Field,'6','0');
    const errorMessageField1 = await resultsPage.getErrorMessage();
    //console.log(errorMessageField1);
    expect(errorMessageField1).toBe('Number 1 is not a number');
});
});

const invalidInputsIn2Field = ['vgsdasf', '6jsaka', '%$£'];
  invalidInputsIn2Field.forEach(invalidInputIn2Field => {
    test.only(`5 - Checking error messages in Calculator using ${invalidInputIn2Field} in 2 Field`, async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.selectBuild('0');
    await startPage.fieldsInputAndOparation('657',invalidInputIn2Field,'0');
    const errorMessageField2 = await resultsPage.getErrorMessage();
    //console.log(errorMessageField2);
    expect(errorMessageField2).toBe('Number 2 is not a number');
});
});

  test.only('6 - Trying to add more that 10 numbers in Calculator fields', async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.selectBuild('0');
    await startPage.fieldsInputAndOparation('11111111111','5555555555555555555','0');
    const resultLenght = await resultsPage.getResultCalc();
    //console.log(resultLenght);
    expect(resultLenght.length).toBe(10);
  });

  test.only('7 - Checking empty fields in Calculator', async () => {
    //await page.waitForSelector('#calcForm');
    await startPage.selectBuild('0');
    await startPage.fieldsInputAndOparation('','','0');
    const emptyFields = await resultsPage.getResultCalc();
    //console.log(emptyResult);
    expect(emptyFields).toBe('0');
  });

  const differentBuildVersions = ['Prototype', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  differentBuildVersions.forEach(differentBuildVersion => {
    test.only(`8 - Select ${differentBuildVersion} build version to test Calculator`, async () => {
        await startPage.selectBuild(differentBuildVersion);
        await startPage.fieldsInputAndOparation('5.7','6','0');
        const resultCalc2 = await resultsPage.getResultCalc();
        expect(resultCalc2).toBe('11.7');
        await page.check('#integerSelect');
        expect(await page.isChecked('#integerSelect')).toBeTruthy();
        const resultCalcInteger2 = await resultsPage.getResultCalc();
        expect(resultCalcInteger2).toBe('11');
        await page.click('#clearButton');
        const resultCalcAfterClear2 = await resultsPage.getResultCalc();
        expect(resultCalcAfterClear2).toEqual('');
  });
  });

});

  
  

