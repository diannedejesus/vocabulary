import { SyntheticEvent, useState } from "react";
// import { useFetch } from "./useFetch";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import ScrambleList from "./Components/Scramble/ScrambleList";
import BlankList from "./Components/Blanks/BlankList";
import { lesson05 as secondaryList } from "./assets/data2";
import vocabularyList from "./assets/data";
import VocabularyForm from "./Components/VocabularyList/VocabularyList";
import WordSearchGrid from "./Components/WordSearch/WordSearchGrid";
import { spanish, english } from "./assets/translation";

function App() {
  // const { data, loading, error } = useFetch(
  //   "https://api.dictionaryapi.dev/api/v2/entries/en/"
  // );

  const wordlist = import.meta.env.DEV ? secondaryList : vocabularyList;
  const [gridSize, setGridSize] = useState<number>(12);
  const [worksheet, setWorksheet] = useState("");
  const [wordList, setWordList] = useState(wordlist);
  const [language, setLanguage] = useState(english);

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

  const onModifyGridSize = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      gridSize: { value: number };
    };

    if (target.gridSize.value < 100) {
      setGridSize(Number(target.gridSize.value));
    }
  };

  return (
    <>
      <Navigation
        text={language}
        onLanguageClick={(language: string) =>
          language === "english" ? setLanguage(english) : setLanguage(spanish)
        }
        onPageClick={(type: string) => setWorksheet(type)}
      />
      {worksheet === "" && <p className="instructions">{language.main}</p>}

      {worksheet === "scramble" && (
        <ScrambleList
          title={language.pageTitles.scramble}
          formText={language.wordList.form}
          vocabularyList={wordList}
          topSection={language.topSection}
        />
      )}

      {worksheet === "blank" && (
        <BlankList
          title={language.pageTitles.missing}
          formText={language.wordList.form}
          vocabularyList={wordList}
          topSection={language.topSection}
        />
      )}

      {worksheet === "wordsearch" && (
        <WordSearchGrid
          gridSize={gridSize}
          title={language.pageTitles.search}
          wordSearchList={wordList}
          topSection={language.topSection}
          onModify={onModifyGridSize}
        />
      )}

      {worksheet === "form" && (
        <VocabularyForm
          title={language.pageTitles.list}
          formText={language.wordList.form}
          onSubmit={submittedInfo}
          words={wordList}
          onRemoveWord={onRemoveWord}
        />
      )}

      {/* {error && <p>Error: </p>}
      {loading && <p>Loading...</p>}
      {data && console.log(data)} */}
    </>
  );
}

export default App;
