import { SyntheticEvent, useState } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import ScrambleList from "./Components/Scramble/ScrambleList";
import BlankList from "./Components/Blanks/BlankList";
import { lesson11 as vocabularyList } from "./assets/data2";
//import vocabularyList from "./assets/data";
import VocabularyForm from "./Components/VocabularyList/VocabularyList";
import WordSearchGrid from "./Components/WordSearch/WordSearchGrid";

function App() {
  const [worksheet, setWorksheet] = useState("");
  const [wordList, setWordList] = useState(vocabularyList);
  const submittedInfo = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      word: { value: string };
      hint: { value: string };
    };

    setWordList([
      {
        word: target.word.value,
        hint: target.hint.value,
        id: wordList.length + 1,
      },
      ...wordList,
    ]);

    (event.target as HTMLFormElement).reset();
  };
  const onRemoveWord = (data: number) => {
    const removeItem = wordList.filter((item) => item.id !== data);
    setWordList(removeItem);
  };

  return (
    <>
      <Navigation onClick={(type: string) => setWorksheet(type)} />
      {worksheet === "" && <h2>Choose an option ^^</h2>}
      {worksheet === "scramble" && <ScrambleList vocabularyList={wordList} />}
      {worksheet === "blank" && <BlankList vocabularyList={wordList} />}
      {worksheet === "wordsearch" && (
        <WordSearchGrid wordSearchList={wordList} />
      )}
      {worksheet === "form" && (
        <VocabularyForm
          onSubmit={submittedInfo}
          words={wordList}
          onRemoveWord={onRemoveWord}
        />
      )}
    </>
  );
}

export default App;
