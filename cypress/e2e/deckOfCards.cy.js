import { deckController } from '../support/controllers/deckController'

describe('Deck of Cards - Suite #001', () => {
  let deckObject = {
    deck_id: '',
    remaining: 0,
    shuffled: false,
  }

  it('Creating a deck', () => {
    deckController.newDeck().then((createResponse) => {
      expect(createResponse.status).to.eq(200)
      expect(createResponse.body).to.have.property('success', true)
      expect(createResponse.body).to.have.property('deck_id')

      deckObject.deck_id = createResponse.body.deck_id
      deckObject.remaining = createResponse.body.remaining
      deckObject.shuffled = createResponse.body.shuffled
    })
  })

  it('Shuffling a deck', () => {
    deckController.shuffleDeck(deckObject.deck_id).then((shuffleResponse) => {
      expect(shuffleResponse.status).to.eq(200)
      expect(shuffleResponse.body).to.have.property('success', true)
      expect(shuffleResponse.body.deck_id).to.eq(deckObject.deck_id)
      expect(shuffleResponse.body).to.have.property('shuffled', true)

      deckObject.shuffled = shuffleResponse.body.shuffled
    })
  })

  const cardsToDraw = 3
  it(`Drawing ${cardsToDraw} cards`, () => {
    deckController
      .drawDeck(deckObject.deck_id, cardsToDraw)
      .then((drawResponse) => {
        expect(drawResponse.status).to.eq(200)
        expect(drawResponse.body).to.have.property('success', true)
        expect(drawResponse.body.deck_id).to.eq(deckObject.deck_id)
        expect(drawResponse.body.remaining).to.eq(
          deckObject.remaining - cardsToDraw
        )

        deckObject.remaining = drawResponse.body.remaining
      })
  })

  const pilesList = ['PileAlpha', 'PileBeta']
  const cardsToPile = 5
  it(`Drawing ${cardsToPile} cards to pile`, () => {
    pilesList.forEach((pile) => {
      console.log(`Piling ${cardsToPile} cards to ${pile}`)
      deckController
        .drawDeck(deckObject.deck_id, cardsToPile)
        .then((drawResponse) => {
          expect(drawResponse.status).to.eq(200)
          expect(drawResponse.body.deck_id).to.eq(deckObject.deck_id)

          deckController
            .pileCards(deckObject.deck_id, pile, drawResponse.body.cards)
            .then((pileResponse) => {
              expect(pileResponse.status).to.eq(200)
              expect(pileResponse.body).to.have.property('success', true)
              expect(pileResponse.body.deck_id).to.eq(deckObject.deck_id)
              expect(pileResponse.body.remaining).to.eq(deckObject.remaining)
            })
          expect(drawResponse.body.remaining).to.eq(
            deckObject.remaining - cardsToPile
          )
          deckObject.remaining = drawResponse.body.remaining
        })
    })
  })

  it('List cards in piles', () => {
    pilesList.forEach((pile) => {
      console.log(`Listing cards in ${pile}`)
      deckController
        .listPileCards(deckObject.deck_id, pile)
        .then((listResponse) => {
          expect(listResponse.status).to.eq(200)
          expect(listResponse.body).to.have.property('success', true)
          expect(listResponse.body.deck_id).to.eq(deckObject.deck_id)
          expect(listResponse.body.piles[pile].cards.length).to.eq(cardsToPile)
        })
    })
  })

  it('Shuffling a pile', () => {
    const pileToShuffle = pilesList[0]
    let cardsBeforeShuffle

    // Check cards before shuffle
    deckController
      .listPileCards(deckObject.deck_id, pileToShuffle)
      .then((listResponse) => {
        cardsBeforeShuffle = listResponse.body.piles[pileToShuffle].cards
      })

    // Shuffle pile
    deckController
      .shufflePile(deckObject.deck_id, pileToShuffle)
      .then((shuffleResponse) => {
        expect(shuffleResponse.status).to.eq(200)
        expect(shuffleResponse.body).to.have.property('success', true)
        expect(shuffleResponse.body.deck_id).to.eq(deckObject.deck_id)
      })

    // Check cards after shuffle
    deckController
      .listPileCards(deckObject.deck_id, pileToShuffle)
      .then((listResponse) => {
        expect(listResponse.body.piles[pileToShuffle].cards).to.not.eq(
          cardsBeforeShuffle
        )
      })
  })

  it('Drawing cards from piles', () => {
    const removeFromAlpha = 2
    const removeFromBeta = 3

    deckController
      .drawPile(deckObject.deck_id, pilesList[0], removeFromAlpha)
      .then((drawResponse) => {
        expect(drawResponse.status).to.eq(200)
        expect(drawResponse.body.piles[pilesList[0]].remaining).to.eq(
          cardsToPile - removeFromAlpha
        )
      })
    deckController
      .drawPile(deckObject.deck_id, pilesList[1], removeFromBeta)
      .then((drawResponse) => {
        expect(drawResponse.status).to.eq(200)
        expect(drawResponse.body.piles[pilesList[1]].remaining).to.eq(
          cardsToPile - removeFromBeta
        )
      })
  })
})
