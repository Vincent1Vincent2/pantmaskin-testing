import "./Phone.css";
interface Props {
  isActive: boolean | null;
  timesFixed: number;
  onClick: () => void;
}

function Phone(props: Props) {
  const pointerEventsStyle = props.isActive ? "none" : "auto";
  const phoneClassName = `phone ${
    props.isActive === null && props.timesFixed < 1 ? "focusPhone" : ""
  }`;

  return (
    <img
      className={phoneClassName}
      data-testid="phone"
      src="src/assets/phone/images/1.png"
      alt="phone"
      style={{ pointerEvents: pointerEventsStyle }}
      onClick={() => {
        props.onClick();
      }}
    />
  );
}

export default Phone;
