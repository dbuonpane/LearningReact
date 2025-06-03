# Interactive Tic-Tac-Toe Game 

Danielle Buonpane, AAS, BS (based on the tutorial provided by React development) 

Version: 1.0 (05/31/2025)

Description: in order to expand my cadre of software tool skills I completed the tutorial for development of a React application. In this case it is a tic-tac-toe game. The code was developed using React, HTML, CSS and JavaScript. The application supports the useState library of react. It allows end users to complete a tic-tac-toe game and along the way the system tracks the players history to allow them to jump back to previously plays to change the configuration. The game also allows the user to start the game over (can also be accomplished by refreshing the page). When a winner is identified then the player will be notified by notification above the game board. It also identifies the "next player" which would be the current user making their play. 

Future enhancement ideas: 
- instead of providing the ability for users to go back a certain move (via a button press) only identify which move their on and remove the ability for them to go back to the move via the button
- refactoring the board component to use loops to generate the squares instead of statically creating them (this will allow for a larger board (should one be beneficial)
- when the user wins highlight the squares to indicate the configuration that won the game
- if a user does not win (aka there is a draw) then provide a notice that the game was not won and that they should consider starting again
- display a move history list and identify the move placement within the history list in a (row, col) format
- update the UI so that it is more visually appealing to play 
