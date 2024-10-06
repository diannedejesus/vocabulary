import { SyntheticEvent, useState, useEffect } from "react";
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

interface Definitions {
  [key: string]: string;
}

function App() {
  const wordlist = import.meta.env.DEV ? secondaryList : vocabularyList;
  const [gridSize, setGridSize] = useState<number>(12);
  const [worksheet, setWorksheet] = useState("");
  const [wordList, setWordList] = useState(wordlist);
  const [language, setLanguage] = useState(english);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchDefinitionWithDelay = async (word: string, delayTime: number) => {
    await delay(delayTime);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) throw new Error(`No definition found for "${word}".`);
      const data = await response.json();
      return { word, data: data[0].meanings[0].definitions[0].definition };
    } catch (error) {
      return { word, data: `Error fetching definition for "${word}".` };
    }
  };

  useEffect(() => {
    const fetchDefinitions = async () => {
      //loading
      const fetchedDefinitions: Definitions = {};
      console.log("ran");
      for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i].word;
        const result = await fetchDefinitionWithDelay(word, 1000);

        fetchedDefinitions[result.word] = result.data;
      }

      const newList = [];
      for (const currentWord of wordList) {
        newList.push({
          ...currentWord,
          definition: fetchedDefinitions[currentWord.word],
        });
      }
      setWordList(newList);
      //loading
    };

    fetchDefinitions();
  }, []);
  //--------------------------------------------------------

  const submittedInfo = async (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      word: { value: string };
      hint: { value: string };
    };

    const result = await fetchDefinitionWithDelay(target.word.value, 1000);

    setWordList([
      {
        word: target.word.value,
        hint: target.hint.value,
        id: wordList.length + 1,
        definition: result.data,
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
