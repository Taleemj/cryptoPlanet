import React, { useState, useContext, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import axios from "axios";

import { DataContext } from "./contexts/DataContextProvider";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  // const { getCyptos, results } = useContext(DataContext);
  const [coinDetail, setCoinDetail] = useState([]);
  const [coinDataHistory, setcoinDataHistory] = useState([]);

  const getCoin = async () => {
    const coin = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      {
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "3ad125af40msha3fe0c6e8a0b18ep15f567jsn1747f4551c09",
        },
      }
    );

    setCoinDetail(coin?.data?.data?.coin);
    // console.log(coinDetail);
  };

  const coinhistory = async () => {
    const history = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
      {
        params: {
          timePeriod: timePeriod,
        },
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "3ad125af40msha3fe0c6e8a0b18ep15f567jsn1747f4551c09",
        },
      }
    );
    setcoinDataHistory(history?.data);
    // console.log(coinDataHistory);
  };
  useEffect(() => {
    getCoin();
    // getCyptos(`/coin/${coinId}`);
    // console.log(coin);
  }, [coinId]);

  useEffect(() => {
    coinhistory();
  }, []);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetail?.price && millify(coinDetail?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetail?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinDetail?.volume && coinDetail?.volume}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetail?.marketCap && millify(coinDetail?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetail?.allTimeHigh?.price &&
        millify(coinDetail?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetail?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetail?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinDetail?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetail?.supply?.total && millify(coinDetail?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetail?.supply?.circulating &&
        millify(coinDetail?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinDetail?.name} ({coinDetail?.symbol}) price
        </Title>
        <p>
          {coinDetail?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      {/* <Select
        defaultValue="7d"
        className="select-timePeriod"
        placeholder="select time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time?.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select> */}
      {/* <LineChart
        coinHistory={coinDataHistory}
        currentPrice={coinDetail?.price}
        coinName={coinDetail?.name}
      /> */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coinDetail?.name} value Statistics
            </Title>
            <p>
              An overview showing the statistics of {coinDetail?.name}, such as
              the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="coin-value-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other value Statistics
            </Title>
            <p>An overview showing the statistics of all Statistics.</p>
          </Col>
          {genericStats?.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coinDetail?.name}?{" "}
            {HTMLReactParser(`${coinDetail.description}`)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coinDetail?.name} Links
          </Title>
          {coinDetail?.links?.map((link, i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="link-name">
                {link?.type}
              </Title>
              <a href={link?.url} target="_blank" rel="noreferrer">
                {link?.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
