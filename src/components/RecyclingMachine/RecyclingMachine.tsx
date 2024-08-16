import { useState } from "react";
import machine from "../../../data/recycling-machine.json";
import Bottle from "../Bottle/Bottle";
import Can from "../Can/Can";
import Phone from "../Phone/Phone";
import Receipt from "../Receipt/Receipt";
import "./RecyclingMachine.css";
import Screen from "./Screen/Screen";

interface newReceipt {
  cans: number;
  bottles: number;
  value: number;
}

function RecyclingMachine() {
  const [isActive, setIsActive] = useState<boolean | null>(false);
  const [cans, setCans] = useState<number>(0);
  const [bottles, setBottles] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [clicked, setClicked] = useState<number[]>([]);
  const [timesFixed, setTimesFixed] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [newReceipt, setNewReceipt] = useState<newReceipt | null>(null);

  const handleActivation = () => {
    setIsActive(true);
    setShowReceipt(false);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  const phoneCall = () => {
    if (isActive === null && timesFixed < 1) {
      playPhoneSound();
      setTimeout(() => {
        setIsActive(false);
        setTimesFixed((prevTimesFixed) => prevTimesFixed + 1);
      }, 4000);
    }
    return;
  };

  const playPhoneSound = () => {
    if (isActive === null && timesFixed < 1) {
      const audio = new Audio("/src/assets/phone/sounds/1.mp3");

      audio.play();
    }
  };

  const playCrushingSound = () => {
    const sounds = [
      "src/assets/recycling-machine/sounds/crushing/1.mp3",
      "src/assets/recycling-machine/sounds/crushing/2.mp3",
      "src/assets/recycling-machine/sounds/crushing/3.mp3",
    ];

    const randomIndex = Math.floor(Math.random() * sounds.length);
    const selectedSound = sounds[randomIndex];

    const audio = new Audio(selectedSound);
    audio.play();
  };

  const handleItemClick = (type: string, value: number, id: number) => {
    if (isActive === true) {
      playCrushingSound();
      if (type === "can") {
        setCans((prevCans) => prevCans + 1);
        setClicked((prevClickedCans) => [...prevClickedCans, id]);
      }
      if (type === "bottle") {
        setBottles((prevBottles) => prevBottles + 1);
        setClicked((prevClickedBottles) => [...prevClickedBottles, id]);
      }
      setValue((prevValue) => prevValue + value);
      if (clicked.length >= 9 && timesFixed < 1) {
        setIsActive(null);
      }
    }
  };

  const printReceipt = () => {
    if (cans >= 1 || bottles >= 1) {
      setNewReceipt({ cans, bottles, value });

      setCans(0);
      setBottles(0);
      setValue(0);
      setShowReceipt(true);
      setIsActive(false);
    }
  };

  return (
    <div className="main-container">
      <img
        className="recycling-machine"
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
        errorMessage={machine["error-message"]}
      />
      <Phone timesFixed={timesFixed} isActive={isActive} onClick={phoneCall} />
      <Can hideClicked={clicked} handleItemClick={handleItemClick} />
      <Bottle hideClicked={clicked} handleItemClick={handleItemClick} />
      <div
        className="button"
        data-testid="print-receipt"
        onClick={printReceipt}
      ></div>
      {showReceipt && newReceipt && (
        <Receipt
          cans={newReceipt.cans}
          bottles={newReceipt.bottles}
          value={newReceipt.value}
          closeReceipt={closeReceipt}
        />
      )}
    </div>
  );
}

export default RecyclingMachine;
