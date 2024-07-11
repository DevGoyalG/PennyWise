// Charts.js
import React from "react";
import "./Charts.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import NoTransactions from "./NoTransactions";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Charts({ transactions }) {
  const labels = transactions.map((transaction) => transaction.date);

  const expenseData = transactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => transaction.amount);

  const incomeData = transactions
    .filter((transaction) => transaction.type === "income")
    .map((transaction) => transaction.amount);

  const dates = transactions.map((item) => {
    return item.date;
  });

  const tags = transactions.map((item) => {
    return item.tag;
  });

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: expenseData,
      },
      {
        label: "Income",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: incomeData,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses and Income vs Date",
      },
    },
  };
  const tagAggregation = transactions.reduce((acc, transaction) => {
    if (acc[transaction.tag]) {
      acc[transaction.tag] += transaction.amount;
    } else {
      acc[transaction.tag] = transaction.amount;
    }
    return acc;
  }, {});

  const pieLabels = Object.keys(tagAggregation);
  const pieDataValues = Object.values(tagAggregation);

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieDataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Amounts by Tag",
      },
    },
  };

  return (
    <>
      {transactions.length === 0 ? (
        <NoTransactions />
      ) : (
        <div className="chart-container">
          <div className="line-chart">
            <Line data={lineData} options={lineOptions} />
          </div>
          <div className="pi-chart">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </>
  );
}

export default Charts;
