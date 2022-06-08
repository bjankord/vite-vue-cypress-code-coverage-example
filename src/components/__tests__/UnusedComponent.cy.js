import UnusedComponent from '../UnusedComponent.vue'

describe('UnusedComponent', () => {
  it('playground', () => {
    cy.mount(UnusedComponent, { props: { msg: 'Unused component' } })
  })

  it('renders properly', () => {
    cy.mount(UnusedComponent, { props: { msg: 'Unused component' } })
    cy.get('h1').should('contain', 'Unused component')
  })
})
