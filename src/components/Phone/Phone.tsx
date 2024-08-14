interface Props {
  isActive: boolean | null;
  onClick: () => void;
}

function Phone(props: Props) {
  const pointerEventsStyle = props.isActive ? "none" : "auto";

  return (
    <img
      data-testid="phone"
      src="src/assets/phone/images/1.png"
      alt="phone"
      style={{ pointerEvents: pointerEventsStyle }}
      onClick={() => {
        if (!props.isActive) {
          props.onClick();
        }
      }}
    />
  );
}

export default Phone;
