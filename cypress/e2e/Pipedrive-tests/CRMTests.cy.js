/// <reference types="cypress" />

import { LoginPage } from '../../support/Pages/LoginPage'

import { LeadsInboxPage } from '../../support/Pages/LeadsInboxPage'

import { DealsPage } from '../../support/Pages/DealsPage'

import { Short_Wait_Time, Medium_Wait_Time, Long_Wait_Time } from '../../support/Constants'

const userdata = require('../../fixtures/customers.json')


let productsData

describe('End to End CRM Tests', () => {

  beforeEach(() => {

    cy.visit(Cypress.env('url') + "/en/register")
    cy.url().should('include', '/en/register')

    cy.fixture('products.json').then(function (productdata) {

      productsData = productdata

    })

    cy.wait(Short_Wait_Time)
    LoginPage.getAcceptCookies() //cookie accept
    LoginPage.getLoginLink()     //login link

    LoginPage.getTypeEmail(Cypress.env('email'))
    LoginPage.getPassField(Cypress.env('password'))
    LoginPage.getLogin()

    cy.wait(Long_Wait_Time)
  })

// Creating multiple leads using data driven test approach, the test will fail if the similar record is tried to enter into the system due to phone or email window popup
//  Data is driven from the customers.json
 userdata.forEach((data) => {

    it('Test-1 : Creating new multiple leads', () => {

      LeadsInboxPage.getLeadsInboxPage()
      cy.wait(Medium_Wait_Time)
      LeadsInboxPage.addNewLead()
      cy.wait(Long_Wait_Time )

     

      LeadsInboxPage.addPerson(data.personName)        //person
      LeadsInboxPage.addcompanyName(data.companyName)  // organization
      LeadsInboxPage.addLeadTitle(data.titleName)    //title

      cy.wait(Short_Wait_Time)

      LeadsInboxPage.addLeadPrice(data.leadPrice)     //leadprice
      LeadsInboxPage.leadCurrency(data.currencyType)  //leadcurrency
      LeadsInboxPage.leadLabel()
     
      LeadsInboxPage.visibility(data.visibilityChoice) //leadvisibility
      LeadsInboxPage.companyPhone(data.phoneNumber)   //leadphone

      cy.wait(Short_Wait_Time)

      LeadsInboxPage.phoneType()  //phone type

      cy.wait(Short_Wait_Time)

      LeadsInboxPage.companyEmail(data.companyEmail) //lead email

      LeadsInboxPage.emailType() //email type
      LeadsInboxPage.saveButton()  //save button

      cy.wait(Medium_Wait_Time)


      LeadsInboxPage.chooseLead(data.titleName)  //select lead to convert into a deal

      LeadsInboxPage.closeMessageBar() //close message bar
      LeadsInboxPage.convertLeadToDeal() //convert lead to deal button

      cy.wait(Long_Wait_Time )

     

      LeadsInboxPage.addProducts()  //add products

      cy.wait(Short_Wait_Time)

      LeadsInboxPage.pipeLineStage()   //pipeline stage

      LeadsInboxPage.DatePicker(data.dealDate) //deal date

      cy.wait(Short_Wait_Time)

      LeadsInboxPage.visibility(data.dealVisibilityChoice) //deal visibility
      cy.wait(Short_Wait_Time)


      LeadsInboxPage.product(data.productName1, data.productValue1, data.productCount1, data.taxPercent1, data.index1) // product 1

      LeadsInboxPage.addMoreProducts()  //add products

      LeadsInboxPage.product(data.productName2, data.productValue2, data.productCount2, data.taxPercent2, data.index2) // product 2

      LeadsInboxPage.saveButton() //save button
      cy.wait(Long_Wait_Time )


      LeadsInboxPage.closeMessageBar()

      DealsPage.dealsPage() //deals page
      cy.wait(Medium_Wait_Time)

      DealsPage.dealsListView() //deals listview

      cy.wait(Short_Wait_Time)

      //DealsPage.deleteDeal(data.dealNameToDelete)   //delete deal

      LoginPage.getLogout()

    })
  })


  it('Test-2 : Verify the total sum of all deals on deals Page', () => {

    DealsPage.dealsPage()

    let sum = 0

    cy.get('tr > td[class="gridRow__cell gridRow__cell--monetary"]:visible').each(($el, index, $list) => {

      const priceValueText = $el.text()                                     //get each deal value as text from the deals page

      const priceNumeric = priceValueText.replace(/,|€|\$|' '/g, '')         //get numeric value from each deal value

      console.log(priceNumeric)

      sum = Number(sum) + Number(priceNumeric)                               //sum of total deals on deals page 

    }).then(function () {
      cy.log(Number(sum))                                                     //making sum variable accessible to other code block
    })

    cy.get('div[class="actionsAndFiltersContainer"] span[class="text"]>span:nth-child(1)').then(($allDealsSum) => {
      const allDealsText = $allDealsSum.text()                                       // get total sum of all deals from deals page
      const allDealsNumeric = allDealsText.replace(/,|€|\$|' '/g, '')                  //get numeric value from total sum of all deals
      expect(Number(allDealsNumeric)).to.equal(sum)                                  //asserting total sum of all deals

    })
  })


  it('Test-3: Verifying positive total sum of products according to their quantities', () => {


    let Sum = (productsData.productValue1 * productsData.productCount1) + (productsData.productValue2 * productsData.productCount2) //calculate sum amount of products according to quantities


    DealsPage.addDeal()

    cy.wait(Short_Wait_Time)

    

    DealsPage.addProducts()

    cy.wait(Short_Wait_Time)

    LeadsInboxPage.product(productsData.productName1, productsData.productValue1, productsData.productCount1, productsData.taxPercent1, productsData.index1) //data is driven from products.json


    LeadsInboxPage.addMoreProducts()   //add more products on Leads Modal

    LeadsInboxPage.product(productsData.productName2, productsData.productValue2, productsData.productCount2, productsData.taxPercent2, productsData.index2) //data is driven from products.json

    cy.log(Sum)

    cy.get('[data-test="total-amount"] .ProductsForm__totalValue--jkNc7').invoke('text').as('getTotalSum').then(($text) => {

      let TotalSumClean = ($text).replace(/,|€|\$|' '/g, '')             //get sum of products according to quantities from Leads Modal as text and extracting the numeric value
      let TotalSumNumeric = Number(TotalSumClean)                        //convert sum of products according to quantities to number value
      expect(TotalSumNumeric).to.equal(Sum)                              //sum assertion

      LeadsInboxPage.saveButton()  //save a deal

    })
  })

  it('Test-4: Verifying Negative total sum of products according to their quantities', () => {


    let Sum = (productsData.productValue3 * productsData.productCount3) + (productsData.productValue4 * productsData.productCount4)


    DealsPage.addDeal()

    cy.wait(Short_Wait_Time)

    DealsPage.addProducts()

    cy.wait(Short_Wait_Time)

    LeadsInboxPage.product(productsData.productName3, productsData.productValue3, productsData.productCount3, productsData.taxPercent3, productsData.index1)


    LeadsInboxPage.addMoreProducts()

    LeadsInboxPage.product(productsData.productName4, productsData.productValue4, productsData.productCount4, productsData.taxPercent4, productsData.index2)

    cy.log(Sum)

    cy.get('[data-test="total-amount"] .ProductsForm__totalValue--jkNc7').invoke('text').as('getTotalSum').then(($text) => {

      let TotalSumClean = ($text).replace(/,|€|\$|' '/g, '')
      let TotalSumNumeric = Number(TotalSumClean)
      expect(TotalSumNumeric).to.equal(Sum)

      LeadsInboxPage.saveButton()  //save a deal

    })
  })


  it('Test-5: Delete a Deal from the Deals Page', () => {
    DealsPage.dealsListView()                 //deals listview

    DealsPage.deleteDeal('Compansy Kov')    //Pass existing deal title to delete the deal otherwise this test would fail

    LoginPage.getLogout()                    //logout from the system

  })

})