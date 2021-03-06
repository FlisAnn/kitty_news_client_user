describe('A user can successfully,', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/articles',
      response: 'fixture:articles_data.json',
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/categories/2',
      response: 'fixture:categories_data.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/sign_in',
      response: 'fixture:user_can_login.json',
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/auth/validate_token**',
      response: 'fixture:user_can_login.json',
    })
    cy.visit('/')
    cy.get("[data-cy='log-in-button']").click()
    cy.get("[data-cy='log-in-form']").within(() => {
      cy.get("[data-cy='log-in-email']").type('registered@user.com')
      cy.get("[data-cy='log-in-password']").type('password')
      cy.get("[data-cy='log-in-submit-btn']").click()
    })
    cy.get("[data-cy='category-sports']").click()
  })

  it('see a list of articles in a specific category,', () => {
    cy.get("[data-cy='article-index']").within(() => {
      cy.contains(
        'Mio one match away from ending Tottenham’s 13-year catnip trophy drought'
      )
      cy.contains(
        'I have a lot of regrets. Tennis champion Stina opens up about her crippling shyness '
      )
      cy.contains(
        'How Aby’s speedy approach could help golf’s pace of play'
      )
    })
  })
  it('click on a specific article,', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/articles/3',
      response: 'fixture:single_article_sports.json',
    })
    cy.get("[data-cy='article-3']").click()
    cy.get("[data-cy='article-display']").within(() => {
      cy.get("[data-cy='title']").should(
        'contain',
        'Mio one match away from ending Tottenham’s 13-year catnip trophy drought'
      )
      cy.get("[data-cy='lead']").should(
        'contain',
        "Have you noticed how smelly dogs are? Well that...Pipans peers disappmeowing over the top of her whiskers, glaring at the television in her swanky new pillow-fort.'But I’m more purrprised by Pipan coming in' says one of the TV present ers.'"
      )
      cy.get("[data-cy='body']").should(
        'contain',
        "Is that really the football that Tottenham want to play? I’m telling you, Pipan is past her best'."
      )
    })
  })
  it('and get back to the index page', () => {
    cy.get("[data-cy='header-news']").click()
    cy.get("[data-cy='article-index']").within(() => {
      cy.contains('Cats are better than dogs!')
      cy.contains(
        'Have you noticed how smelly dogs are? Well that...'
      )
      cy.contains('Emma should get a cat instead!')
    })
  })
})
