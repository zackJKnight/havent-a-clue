# Simpson Clue Solver

We play board games.

And by we... I mean my family. In my nuclear (new-clee-are) family... I have some stiff competition. My wife is... on the right side of the bell curve. So the kids... they are smarter than me. We play clue. I lose.

They can track all the cards with their MINDS!

I could lie and say that this app is a way for me to get better at React- you know, to support the mission-critical apps I'm building at work.

But you understand me. I feel like I can be real with you.

I'm building this to destroy their hopes of ever winning another game of Simpsons Clue!

Mwu ha ha ha! Mwu ha ha ha!

## Things I've Learned or relearned more better

### React Topics

- pass props in the URL with react router via the render prop and match props.
- OR pass the prop from parent to child
- to 'override a method' on a shared component that updates state on the parent, one option is to create the function in the parent component and pass it to the child.
- state... in react state is or should be immutable. Do not modify the value of a variable directly. Use the useState Hook instead.
- when using useState, trust in the object spread.. making a temp object and passing it in did not modify the object in the parent. I may revisit the 'why' but not until it stops me.
- a list item in a jsx/tsx needs a key (see the PickCards component). I've learned this a few times at work, but I see how breadth of responsibility leaves me with gaps in retention.
- When you need a Link to use a value that will change, you can instead create an onClick for the Button and handle nav in the function with useHistory.push.
