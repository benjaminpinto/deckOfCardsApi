export const url = {
  newDeck: '/deck/new',
  shuffleDeck(deckId) {
    return `/deck/${deckId}/shuffle`
  },
  drawDeck(deckId, count) {
    return `/deck/${deckId}/draw/?count=${count}`
  },
  pile(deckId, pile, cards) {
    return `/deck/${deckId}/pile/${pile}/add/?cards=${cards}`
  },
  listPileCards(deckId, pile) {
    return `/deck/${deckId}/pile/${pile}/list/`
  },
  shufflePile(deckId, pile) {
    return `/deck/${deckId}/pile/${pile}/shuffle/`
  },
  drawPile(deckId, pile, count) {
    return `/deck/${deckId}/pile/${pile}/draw/?count=${count}`
  },
}
