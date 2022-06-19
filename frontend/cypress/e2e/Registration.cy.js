/* eslint-disable no-undef */
// RegistrationView.vue testing
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

describe('Text', () => {
  it('Visits the app root url', () => {
    cy.visit('http://192.168.1.135:8080/registration')
    cy.contains('h1', 'Registration')
  })
})

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
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

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.register-email')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com')

    cy.get('.register-username')
      .type('fakeusername').should('have.value', 'fakeusername')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slowtypingusername', { delay: 100 })
      .should('have.value', 'slowtypingusername')  

    cy.get('.register-password')
      .type('fakepassword').should('have.value', 'fakepassword')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slowtypingpassword', { delay: 100 })
      .should('have.value', 'slowtypingpassword')

    cy.get('.register-fullname')
      .type('fakefullname').should('have.value', 'fakefullname')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slowtypingfullname', { delay: 100 })
      .should('have.value', 'slowtypingfullname') 


    cy.get('.register-birthdate')
      .type('1992-12-12').should('have.value', '1992-12-12')


      // Delay each keypress by 0.1 sec
      .type('1992-12-12', { delay: 100 })
      .should('have.value', '1992-12-12') 

  })

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.register-select')
      .should('have.value', '')

    // Select option(s) with matching text content
    cy.get('.register-select').select('Male')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.register-select').should('have.value', 'M')

    // Select option(s) with matching value
    cy.get('.register-select').select('M')
      // can attach an assertion right away to the element
      .should('have.value', 'M')

  })

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.register-form')
      .find('[type="email"]').type('user@mail.com')

    cy.get('.register-form')
      .find('[type="username"]').type('username')
      
    cy.get('.register-form')
      .find('[type="password"]').type('userpassword')
    
    cy.get('.register-form')
      .find('[type="fullname"]').type('fullname')

    cy.get('.register-form')
      .find('[type="date"]').type('2011-04-15')

      cy.get('.register-form .register-select')
      .select('M')
    
    cy.get('.register-form').submit()
    
  })

    
  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.register-btn').click()
  })

})

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
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

context('Utilities', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
  })

  it('Cypress._ - call a lodash method', () => {
    // https://on.cypress.io/_
    cy.request('https://jsonplaceholder.cypress.io/users')
      .then((response) => {
        let ids = Cypress._.chain(response.body).map('id').take(3).value()

        expect(ids).to.deep.eq([1, 2, 3])
      })
  })

  it('Cypress.Promise - instantiate a bluebird promise', () => {
    // https://on.cypress.io/promise
    let waited = false

    /**
     * @return Bluebird<string>
     */
    function waitOneSecond () {
      // return a promise that resolves after 1 second
      return new Cypress.Promise((resolve, reject) => {
        setTimeout(() => {
          // set waited to true
          waited = true

          // resolve with 'foo' string
          resolve('foo')
        }, 1000)
      })
    }

    cy.then(() => {
      // return a promise to cy.then() that
      // is awaited until it resolves
      return waitOneSecond().then((str) => {
        expect(str).to.eq('foo')
        expect(waited).to.be.true
      })
    })
  })
})

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
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

context('Spies, Stubs, and Clock', () => {
  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    cy.visit('http://192.168.1.135:8080/registration')

    const obj = {
      foo () {},
    }

    const spy = cy.spy(obj, 'foo').as('anyArgs')

    obj.foo()

    expect(spy).to.be.called
  })

  it('cy.spy() retries until assertions pass', () => {
    cy.visit('http://192.168.1.135:8080/registration')

    const obj = {
      /**
       * Prints the argument passed
       * @param x {any}
      */
      foo (x) {
        console.log('obj.foo called with', x)
      },
    }

    cy.spy(obj, 'foo').as('foo')

    setTimeout(() => {
      obj.foo('first')
    }, 500)

    setTimeout(() => {
      obj.foo('second')
    }, 2500)

    cy.get('@foo').should('have.been.calledTwice')
  })

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    cy.visit('http://192.168.1.135:8080/registration')

    const obj = {
      /**
       * prints both arguments to the console
       * @param a {string}
       * @param b {string}
      */
      foo (a, b) {
        console.log('a', a, 'b', b)
      },
    }

    const stub = cy.stub(obj, 'foo').as('foo')

    obj.foo('foo', 'bar')

    expect(stub).to.be.called
  })

})

context('Location', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.135:8080/registration')
  })

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('http://192.168.1.135:8080/registration')
      expect(location.host).to.eq('192.168.1.135:8080')
      expect(location.hostname).to.eq('192.168.1.135')
      expect(location.origin).to.eq('http://192.168.1.135:8080')
      expect(location.pathname).to.eq('/registration')
      expect(location.port).to.eq('8080')
      expect(location.protocol).to.eq('http:')
      expect(location.search).to.be.empty
    })
  })

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'http://192.168.1.135:8080/registration')
  })
})
