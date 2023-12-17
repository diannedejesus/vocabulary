import WordSearchRow from "./WordSearchRow";
import "./WordSearch.css";
import WordSearchGenerator from "../../services/wordsearch";
import helperfunctions from "../../services/helper-classes";
import TopSection from "../TopSection";
import GridSize from "./GridSize";
import { SyntheticEvent } from "react";

interface Props {
  wordSearchList: { word: string; hint: string; id: number }[];
  title: string;
  topSection: { name: string; date: string };
  gridSize: number;
  onModify: (data: SyntheticEvent) => void;
}

const WordSearchGrid = ({
  wordSearchList,
  title,
  topSection,
  gridSize,
  onModify,
}: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(wordSearchList);
  const gridLetters = randomizedList.map((item) => item.word.toUpperCase());
  const wordsearcher = new WordSearchGenerator();
  let wordsearchgrid = wordsearcher.generateWordSearch(
    [],
    gridLetters,
    gridSize
  );

  return (
    <>
      <TopSection text={topSection} />
      <h2>{title}</h2>
      <GridSize text="Modify" onModify={onModify} />
      <table className="wordSearchTable">
        <tbody>
          {wordsearchgrid.grid.map((item, index) => (
            <WordSearchRow key={"row-" + index + 1} searchRow={item} />
          ))}
        </tbody>
      </table>

      <ol className="wordsearch">
        {wordsearchgrid.placeWords.map((item, index) => (
          <li key={"words" + index}>{item}</li>
        ))}
      </ol>
    </>
  );
};

export default WordSearchGrid;
