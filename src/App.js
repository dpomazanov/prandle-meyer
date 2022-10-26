import React, { Component } from 'react';
import './App.css';
import PrandleMeyer from "./PrandleMeyer/PrandleMeyer.js";

class App extends Component {

  initialState = {
    mach: 1,
    theta: 10,
    upstreamMachNumber: 0,
    prandleMeyerAngle1: 0,
    prandleMeyerAngle2: 0,
    upstreamMachAngle: 0,
    downstreamMachAngle: 0,
  }
  resetState = {
    mach: 1,
    theta: 10,
  }
  //sets the inital state of the app
  state = {
    ...this.initialState
  };

  inputMachHandler = (e) => {
    // const maxLength = 8;
    //checks for the value, if its not a number, dont update the value.
    if(isNaN(e.target.value)) e.target.value = "";
    //also checks the length to make sure its appropriate

    // else if(e.target.value.length < 1) {
    //   //keeps the input to a length of maxLength
    //   alert( "M1 should be >= 1" );
    //   if(isNaN(e.target.value)) e.target.value = "";
    // }

    this.updateLocalStorage(e.target.name, e.target.value);
    //set the state to the new value entered
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  inputThetaHandler = (e) => {
    // const maxLength = 8;
    //checks for the value, if its not a number, dont update the value.
    if(isNaN(e.target.value)) e.target.value = "";
    // //also checks the length to make sure its appropriate
    // else if(e.target.value.length > maxLength) {
    //   //keeps the input to a length of maxLength
    //   e.target.value = e.target.value.slice(0,maxLength);
    // }
    this.updateLocalStorage(e.target.name, e.target.value);
    //set the state to the new value entered
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  updateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  }

  //handles the on change for the select event

  resetCalculator = (event) => {
    //clear local storage
    localStorage.clear();
    //reset the state to the initial state
    this.setState({
      ...this.resetState
    })
    //reset the inputs
   let inputs = document.querySelectorAll("input");
   inputs.forEach(input => {
     input.value = null;
   });
   //hide the reset button
   document.querySelector("#resetBtn").classList.add("hidden");
  }

  Prandtl_Meyer = ( m, alpha ) =>
    {
       // Returns Prandtl-Meyer function for given Mach number M
       var pm;
       var x;

       x = Math.sqrt( m * m - 1.0 );
       pm = alpha * Math.atan( x / alpha ) - Math.atan( x );

       return pm*180/Math.PI
    }


  Mach = ( pm ) =>
    {
       // Calculate Mach number for given Prandtl-Meyer function PM
       var x1, x2, x;
       var f1, f2, f;
       var tolerance = 1.0e-6;

       // duplicate
       let gamma = 1.4
       let alpha = Math.sqrt( ( gamma + 1.0 ) / ( gamma - 1.0 ) ) //duplicate

       x1 = 1;
       x2 = 1.0;
       f1 = this.Prandtl_Meyer( x1, alpha );
       f2 = f1;
       do
       {
          x1 = x2;
          f1 = f2;
          x2 = x2 * 2.0;
          f2 = this.Prandtl_Meyer( x2, alpha );
       } while ( f2 < pm );

       do
       {
          x = x1 + ( x2 - x1 ) * ( pm - f1 ) / ( f2 - f1 );
          f = this.Prandtl_Meyer( x, alpha );
          if ( ( pm - f ) * ( pm - f1 ) > 0.0 )
          {
             x1 = x;
             f1 = f;
          }
          else
          {
             x2 = x;
             f2 = f;
          }
       } while ( Math.abs( pm - f ) > tolerance );

       return x;
    }

  setupMortgageCalculation = (m1, th) => {
    //variables for calculations
    let gamma = 1.4
    let alpha = Math.sqrt( ( gamma + 1.0 ) / ( gamma - 1.0 ) )
    let pm_max = ( alpha - 1.0 ) * Math.PI / 2.0

    let pm1 = this.Prandtl_Meyer(m1, alpha)
    var pm2 = Number(th) + pm1

    let m2 = this.Mach(pm2)
    let mu1 = Math.asin(1/m1)*180/Math.PI
    let mu2 = Math.asin(1/m2)*180/Math.PI

    //show the reset button
    document.querySelector("#resetBtn").classList.remove("hidden");
    //set the state to the new calc'd value
    this.setState({
      upstreamMachNumber: m2,
      prandleMeyerAngle1: pm1,
      prandleMeyerAngle2: pm2,
      upstreamMachAngle: mu1,
      downstreamMachAngle: mu2,
    })
  };
  render(){
    return (
      <div className="MortgageCalc">
        <PrandleMeyer
        //props for the main app-container.js
        inputMachHandler={this.inputMachHandler}
        inputThetaHandler={this.inputThetaHandler}
        upstreamMachNumber={this.state.upstreamMachNumber}
        prandleMeyerAngle1={this.state.prandleMeyerAngle1}
        prandleMeyerAngle2={this.state.prandleMeyerAngle2}
        upstreamMachAngle={this.state.upstreamMachAngle}
        downstreamMachAngle={this.state.downstreamMachAngle}
        //calculate button
        calculateButton={this.setupMortgageCalculation.bind(this,
          this.state.mach,
          this.state.theta)}
        //reset button
        resetBtnHandler={this.resetCalculator}
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap" rel="stylesheet"></link>
      </div>

    );
  }
}

export default App;
