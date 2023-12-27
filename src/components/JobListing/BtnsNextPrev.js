import React from "react";
import btns from "./BtnsNextPrev.module.css";

function CreateIndexedBtns({ activePage, pagesCounter, nextOrPrevPage }) {
  const resultText = [];
  let prevCondition = activePage === 1;
  let nextCondition = false;
  if (pagesCounter > 1) {
    nextCondition = pagesCounter == 1 ? true : false;
    nextCondition = pagesCounter == activePage ? true : false;
    for (let i = 0; i < pagesCounter; i++) {
      let pageNumberCondition = i == activePage - 1;
      resultText.push(
        <button
          onClick={() => nextOrPrevPage(i + 1)}
          key={i}
          className={`${btns.btnsList} ${
            pageNumberCondition ? btns.active : ""
          }`}
        >
          {i + 1}
        </button>
      );
    }
  } else {
    resultText.push(
      <button key={0} className={`${btns.btnsList} ${btns.active}`}>
        1
      </button>
    );
    prevCondition = true;
    nextCondition = true;
  }

  return (
    <div className={`${btns.pageBtns}`}>
      <button
        onClick={() => nextOrPrevPage(activePage - 1)}
        key={-1}
        className={`${btns.btn} ${prevCondition ? btns.disabled : ""}`}
        disabled={prevCondition}
      >
        Prev
      </button>
      <div className={`${btns.numberedBtns}`}>{resultText}</div>
      <button
        onClick={() => nextOrPrevPage(activePage + 1)}
        key={-2}
        className={`${btns.btn} ${nextCondition ? btns.disabled : ""}`}
        disabled={nextCondition}
      >
        Next
      </button>
    </div>
  );
}

export default CreateIndexedBtns;
