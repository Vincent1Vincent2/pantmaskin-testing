import bottleData from "../../../data/bottles.json";

interface Props {
  handleItemClick: (type: string, value: number) => void;
}

function Bottle(props: Props) {
  return (
    <div>
      {bottleData.bottles.map((bottle) => (
        <img
          data-testid={`bottle-${bottle.id}`}
          onClick={() => props.handleItemClick(bottle.type, bottle.value)}
          src={bottle.image}
          alt="Bottle"
        />
      ))}
    </div>
  );
}

export default Bottle;
