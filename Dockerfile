FROM cypress/included:12.13.0
RUN mkdir /PD-e2e-tests
WORKDIR /PD-e2e-tests
COPY ./cypress ./cypress
COPY ./package.json ./package.json
COPY ./cypress.config.js ./cypress.config.js
RUN npm install
COPY . .
VOLUME /PD-e2e-tests