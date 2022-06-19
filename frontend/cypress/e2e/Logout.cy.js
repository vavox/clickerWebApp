/* eslint-disable no-undef */
// LogoutView.vue testing
/// <reference types="cypress" />


describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://192.168.1.135:8080/')
    cy.visit('http://192.168.1.135:8080/leaderboard')
    cy.visit('http://192.168.1.135:8080/aboutapp')
    cy.visit('http://192.168.1.135:8080/registration')
    cy.visit('http://192.168.1.135:8080/login')
  })
})


context('Window', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/logout')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Lab1 Vue Game')
  })
})



context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/logout')
  })

  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport
    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999)

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15')
    cy.wait(200)
    cy.viewport('macbook-13')
    cy.wait(200)
    cy.viewport('macbook-11')
    cy.wait(200)
    cy.viewport('ipad-2')
    cy.wait(200)
    cy.viewport('ipad-mini')
    cy.wait(200)
    cy.viewport('iphone-6+')
    cy.wait(200)
    cy.viewport('iphone-6')
    cy.wait(200)
    cy.viewport('iphone-5')
    cy.wait(200)
    cy.viewport('iphone-4')
    cy.wait(200)
    cy.viewport('iphone-3')
    cy.wait(200)

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'
    cy.viewport('ipad-2', 'portrait')
    cy.wait(200)
    cy.viewport('iphone-4', 'landscape')
    cy.wait(200)

    // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.config.{js|ts})
  })
})


context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/logout')
  })

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })

  it('cy.visit() - visit a remote url', () => {
    // https://on.cypress.io/visit

    // Visit any sub-domain of your current domain

    // Pass options to the visit
    cy.visit('http://192.168.1.135:8080/aboutapp', {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad (contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
      onLoad (contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
    })
    })
})



context('Location', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/logout')
  })

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('http://192.168.1.135:8080/logout')
      expect(location.host).to.eq('192.168.1.135:8080')
      expect(location.hostname).to.eq('192.168.1.135')
      expect(location.origin).to.eq('http://192.168.1.135:8080')
      expect(location.pathname).to.eq('/logout')
      expect(location.port).to.eq('8080')
      expect(location.protocol).to.eq('http:')
      expect(location.search).to.be.empty
    })
  })

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'http://192.168.1.135:8080/logout')
  })
})
