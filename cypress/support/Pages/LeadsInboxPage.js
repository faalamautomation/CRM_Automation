let leadsInboxPage = 'a[aria-label="Leads"]'
let addLeadButton = '[data-testid="AddLeadButton"]'
let contactPerson = '[data-test-key="related_person_id"]>div>div>div[role="combobox"]'
let addNewContact = '.cui5-popover__inner .cui5-dropmenu'
let organizationName = '[data-test-key="related_org_id"]>div>div>div[role="combobox"]'
let title = '[data-test-key="title"]>div>div[class="cui5-input ff_editMode"]'
let leadValue = '[data-test-key="deal_value"]>div>div>div>div[class="cui5-input ff_v9140__InputSelectCompound__input__VK9"]'
let leadValueDropDown = 'div[data-test-key="deal_value"] div[role="combobox"]'
let leadCurrency = 'div[class="cui5-input cui5-input--icon cui5-select__filter"]'
let leadValueDropDownOptions = '.cui5-select__options'
let leadLabelsDropDown = '[data-test-key="labels"] div[class="react-tagsinput"]'
let hotLabel = 'div[role="option"]:nth-child(1)'
let labelField = '.ff_v9140__MultipleOptions__row__bBr span[role="button"]'
let visibilityModalDropDown = '[data-test="add-modals-visibility-field"] > button[class="cui5-button cui5-button--variant-secondary ff_v9140__VisibilitySwitch__select__VS-"]'
let visibilityOption = '.ff_v9140__VisibilityOptions__title__OQI'
let phoneField = '[data-test-key="phone"] div[class="cui5-input ff_v9140__InputSelectCompound__input__VK9"]'
let phoneDropDown = '[data-test-key="phone"] span[role="button"]'
let phoneType = 'div[value="other"]'
let emailField = '[data-test-key="email"] div[class="cui5-input ff_v9140__InputSelectCompound__input__VK9"]'
let emailDropDown = '[data-test-key="email"] span[role="button"]'
let emailType = 'div[value="other"]'
let saveButton = 'div[class="AddModal__footer--f5YoQ"] button[data-test="add-modals-save"]'
let messageBar = '.cui5-snackbar__actions>button>svg'
let leadToDealButton = '[data-testid="ConvertModalButton"]'
let pipeLineStage = '[data-testid="pipeline-stage-option-5"]'
let calendarField = 'input[placeholder="MM/DD/YYYY"]'
let addProducts = 'div[class="AddProducts__addProducts--Mejz_"]'
let product = 'input[data-test="product-input"]'
let productPrice = '[data-test="product-price"]'
let productQuantity = '[data-test="product-quantity"]'
let productTax = '[data-test="product-tax"]'
let addMoreProducts = '[data-test="products-add-more"]'
let totalAmount = '[data-test="total-amount"] .ProductsForm__totalValue--jkNc7'
let leadTitle = 'div[class="pd-table__sc-15bmpj5-0 hkuENc"]:nth-child(1)'

export class LeadsInboxPage {

   static getLeadsInboxPage() {
      cy.get(leadsInboxPage).click()
      cy.url().should('include', '/leads')
      cy.title().should('include', 'Leads')
   }

   static addNewLead() {
      cy.get(addLeadButton).click()
      cy.get('h3[title="Add lead"]').should('contain','Add lead')
   }

   static addPerson(personName) {
      cy.get(contactPerson).type(personName)
   }

   static addcompanyName(companyName) {
      cy.get(organizationName).type(companyName)
   }

   static addLeadTitle(titleName) {
      cy.get(title).clear().type(titleName)
   }

   static addLeadPrice(leadPrice) {
      cy.get(leadValue).type(leadPrice)
   }

   static leadCurrency(currencyType) {
      cy.get(leadValueDropDown).click().wait(3000)
      cy.get(leadCurrency).type(currencyType)
      cy.get(leadValueDropDownOptions).click()
   }

   static leadLabel() {
      cy.get(leadLabelsDropDown).click()
      cy.get(hotLabel).click()
      cy.get(labelField).click()
   }

   static visibility(visibilityChoice) {
      cy.get(visibilityModalDropDown).click()
      cy.get(visibilityOption).contains(visibilityChoice).click()
   }

   static companyPhone(phoneNumber) {
      cy.get(phoneField).type(phoneNumber)
   }

   static phoneType() {
      cy.get(phoneDropDown).click()
      cy.get(phoneType).click()
   }

   static companyEmail(companyEmail) {
      cy.get(emailField).type(companyEmail)
   }

   static emailType() {
      cy.get(emailDropDown).click()
      cy.get(emailType).click()
   }

   static saveButton() {
      cy.get(saveButton).click()
   }

   static chooseLead(leadName) {

      cy.get(leadTitle).contains(leadName).click()
   }

   static convertLeadToDeal() {
      cy.get(leadToDealButton).click()
      cy.get('h3[title="Convert to deal"]').should('contain','Convert to deal')
   }

   static closeMessageBar() {
      cy.get(messageBar).click()
   }

   static addProducts() {
      cy.get(addProducts).click()
   }

   static product(productName, productValue, productCount, taxPercent, index1) {

      cy.get(product).eq(index1).clear().type(productName)
      cy.get(productPrice).eq(index1).clear().type(productValue)
      cy.get(productQuantity).eq(index1).clear().type(productCount)
      cy.get(productTax).eq(index1).clear().type(taxPercent)

   }

   static addMoreProducts() {
      cy.get(addMoreProducts).click()
   }

   static pipeLineStage() {
      cy.get(pipeLineStage).click()
   }

   static DatePicker(dealDate) {
      cy.get(calendarField).type(dealDate)
   }

}