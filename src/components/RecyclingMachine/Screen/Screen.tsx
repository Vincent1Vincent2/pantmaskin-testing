import "./Screen.css";

interface Props {
  isActive: boolean | null;
  activate: () => void;
  countedCans: number;
  countedBottles: number;
  value: number;
}

function Screen(props: Props) {
  if (props.isActive === true) {
    return (
      <div className="frame">
        <div className="screen" data-testid="screen">
          <span>
            Cans: <p data-testid="counted-cans">{props.countedCans}</p>{" "}
          </span>
          <span>
            {" "}
            Bottles: <p data-testid="counted-bottles">{props.countedBottles}</p>
          </span>
          <span>
            Money: <p data-testid="value">{props.value}</p>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="frame">
        <div className="screen" data-testid="screen" onClick={props.activate}>
          Press screen to start
        </div>
      </div>
    );
  }
}

export default Screen;
