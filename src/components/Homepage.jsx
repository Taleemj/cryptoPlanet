import React, { useContext, useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { DataContext } from "./contexts/DataContextProvider";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const { Title } = Typography;

const Homepage = () => {
  const { getCyptos, results } = useContext(DataContext);

  useEffect(() => {
    getCyptos("/coins");
  }, []);

  const cryptoData = results?.data?.data?.stats;
  // if (loading) return "loading...";

  return (
    <>
      <Title level={2} className="heading">
        Global crypto stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total crptocurrencies" value={cryptoData?.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total exchanges"
            value={cryptoData?.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total marketcap"
            value={cryptoData?.totalMarketCap}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={cryptoData?.total24hVolume}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total markets" value={cryptoData?.totalMarkets} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 crypto Crptocurrencies in the world
        </Title>
        <Title level={2} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest crpto news
        </Title>
        <Title level={2} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
