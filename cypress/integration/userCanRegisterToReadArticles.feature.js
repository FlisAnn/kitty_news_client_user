describe('user can register', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/articles',
      response: 'fixture:articles_data.json',
    })
  })

  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/auth',
        response: 'fixture:user_can_register.json',
      })
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/validate_token**',
        response: 'fixture:user_can_register.json',
      })
      cy.visit('/')
    })
    it('with valid credentials', () => {
      cy.get("[data-cy='signup-button']").click()
      cy.get("[data-cy='signup-form']").within(() => {
        cy.get("[data-cy='input-email']").type('registered@user.com')
        cy.get("[data-cy='input-password']").type('password')
        cy.get("[data-cy='input-password-confirmation']").type(
          'password'
        )
        cy.get("[data-cy='submit-btn']").click()
        cy.get("[data-cy='signup-button']").should('not.be.visible')
      })
    })
  })

  describe('unsuccessfully', () => {
    it('with invalid credentials', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/auth',
        status: '401',
        response: {
          errors: {
            full_messages: [
              'Invalid login credentials. Please try again.',
            ],
          },
          success: false,
        },
      })
      cy.visit('/')
      cy.get("[data-cy='signup-button']").click()
      cy.get("[data-cy='signup-form']").within(() => {
        cy.get("[data-cy='input-email']").type('registered@user.com')
        cy.get("[data-cy='input-password']").type('password')
        cy.get("[data-cy='input-password-confirmation']").type(
          'wrong_password'
        )
        cy.get("[data-cy='submit-btn']").click()
        cy.get("[data-cy='register-error-message']").should(
          'contain',
          'Invalid login credentials. Please try again.'
        )
      })
    })
    it('when email is already taken', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/auth',
        status: '401',
        response: {
          errors: {
            full_messages: ['Email has already been taken'],
          },
          success: false,
        },
      })
      cy.visit('/')
      cy.get("[data-cy='signup-button']").click()
      cy.get("[data-cy='signup-form']").within(() => {
        cy.get("[data-cy='input-email']").type('registered@user.com')
        cy.get("[data-cy='input-password']").type('password')
        cy.get("[data-cy='input-password-confirmation']").type(
          'password'
        )
        cy.get("[data-cy='submit-btn']").click()
        cy.get("[data-cy='register-error-message']").should(
          'contain',
          'Email has already been taken'
        )
      })
    })
  })
})
