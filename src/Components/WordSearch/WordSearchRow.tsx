interface Props {
  searchRow: string;
}
const WordSearchRow = ({ searchRow }: Props) => {
  const testWordSearch = searchRow.split("");

  return (
    <tr>
      {testWordSearch.map((item, index) => (
        <td key={"cell" + index}>{item}</td>
      ))}
    </tr>
  );
};

export default WordSearchRow;
