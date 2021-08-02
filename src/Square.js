import React from "react";

//in javascript you need to always call super
//when defining the constructor of a subclass
//All react components classes that have a construc. should
//start with a super(props) call

function Square(props) {
    return (
        <button 
            className="square" 
            onClick={props.onClick}>
                {props.value}
            </button>
    );
}

export default Square;