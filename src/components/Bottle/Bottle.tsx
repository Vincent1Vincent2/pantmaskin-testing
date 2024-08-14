import bottleData from "../../../data/bottles.json";
import "./Bottle.css";

interface Props {
  handleItemClick: (type: string, value: number, id: number) => void;
  hideClicked: number[];
}

function Bottle(props: Props) {
  return (
    <div>
      {bottleData.bottles.map(
        (bottle) =>
          !props.hideClicked.includes(bottle.id) && (
            <img
              className="bottle"
              key={`bottle-${bottle.id}`}
              data-testid={`bottle-${bottle.id}`}
              onClick={() =>
                props.handleItemClick(bottle.type, bottle.value, bottle.id)
              }
              src={bottle.image}
              alt="bottle"
            />
          )
      )}
    </div>
  );
}

export default Bottle;
