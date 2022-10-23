import { url } from '../endpoints'

export const deckController = {
  newDeck: () => cy.request('GET', url.newDeck),

  shuffleDeck: (deckId) => cy.request('GET', url.shuffleDeck(deckId)),

  drawDeck: (deckId, count) => cy.request('GET', url.drawDeck(deckId, count)),

  drawPile: (deckId, pile, count) =>
    cy.request('GET', url.drawPile(deckId, pile, count)),

  extractCardList: (cards) => {
    const cardList = []
    cards.forEach((card) => {
      cardList.push(card.code)
    })
    const cardListString = cardList.join(',')
    return cardListString
  },

  pileCards: (deckId, pile, cards) => {
    const cardList = deckController.extractCardList(cards)
    return cy.request('GET', url.pile(deckId, pile, cardList))
  },

  listPileCards: (deckId, pile) => {
    return cy.request('GET', url.listPileCards(deckId, pile))
  },

  shufflePile: (deckId, pile) => {
    return cy.request('GET', url.shufflePile(deckId, pile))
  },
}
