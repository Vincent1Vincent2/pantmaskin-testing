import canData from "../../../data/cans.json";

interface Props {
  handleItemClick: (type: string, value: number) => void;
}

function Can(props: Props) {
  return (
    <div>
      {canData.cans.map((can) => (
        <img
          data-testid={`can-${can.id}`}
          onClick={() => props.handleItemClick(can.type, can.value)}
          src={can.image}
          alt="Can"
        />
      ))}
    </div>
  );
}

export default Can;
