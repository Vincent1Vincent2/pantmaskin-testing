import canData from "../../../data/cans.json";
import "./Can.css";

interface Props {
  handleItemClick: (type: string, value: number, id: number) => void;
  hideClicked: number[];
}

function Can(props: Props) {
  return (
    <div>
      {canData.cans.map(
        (can) =>
          !props.hideClicked.includes(can.id) && (
            <img
              className="can"
              key={`can-${can.id}`}
              data-testid={`can-${can.id}`}
              onClick={() => props.handleItemClick(can.type, can.value, can.id)}
              src={can.image}
              alt="Can"
            />
          )
      )}
    </div>
  );
}

export default Can;
