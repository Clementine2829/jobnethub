import React from "react";
import btns from "./BtnsNextPrev.module.css"

function CreateIndexedBtns(props){

    const { jobs, activePage, pagesCounter } = props
    const resultText = []
    let prevCondition = (activePage == 1) ? true: false;
    let nextCondition = false;
    if (jobs > 5) {
        nextCondition = (pagesCounter == 1) ? true : false
        nextCondition = (pagesCounter == activePage) ? true : false
        for(let i = 0; i < pagesCounter; i++){
            let pageNumberCondition = (i == (activePage - 1))
            resultText.push(
                <button 
                    key={i}
                    className={`${btns.btnsList} ${pageNumberCondition ? btns.active : ""}`}>
                    {i + 1}
                </button>
            )
        }
    } else {
        resultText.push(<button className={`${btns.btnsList} ${btns.active}`}>1</button>)
        prevCondition = true;
        nextCondition = true;
    }
    
    return(
        <div className={`${btns.pageBtns}`}>
            <button className={`${btns.btn} ${prevCondition ? btns.disabled : ""}`}>Prev</button>
            <div className={`${btns.numberedBtns}`}>{resultText}</div>
            <button className={`${btns.btn} ${nextCondition ? btns.disabled : ""}`}>Next</button>
        </div>
    )
}

export default CreateIndexedBtns