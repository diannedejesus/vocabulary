interface Props {
  searchRow: string;
  id: number;
}
const WordSearchRow = ({ searchRow, id }: Props) => {
  const testWordSearch = searchRow.split("");

  return (
    <tr key={id}>
      {testWordSearch.map((item, index) => (
        <td key={"cell" + index}>{item}</td>
      ))}
    </tr>
  );
};

export default WordSearchRow;
