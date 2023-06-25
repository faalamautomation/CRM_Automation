# CRM_Automation_Task
UI Automation Test Framework



This repository contains Functional UI Automation Tests of the Web based CRM system. The tests are based on cypress framework using javascript. 
Below are the steps given on how to execute the tests on your system and in a docker container separately. The test framework is designed by following page
object model design pattern.


Instructions for running tests locally on your system:
======================================================

(1) First you need to open the VS CODE editor on your system and then open the terminal window and run the following command 
   git clone "https://github.com/faalamautomation/CRM_Automation.git" to clone the repository on your local system.

(2) Once you setup the directory there, then you need to run the following command "npm install" to install the dependencies of the project.

(3) Once the dependencies are installed successfully then you have to run the following command "npx cypress open" to launch the cypress client.

(4) After the cypress client is launched then you have to choose the browser and need to click on the spec file named as "CRMTests.cy.js" and it will start executing the tests 
    in your selected browser.

(5) If you wish to run tests in another browser then just add the --browser parameter and name of the browser with the command mentioned in step 3. Such as
    "npx cypress open --browser firefox" or if you wish to run the tests in headless mode then simply run the following command to "npx cypress run". Please 
	remember the default browser for executing the tests is electron. 
	
(6) To run the tests and generate the report you have to execute the following command "npx cypress run --reporter mochawesome --spec cypress/e2e/CRMTests.cy.js".

(7) The mochawesome report will be generated in the results directory at this path CRM_Task/cypress/results/ .

(8) The report can be viewed in the browser by opening the mochawesome.html file in the browser by copying its path.


Instructions for running tests in a docker container:
============================================================================

(1) you must have docker installed in your system to run the tests in a docker container.

(2) Once you are sure that you have docker installed on your system then you need to build an image from the Dockerfile presented in the root folder of the project.

(3) Please use the following command to build the docker image from the Dockerfile "docker build -t cypress-e2e-pdt:12.13.0 ." remember that dot is a part of the build command.

(4) Once the build command is executed then it will start creating the docker image from the instructions defined in the Dockerfile.

(5) Once the image is successfully created then you have to execute the following command "docker run -it -v "$(pwd)/cypress/results:/PD-e2e-tests/cypress/results" cypress-e2e-pdt:12.13.0 npx cypress run --browser chrome" 
    to run your tests in the docker container.
	
(6) The command will mount the results from docker container folder at this path "/PD-e2e-tests/cypress/results" to your local folder at this path "/cypress/results". The generated 
    mochawesome report can be viewed in browser by copying the path of mochawesome.html file by right clicking on it and then pasting it in any browser.
	
(7) The github flow file named as "main.yml" is also presented in the  root directory of the project under .github\workflows and the steps to run the tests in github actions are written in Yaml 
    for automating the CI/CD pipeline of the tests.
	
(8) All tests pass locally but some of them failing in github actions CI/CD pipeline due to invisibility of locators.


Thank you for patience and your precious time ! 

Hope you find it working :) 

If you face any difficulties please feel free to contact me. 


Wish you a great time !
Enjoy....



![tests](https://github.com/falamgirgeek/Pipedrive_Automation_Task/assets/124049457/6486ceda-1c76-4232-a8dc-43bc48daec1a)





