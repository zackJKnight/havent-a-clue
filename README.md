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
  - to learn: when the onChange of an element effects the style of that element, how to we let the parent set the style? first guess is to look at syled components.
- state... in react state is or should be immutable. Do not modify the value of a variable directly. Use the useState Hook instead.
- when using useState, trust in the object spread.. making a temp object and passing it in did not modify the object in the parent. I may revisit the 'why' but not until it stops me.
- a list item in a jsx/tsx needs a key (see the PickCards component). I've learned this a few times at work.
- When you need a Link to use a value that will change, you can instead create an onClick for the Button and handle nav in the function with useHistory.push.
- Using back and forward browser buttons doesn't show snapshots of the game state. It shows the current game state. Might disable browser nav or implement game state snapshots.
  