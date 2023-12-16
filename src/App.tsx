import { SyntheticEvent, useState } from "react";
import { useFetch } from "./useFetch";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import ScrambleList from "./Components/Scramble/ScrambleList";
import BlankList from "./Components/Blanks/BlankList";
import { lesson12spa as secondaryList } from "./assets/data2";
import vocabularyList from "./assets/data";
import VocabularyForm from "./Components/VocabularyList/VocabularyList";
import WordSearchGrid from "./Components/WordSearch/WordSearchGrid";
import { spanish, english } from "./assets/translation";

function App() {
  const { data, loading, error } = useFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/test"
  );

  const wordlist = import.meta.env.DEV ? secondaryList : vocabularyList;
  const [worksheet, setWorksheet] = useState("");
  const [wordList, setWordList] = useState(wordlist);
  const [language, setLanguage] = useState(english);
  const [backend, setBackend] = useState(false);

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
          vocabularyList={wordList}
        />
      )}

      {worksheet === "blank" && (
        <BlankList
          title={language.pageTitles.missing}
          vocabularyList={wordList}
        />
      )}

      {worksheet === "wordsearch" && (
        <WordSearchGrid
          title={language.pageTitles.search}
          wordSearchList={wordList}
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

      {/* {error && <p>Error: </p>} */}
      {loading && <p>Loading...</p>}
      {data && console.log(data)}
    </>
  );
}

export default App;
