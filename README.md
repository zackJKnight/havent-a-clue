# Clue Notepad

Track progress of the Clue board game.

Modeling the domain with goals:

1. improve react skills
2. explore machine learning??
3. beat my children when we play Clue

## React Topics

- pass props in the URL with react router via the render prop and match props.
- OR pass the prop from parent to child
- to 'override a method' on a shared component that updates state on the parent, one option is to create the function in the parent component and pass it to the child.
  - When the onChange of an element effects the style of that element, how to let the parent set the style? One way is to pass the className as a prop.
- state... in react state is or should be immutable. Do not modify the value of a variable directly. Use the useState Hook instead.
- when using useState, trust in the object spread... making a temp object and passing it in did not modify the object in the parent.
- a list item in a jsx/tsx needs a key (see the PickCards component). But don't use the array index.
- When you need a Link to use a value that will change, you can instead create an onClick for the Button and handle nav in the function with useHistory.push.
- Using back and forward browser buttons doesn't show snapshots of the game state. It shows the current game state. Might disable browser nav or implement game state snapshots.
- leaning toward putting the game win checks as functions on the Game, but need to learn how best
- to do that in a React way... is it by making a useEffect hook to set the cards? Or does that 
- bypass and negate immutable state... is it an anitpattern?

## Bugs

- play until you know someone holds all but one of a category. The remaining card's background color does not change to indicate the card is a solution.
- change "you win" to `$playerName wins!`
- Sets known when none shown but suggestor holds at least one card of the suggestion. Might only happen with locaitons..
- radios are too small; create custom component to touch select the whole card
- show 1 card; all were marked possibly shown by.

## Potential Features

- a location suggestion UI; Maybe just order the locations, or add a badge with a rank or priority.
- table talk UI; if clues are given away verbally, indicate shown card on previous turn.
- a hide button that flips cards so I set the phone down without revealing my clues.
- allow player to accuse after suggesting
- and condition elimination: if you have a known card and someone else shows another player one of two unkowns, send this to the eliminate api (passing two unknown items). you can eliminate all three card sets that have the two unknowns.
- add indication of player owned card with color
- consider back button on shown by for mistakes
- hide 'none' if you have a card to show

## Tests

- Be player 1. for first turn suggestion, suggest a suspect not held by you, a weapon held by you, and a location not held by you. indicate that player two showed you the suspect. Expect: the suspect is marked as 'known to be held by' (curently by setting background to gray)
- Be player 1 with 3 players. for player 3 suggestion: suggest a suspect you hold. a location and a weapon you dont hold. it asks if player 1 showed player 3 the suggested cards you hold. Should not say 'A Card'
- Be player 1 with 3 players. On player 3's turn, suggest cards that player one does not hold. When asked which card Player 1 showed to player 3, the only radio is None. Click OK to select None. Expected: player 2 can show 'A Card' or 'None' to player 3.

## eliminating possibilities


  