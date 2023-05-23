import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

export default function ExpenseItem(props) {
  const { title, amount, date } = props;

  return (
    <Card className="expense-item">
      <div className="expense-item__description">
        <ExpenseDate date={date} />
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>
    </Card>
  );
}
