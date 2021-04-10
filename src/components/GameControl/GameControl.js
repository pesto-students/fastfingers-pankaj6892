import React from 'react';
import wordDictionary from '../../components/data/dictionary.json';

const easyWords = wordDictionary.filter(word=> word.length <= 4);
const mediumWords = wordDictionary.filter(word=> word.length <= 8 && word.length > 4);
const hardWords = wordDictionary.filter(word=> word.length > 8);

const mediumDifficultyFactor=1.5;
const hardDifficultyFactor=2.0;


const getRandomIndex = array => Math.floor(Math.random() * array.length);

export const getRandomWordFromDictionary = (difficultyFactor) => {

  if(difficultyFactor < mediumDifficultyFactor) {
    return easyWords[getRandomIndex(easyWords)];
  }
  else if(difficultyFactor < hardDifficultyFactor) {
    return mediumWords[getRandomIndex(mediumWords)];
  }
  else {
    return hardWords[getRandomIndex(hardWords)];
  }
}

export default function TargetWord({ targetWord, userInput }) {
  let content = targetWord.split("").map((ch, i) => {
    if (userInput[i] && ch.toLowerCase() === userInput[i].toLowerCase()) {
      return (
        <span style={{ color: "green" }} key={i}>
          {ch}
        </span>
      );
    } else if (userInput[i]) {
      return (
        <span style={{ color: "blue" }} key={i}>
          {ch}
        </span>
      );
    } else {
      return (
        <span style={{ color: "white" }} key={i}>
          {ch}
        </span>
      );
    }
  });
  return <p>{content}</p>;
}

