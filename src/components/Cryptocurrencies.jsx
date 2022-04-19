import React, { useContext, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Row, Card, Col, Input } from "antd";

import { DataContext } from "./contexts/DataContextProvider";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { getCyptos, results, setResults } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState(results?.data?.data?.coins);

  useEffect(() => {
    getCyptos(`/coins?limit=${count}`);
  }, [count]);
  useEffect(() => {
    const filteredcrypto = results?.data?.data?.coins?.filter((coin) =>
      coin?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredcrypto);
  }, [results, searchTerm]);

  return (
    <>
      {count > 10 && (
        <div className="search-crypto">
          <Input
            placeholder="search cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin?.uuid}>
            <Link to={`/crypto/${coin?.uuid}`}>
              <Card
                title={`${coin?.rank} - ${coin?.name}`}
                extra={
                  <img
                    src={coin?.iconUrl}
                    alt={coin?.name}
                    className="crypto-image"
                  />
                }
                hoverable
              >
                <p>Price : {millify(coin?.price)}</p>
                <p>Market Cap : {millify(coin?.marketCap)}</p>
                <p>Daily Change : {millify(coin?.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
