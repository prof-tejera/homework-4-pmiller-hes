import { useState } from "react";
import "./calculator.css";
import Number from "./Number";
import Operation from "./Operation";
import Screen from "./Screen";


const Calculator = () => {

   /** TODO: Here is where you are going to keep track of calculator state */
  const [orderOperation, setOrderOperation] = useState(['']);
  const [screenState, setScreenState] = useState('');


  /** TODO: what happens when I click a number? */
  const handleNumberClick = e => {
    // Update the Screen.
    setScreenState(prev => prev + e.target.value);

    //Update the Order or Operations with the new number value.
    // Find the last element in the array and append the number.
    // Note, the HandleOperationClick will advance the array which will add a new element to build a new number.
    setOrderOperation(prev => {
      let updated = [...prev];
      updated[updated.length - 1] += e.target.value;
      return updated;
    });
  };

  
  /** TODO: what happens when I click an operation? */
  const handleOperationClick = e => {
    // Update the screen to show the operation character.
    setScreenState(prev => prev + e.target.value);

    // When the operation is =
    if (e.target.value === "=") {
      let value = 0;
      let operator = '+';

      // Loop through the order of operations
      for (let i = 0; i < orderOperation.length; i++) {
        let item = orderOperation[i];

        // Check if the item is a number
        if (!isNaN(item)) {
          // ensure that a decimal number can be used.
          let numItem = parseFloat(item);
          let numValue = parseFloat(value);

          // When the item from the orderOperations array is a number, then use the stored operator to perform a calculation
          // Note, at this point the last entered value is a = key  
          switch (operator) {
            case '+':
              // Addition
              value = numValue + numItem;
              break;
            case '-':
              // Subtraction
              value = numValue - numItem;
              break;
            case '/':
              // Divisition
              // Check for divide by 0 error.
              if (numItem === 0) {               
                setScreenState("Division by zero is not allowed");            
                return;
              }
              value = numValue / numItem;
              break;
            case 'x':
              // Multiplication
              value = numValue * numItem;
              break;
            default:
          }
        } 
        else {
          // Not a number, then must be an operator. Set the local variable to the operator.
          operator = item;
        }
      }

      // Update state
      setScreenState(value.toString());
      setOrderOperation([value.toString()]);
    } 
    // Clear button clicked, clear the state.
    else if (e.target.value === "clear") {
      setOrderOperation(['']);
      setScreenState('');
    } 
    // Any other button pressed other than = or Clear. 
    // Update the screen to show the last key entered.
    else {
      setOrderOperation(prev => [...prev, e.target.value, '']);
    }
  };

  return (
    <div className="frame">
      <Screen value={screenState} />
      <div style={{ display: "flex" }}>
        <div>
          <div>
          <Operation value="clear" className="clear" onClick={handleOperationClick} />
          </div>
          <div>            
            <Number value={7} onClick={handleNumberClick} />
            <Number value={8} onClick={handleNumberClick} />
            <Number value={9} onClick={handleNumberClick} />
          </div>
          <div>
            <Number value={4} onClick={handleNumberClick} />
            <Number value={5} onClick={handleNumberClick} />
            <Number value={6} onClick={handleNumberClick} />
          </div>
          <div>
            <Number value={1} onClick={handleNumberClick} />
            <Number value={2} onClick={handleNumberClick} />
            <Number value={3} onClick={handleNumberClick} />
          </div>
          <div>
            <Number value={0} onClick={handleNumberClick} />
          </div> 
        </div>
        <div style={{ paddingLeft: 10 }}>
          <div><Operation value="+" onClick={handleOperationClick} /></div>
          <div> <Operation value="/" onClick={handleOperationClick} /></div>
          <div><Operation value="x" onClick={handleOperationClick} /></div>
          <div> <Operation value="-" onClick={handleOperationClick} /></div>
          <div><Operation value="=" onClick={handleOperationClick} /></div>          
          
        </div>
      </div>
    </div>
  );
};

export default Calculator;
