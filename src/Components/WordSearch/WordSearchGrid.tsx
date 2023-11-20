import WordSearchRow from "./WordSearchRow";
import "./WordSearch.css";

interface Props {
  wordSearchList: { word: string; hint: string; id: number }[];
}

const WordSearchGrid = ({ wordSearchList }: Props) => {
  const gridLetters = wordSearchList.map((item) => item.word);

  return (
    <>
      <table className="wordSearchTable">
        {gridLetters.map((item, index) => (
          <WordSearchRow searchRow={item} id={index + 1} />
        ))}
      </table>
    </>
  );
};

export default WordSearchGrid;
