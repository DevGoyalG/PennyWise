import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
import Modal from "antd/es/modal/Modal";
import AddExpense from "../components/Modals/AddExpense";
import AddIncome from "../components/Modals/AddIncome";
import { addDoc, collection, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { getDocs } from "firebase/firestore";
import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import TransactionTable from "../components/TransactionTables/TransactionTable";
import Charts from "../components/Charts/Charts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transaction`),
        transaction
      );
      toast.success("Transaction Added!");
      fetchTransactions(); // Fetch transactions again after adding a new one
    } catch (error) {
      toast.error("couldn't add transaction");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transaction`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      calculateBalance(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const calculateBalance = (transactionsArray) => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactionsArray.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };
  const sortedByDateTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <>
      <Header />
      {loading ? (
        <div className="loader">
          <Space>
            <Spin
              size="large"
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 60,
                  }}
                  spin
                />
              }
            />
          </Space>
        </div>
      ) : (
        <>
          <Cards
            title="Current Balance"
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            totalBalance={totalBalance}
            expense={expense}
            income={income}
          />
          <Charts transactions={sortedByDateTransactions}></Charts>

          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={(values) => onFinish(values, "expense")}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={(values) => onFinish(values, "income")}
          />
          <div className="table">
            <TransactionTable transactions={transactions} />
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
