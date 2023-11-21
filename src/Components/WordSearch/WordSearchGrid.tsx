import WordSearchRow from "./WordSearchRow";
import "./WordSearch.css";
import WordSearchGenerator from "../../services/wordsearch";
import helperfunctions from "../../services/helper-classes";

interface Props {
  wordSearchList: { word: string; hint: string; id: number }[];
}

const WordSearchGrid = ({ wordSearchList }: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(wordSearchList);
  const gridLetters = randomizedList.map((item) => item.word.toUpperCase());
  const wordsearcher = new WordSearchGenerator();
  const wordsearchgrid = wordsearcher.generateWordSearch([], gridLetters, 10);

  return (
    <>
      <h2>Word Search</h2>
      <div className="wordsearch">
        <table className="wordSearchTable">
          <tbody>
            {wordsearchgrid.grid.map((item, index) => (
              <WordSearchRow searchRow={item} id={index + 1} />
            ))}
          </tbody>
        </table>

        <ol>
          {wordsearchgrid.placeWords.map((item, index) => (
            <li key={"words" + index}>{item}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default WordSearchGrid;
