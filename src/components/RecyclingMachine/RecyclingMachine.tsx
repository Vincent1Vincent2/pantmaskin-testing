import { useState } from "react";
import machine from "../../../data/recycling-machine.json";
import Bottle from "../Bottle/Bottle";
import Can from "../Can/Can";
import "./RecyclingMachine.css";
import Screen from "./Screen/Screen";

function RecyclingMachine() {
  const [isActive, setIsActive] = useState<boolean | null>(false);
  const [cans, setCans] = useState<number>(0);
  const [bottles, setBottles] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [clicked, setClicked] = useState<number[]>([]);

  const handleActivation = () => {
    setIsActive(true);
  };

  const handleItemClick = (type: string, value: number, id: number) => {
    if (isActive === true) {
      if (type === "can") {
        setCans((prevCans) => prevCans + 1);
        setClicked((prevClickedCans) => [...prevClickedCans, id]);
      }
      if (type === "bottle") {
        setBottles((prevBottles) => prevBottles + 1);
        setClicked((prevClickedBottles) => [...prevClickedBottles, id]);
      }
      setValue((prevValue) => prevValue + value);
    }
  };

  return (
    <div>
      <img
        data-testid="recycling-machine"
        src={machine.image}
        alt="Recycling Machine"
      />
      <Screen
        isActive={isActive}
        activate={handleActivation}
        countedCans={cans}
        countedBottles={bottles}
        value={value}
      />
      <Can hideClicked={clicked} handleItemClick={handleItemClick} />
      <Bottle hideClicked={clicked} handleItemClick={handleItemClick} />
    </div>
  );
}

export default RecyclingMachine;
