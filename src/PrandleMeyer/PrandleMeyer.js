import React from 'react';

const depositText = "Please enter an upstream mach number";
const houseText = "Please enter an expansion angle value";

// const checkLocalStorage = (key) => {
//     if(localStorage.getItem(key) === ""){
//         return null;
//     } else return localStorage.getItem(key);
// }

// export const storedDeposit = checkLocalStorage("deposit");
// export const storedHousePrice = checkLocalStorage("housePrice");

const PrandleMeyer = (props) => {
    //we listen if the user enters "enter" it will calculate the result
    //rather than make them press the button every time
    const listenForEnterKey = (event) => {
        if(event.key === "Enter"){
            props.calculateButton();
        }
    }
    return (
        <div>
            <h1>Prandle Meyer Expansion Fan Calculator</h1>
            <div>
                <h2>Upstream Mach Number</h2>
                <input
                name = "mach"
                min="1"
                onChange={props.inputMachHandler}
                onFocus={clearPlaceholder}
                onBlur={initPlaceholder}
                placeholder={depositText}
                onKeyPress={listenForEnterKey}
                // defaultValue={storedDeposit}
                ></input>
            </div>
            <div>
                <h2>Expansion angle (deg)</h2>
                <input
                //this 'name' field is used to link the...
                //property name when used to change state
                name = "theta"
                min="0"
                onChange={props.inputThetaHandler}
                onFocus={clearPlaceholder}
                onBlur={initPlaceholder}
                placeholder={houseText}
                onKeyPress={listenForEnterKey}
                // defaultValue={storedHousePrice}
                ></input>
            </div>
            {/* displays the total to the user */}
            <h2>Upstream Mach Number:</h2>
            <h2>{props.upstreamMachNumber}</h2>
            <h2>Prandle Meyer Angle 1 (deg):</h2>
            <h2>{props.prandleMeyerAngle1}</h2>
            <h2>Prandle Meyer Angle 2 (deg):</h2>
            <h2>{props.prandleMeyerAngle2}</h2>
            <h2>Upstream Mach Angle (deg):</h2>
            <h2>{props.upstreamMachAngle}</h2>
            <h2>Downstream Mach Angle (deg):</h2>
            <h2>{props.downstreamMachAngle}</h2>
            <div className="buttonContainer">
                <button id="calcBtn" onClick={props.calculateButton}>Calculate</button>
                <button id="resetBtn" className="hidden" onClick={props.resetBtnHandler}>Reset</button>
            </div>
        </div>
    );
}

const clearPlaceholder = (event) => {
    event.target.placeholder = "";
  }

const initPlaceholder = (event) => {
    if(event.target.name === "deposit"){
        event.target.placeholder = depositText;
    }
    else event.target.placeholder = houseText;
  }


export default PrandleMeyer;
