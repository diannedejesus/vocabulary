import WordSearchRow from "./WordSearchRow";
import "./WordSearch.css";
import WordSearchGenerator from "../../services/wordsearch";
import helperfunctions from "../../services/helper-classes";
import TopSection from "../TopSection";

interface Props {
  wordSearchList: { word: string; hint: string; id: number }[];
  title: string;
  topSection: { name: string; date: string };
}

const WordSearchGrid = ({ wordSearchList, title, topSection }: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(wordSearchList);
  const gridLetters = randomizedList.map((item) => item.word.toUpperCase());
  const wordsearcher = new WordSearchGenerator();
  const wordsearchgrid = wordsearcher.generateWordSearch([], gridLetters, 12);

  return (
    <>
      <TopSection text={topSection} />
      <h2>{title}</h2>

      <table className="wordSearchTable">
        <tbody>
          {wordsearchgrid.grid.map((item, index) => (
            <WordSearchRow searchRow={item} id={index + 1} />
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
