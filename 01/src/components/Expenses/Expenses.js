import { useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

export default function Expenses(props) {
  const expenses = props.expenses;
  const [selectedYear, setSelectedYear] = useState("2021");

  const expenseFilterChangeHandler = (newFilter) => {
    setSelectedYear(newFilter);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const year = expense.date.getFullYear().toString();
    return year === selectedYear;
  });

  return (
    <li>
      <Card className="expenses">
        <ExpenseFilter
          onExpenseFilterChange={expenseFilterChangeHandler}
          selectedYear={selectedYear}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList expenses={filteredExpenses} />
      </Card>
    </li>
  );
}
