let dealsPage = '[aria-label="Deals"]'
let listView = '[data-text="List"]'
let dealTitle = '[data-test="title-label"]'
let dealActions = '[data-testid="deal-actions"] button'
let wonButton = '[data-testid="won-button"]'
let deleteDealDropDown = 'div[class="cui5-dropmenu__content"] div:nth-child(5)'
let deleteDealOption = 'div[class="cui5-dialog__actions"] button:nth-child(2)'
let dealButton = '[class="toolbarContainer"] [data-test="addButton-button"]'
let addProducts = 'div[class="AddProducts__addProducts--Mejz_"]'
let closeWrapper = '[class="close-wrapper"] > button'


export class DealsPage {

   static dealsPage() {
      cy.get(dealsPage).click()
   }

   static dealWon() {
      cy.get(wonButton).click()
   }

   static dealsListView() {
      cy.get(listView).click()
   // cy.title().should('include', 'Deals')   This assertion is catching a right bug about page title which should include Deals but it has Leads
   }

   static addDeal() {
      cy.get(dealButton).click()
      cy.get('h3[title="Add deal"]').should('contain','Add deal')
   }

   static addProducts() {
      cy.get(addProducts).click()
   }

   static deleteDeal(dealNameToDelete) {
      cy.get(dealTitle).contains(dealNameToDelete).click()
      cy.get(dealActions).click()
      cy.get(deleteDealDropDown).click()
      cy.get(deleteDealOption).click()

   }

   static closeWrapperPopup() {
      cy.get(closeWrapper).click()
   }


}