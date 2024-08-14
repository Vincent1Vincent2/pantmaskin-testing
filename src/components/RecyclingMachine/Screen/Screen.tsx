import "./Screen.css";

interface Props {
  isActive: boolean | null;
  activate: () => void;
  countedCans: number;
  countedBottles: number;
  value: number;
  errorMessage: string;
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
  } else if (props.isActive === false) {
    return (
      <div className="frame">
        <div className="screen" data-testid="screen" onClick={props.activate}>
          Press screen to start
        </div>
      </div>
    );
  } else if (props.isActive === null) {
    return (
      <div className="frame">
        <div className="screen error" data-testid="screen">
          <p data-testid="error-message"> {props.errorMessage} </p>
        </div>
      </div>
    );
  }
}

export default Screen;
