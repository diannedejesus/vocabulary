import WordSearchRow from "./WordSearchRow";
import "./WordSearch.css";
import WordSearchGenerator from "../../services/wordsearch";

interface Props {
  wordSearchList: { word: string; hint: string; id: number }[];
}

const WordSearchGrid = ({ wordSearchList }: Props) => {
  const gridLetters = wordSearchList.map((item) => item.word);
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
          {wordsearchgrid.placeWords.map((item) => (
            <li>{item}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default WordSearchGrid;
