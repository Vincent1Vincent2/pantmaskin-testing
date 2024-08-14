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
      <div data-testid="screen">
        <p data-testid="counted-cans">{props.countedCans}</p>
        <p data-testid="counted-bottles">{props.countedBottles}</p>
        <p data-testid="value">{props.value}</p>
      </div>
    );
  } else {
    return (
      <div data-testid="screen" onClick={props.activate}>
        Press screen to start
      </div>
    );
  }
}

export default Screen;
