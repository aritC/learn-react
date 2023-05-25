import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

import "./NewExpense.css";

export default function NewExpense(props) {
  const [showForm, setShowForm] = useState(false);

  const saveExpenseDataHandler = (newExpenseData) => {
    const newExpenseItem = {
      ...newExpenseData,
      id: Math.random().toString(),
    };

    props.onAddNewExpenseItem(newExpenseItem);
  };

  const addNewExpenseHandler = () => {
    setShowForm(true);
  };

  const hideNewExpenseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="new-expense">
      {!showForm ? (
        <button onClick={addNewExpenseHandler}>Add New Expense </button>
      ) : (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          showForm={showForm}
          onCancel={hideNewExpenseForm}
        />
      )}
    </div>
  );
}
