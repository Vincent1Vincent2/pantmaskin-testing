import "./Recipe.css";
interface Props {
  cans: number;
  bottles: number;
  value: number;
  closeReceipt: () => void;
}

function Receipt(props: Props) {
  return (
    <div className="receipt" data-testid="receipt">
      <span
        className="closeReceipt"
        data-testid="close-receipt"
        onClick={props.closeReceipt}
      >
        X
      </span>
      <p className="receipt-logo">RECYCLING RECEIPT</p>
      <div className="can-bottle">
        <div className="cans">
          <p>Cans</p>
          <p data-testid="cans-amount">x{props.cans}</p>
        </div>
        <span className="line"></span>
        <div className="bottles">
          <p>Bottles</p>
          <p data-testid="bottles-amount">x{props.bottles}</p>
        </div>
        <span className="line"></span>

        <div className="total">
          <p className="amount">Total Amount</p>
          <p data-testid="value-amount">x{props.cans + props.bottles}</p>
        </div>
        <span className="line"></span>
      </div>
      <span className="line"></span>

      <div className="value">
        <p>Payout</p>
        <p>{props.value} sek</p>
      </div>
    </div>
  );
}

export default Receipt;
