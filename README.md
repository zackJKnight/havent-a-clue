# Clue Notepad

Track progress of the Clue board game.

Modeling the domain with goals:

1. improve react skills
2. explore machine learning
3. beat my children when we play Clue

## React Topics

- pass props in the URL with react router via the render prop and match props.
- OR pass the prop from parent to child
- to 'override a method' on a shared component that updates state on the parent, one option is to create the function in the parent component and pass it to the child.
  - When the onChange of an element effects the style of that element, how to let the parent set the style? One way is to pass the className as a prop.
- state... in react state is or should be immutable. Do not modify the value of a variable directly. Use the useState Hook instead.
- when using useState, trust in the object spread.. making a temp object and passing it in did not modify the object in the parent.
- a list item in a jsx/tsx needs a key (see the PickCards component). But don't use the array index.
- When you need a Link to use a value that will change, you can instead create an onClick for the Button and handle nav in the function with useHistory.push.
- Using back and forward browser buttons doesn't show snapshots of the game state. It shows the current game state. Might disable browser nav or implement game state snapshots.
- leaning toward putting the game win checks as functions on the Game, but need to learn how best
- to do that in a React way... is it by making a useEffect hook to set the cards? Or does that 
- bypass and negate immutable state... is it an anitpattern?