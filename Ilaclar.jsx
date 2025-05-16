import React, { useEffect, useState } from 'react';
import { Card, Col, Row, List, Button, Space, Spin } from 'antd';

const API_URL = 'https://api.sheetbest.com/sheets/49ee24b6-6326-4c31-83a6-63090e8f4cde';

const Ilaclar = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Veri alınamadı:', error);
        setLoading(false);
      });
  }, []);

  const getImagePath = (name) => {
    const imageMap = {
      'Vitamin C': 'images/vitaminc.png',
      'Aspirin': 'images/aspirin.png',
      'Aloe Vera Jeli': 'images/aloevera.png',
      'Bebek Yağı': 'images/babyoil.png',
      'Bebek Bezi': 'images/diapers.png',
      'Omega-3 Balık Yağı': 'images/fishoil.png',
      'Ibuprofen': 'images/ibuprofen.png',
      'Parol': 'images/parol.png',
      'Vitamin B12': 'images/vitaminb12.png',
    };
    return imageMap[name] || 'images/default.png';
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>İlaç Listesi</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Space>
          <Button type={layout === 'grid' ? 'primary' : 'default'} onClick={() => setLayout('grid')}>
            Grid Görünümü
          </Button>
          <Button type={layout === 'list' ? 'primary' : 'default'} onClick={() => setLayout('list')}>
            Liste Görünümü
          </Button>
        </Space>
      </div>

      {layout === 'grid' ? (
        <Row gutter={[16, 16]}>
          {products.map((product, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={getImagePath(product.name)}
                    style={{ height: '200px', objectFit: 'contain', padding: '16px' }}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <p>Fiyat: ₺{product.price}</p>
                      <p>Stok: {product.stock}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <img
                    alt={product.name}
                    src={getImagePath(product.name)}
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  />
                }
                title={product.name}
                description={
                  <>
                    <p>Fiyat: ₺{product.price}</p>
                    <p>Stok: {product.stock}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Ilaclar;
