import React from 'react';
import './App.css';
//import shuffle from 'lodash.shuffle';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHABET1 = 'ABCDEFGHIJKLM';
const ALPHABET2 = 'NOPQRSTUVWXYZ';
const MASQUE = '_';

class App extends React.Component { 
   
   state = { 
      phrase: this.generateWord(ALPHABET, 13),
      usedLetters: [], 
      endGame: false
   }

   generateWord(alphabet, count){
      const alpha = alphabet.split('');
      var n = 0; 
      var word = '';
      while (n < count) {
         let lettr = alpha[Math.floor(Math.random()*26)];
         word = word + '' + lettr;
         n++;
      }
      return word;
   }

   computeDisplay(phrase, usedLetters) {
      return phrase.replace(/\w/g,
        (letter) => (usedLetters.includes(letter) ? letter : MASQUE)
      );
   }

   generateTab(){
      // Permet de generer le jeu sous forme de tableau.
      return this.computeDisplay(this.state.phrase, this.state.usedLetters).split('');
   }

   getButtons(alpha){
      const displayBtn = alpha.split('');
      return displayBtn.map( (letter, index) => <td key={index}> <button onClick={() => this.handleClick(index, letter)} >{ letter }</button> </td> );
   }

   handleClick = (index, letter) => {
      const letterChoose = this.state.usedLetters; 
      const thePhrase = this.state.phrase;

      console.log(' Click ', letterChoose);

      if (thePhrase.includes(letter)) {
         letterChoose.push(letter);
         this.setState({ usedLetters: letterChoose });
      }

      if (this.generateTab().includes(MASQUE) === false) { 
         this.setState({ endGame: true});
         console.log('Jeu terminé !!!');
      }
   }

   restartGame = () => {
      const nouvPhrase = this.generateWord(ALPHABET, 13);
      this.setState({ 
         phrase: nouvPhrase,
         usedLetters: [],
         endGame: false
      });
   }

   componentWillMount(){
      console.log(this.state.phrase);
   }

   render(){ 
      const displayGame = this.generateTab().map((char, index) => <td key={index}> <span className="game"> &nbsp; {char} &nbsp; </span> </td> );
   
      return ( 
         <div className="App">
            { 
               this.state.endGame ? (
                  <button onClick={this.restartGame}>Recommencer la partie</button>
               ) : (
                  <table><tbody>
                     <tr>
                        { displayGame }
                     </tr>
                     <tr>
                        { this.getButtons(ALPHABET1) }
                     </tr>
                     <tr>
                        { this.getButtons(ALPHABET2) }
                     </tr>
                  </tbody></table>
               )
            }
         </div>
      );
   }
}

export default App;
