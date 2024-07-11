import React from "react";
import "./Cards.css";
import { Card, Row, Col } from "antd";
import {
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import Button from "../Button/Button";

function Cards({
  showExpenseModal,
  showIncomeModal,
  totalBalance,
  income,
  expense,
}) {
  return (
    <div>
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Card
            title={
              <span>
                <DollarCircleOutlined /> Current Balance
              </span>
            }
            className="my-card"
          >
            <p> ₹{totalBalance}</p>
            <Button text="Reset Balance" blue={true} />
          </Card>
        </Col>

        <Col>
          <Card
            title={
              <span>
                <ArrowUpOutlined /> Total Income
              </span>
            }
            className="my-card"
          >
            <p> ₹ {income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal} />
          </Card>
        </Col>

        <Col>
          <Card
            title={
              <span>
                <ArrowDownOutlined /> Total Expenses
              </span>
            }
            className="my-card"
          >
            <p> ₹ {expense}</p>
            <Button
              text="Add Expenses"
              blue={true}
              onClick={showExpenseModal}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
