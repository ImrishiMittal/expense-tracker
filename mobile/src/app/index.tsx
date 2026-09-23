import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
type Expense = {
  title: string;
  amount: number;
  id: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  appTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 50,
    padding: 10,
    backgroundColor: '#e0f4c4',
    borderRadius: 5,
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginTop: 20,
  }
});

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  function handleAddExpense() {
    if (!expenseName || !expenseAmount) {
      alert("Please enter both expense name and amount.");
      return;
    }
    if (isNaN(parseFloat(expenseAmount))) {
      alert("Please enter a valid number for expense amount.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(expenseName)) {
      alert("Please enter a valid expense name.");
      return;
    }
    const newExpense: Expense = {
      id: String(expenses.length + 1),
      title: expenseName.trim(),
      amount: parseFloat(expenseAmount)
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setExpenseAmount("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>
        EXPENSE TRACKER
      </Text>
      <Text> Expenses: {expenses.length} </Text>
      {expenses.map((expense) => (
        <Text key={expense.id}>
          {expense.title}: ₹{expense.amount}
        </Text>
      ))}
      <TextInput
        placeholder="Enter expense name"
        value={expenseName}
        onChangeText={setExpenseName}
        style={styles.border}
      />
      <TextInput
        placeholder="Enter expense amount"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        keyboardType="decimal-pad"
        style={styles.border}
      />
      <Pressable style={styles.addButton} onPress={handleAddExpense}>
        <Text > + Add Expense </Text>
      </Pressable>
    </View>
  );
}