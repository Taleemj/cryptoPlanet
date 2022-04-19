import React, { useEffect, useContext, useState } from "react";
import { Select, Typography, Card, Row, Col, Avatar, Input } from "antd";
import moment from "moment";

import { DataContext } from "./contexts/DataContextProvider";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("crypto");
  const count = simplified ? 6 : 100;
  const { getNews, news, getCyptos, results } = useContext(DataContext);

  useEffect(() => {
    getCyptos("/coins?limit=100");
  }, []);

  useEffect(() => {
    getNews(count, newsCategory);
  }, [newsCategory]);

  return (
    <>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a cryptocurrency"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="cryptocurrencies">cryptocurrencies</Option>
            {results?.data?.data?.coins?.map((coin, i) => (
              <Option key={i} value={coin?.name}>
                {coin?.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {news?.value?.map((n, i) => (
          <Col xs={24} sm={12} lg={12} key={i}>
            <Card className="news-card" hoverable>
              <a href={n?.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {n?.name}
                  </Title>
                  <img
                    style={{ maxWidth: "150px", maxHeight: "100px" }}
                    src={
                      n?.image?.thumbnail?.contentUrl ||
                      "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"
                    }
                    alt=""
                  />
                </div>
                <p>
                  {n?.description > 100
                    ? `${n?.description.substring(0, 100)}...`
                    : n?.description}
                </p>
                <div className="provider-container">
                  <Avatar
                    src={n?.provider[0]?.image?.thumbnail?.contentUrl}
                    alt=""
                  />
                  <Text className="provider-name">{n?.provider[0]?.name}</Text>
                </div>
                <Text>{moment(n.datePublished).startOf("ss").fromNow()}</Text>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
