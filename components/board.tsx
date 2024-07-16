import styles from "@/styles/board.module.css";

export default function Board() {
  const renderGrid = () => {
    //üres tömb ahová a cella elemek kerülnek
    const cells: JSX.Element[] = [];
    //mennyi cellát akarunk létrehozni
    const totalCellsCount = 16;

    //létrehoz a totalCellsCount álltal meghatározott számu divet , kulcsnek az indexet adja meg
    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index} />);
    }
    return cells;
  };
  return (
    <div className={styles.board}>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
