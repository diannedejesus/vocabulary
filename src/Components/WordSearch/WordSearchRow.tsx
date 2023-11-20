interface Props {
  searchRow: string;
  id: number;
}
const WordSearchRow = ({ searchRow, id }: Props) => {
  const testWordSearch = searchRow.split("");
  return (
    <tr key={id}>
      {testWordSearch.map((item) => (
        <td>{item}</td>
      ))}
    </tr>
  );
};

export default WordSearchRow;
