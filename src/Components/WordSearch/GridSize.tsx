import { SyntheticEvent } from "react";

interface Props {
  text: string;
  onModify: (data: SyntheticEvent) => void;
}

function GridSize({ text, onModify }: Props) {
  return (
    <form
      className="gridsizeForm"
      onSubmit={(event) => {
        event.preventDefault();
        onModify(event);
      }}
    >
      <label htmlFor="gridDimension">Grid Size</label>{" "}
      <input id="gridDimension" name="gridSize" type="number" max={100} />{" "}
      <button type="submit">{text}</button>
    </form>
  );
}

export default GridSize;
