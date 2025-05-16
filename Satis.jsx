import React, { useEffect, useState } from "react";
import { Form, Select, InputNumber, Button, Typography, Card, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;
const API_URL = "https://api.sheetbest.com/sheets/49ee24b6-6326-4c31-83a6-63090e8f4cde";

export default function Satis() {
  const [ilaclar, setIlaclar] = useState([]);
  const [selectedIlac, setSelectedIlac] = useState(null);
  const [miktar, setMiktar] = useState(1);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      const data = res.data.map((i) => ({
        name: i.name,
        price: Number(i.price),
        stock: Number(i.stock),
      }));
      setIlaclar(data);
    });
  }, []);

  const handleSatis = () => {
    if (!selectedIlac) {
      message.error("İlaç seçmelisiniz.");
      return;
    }
    if (miktar < 1 || miktar > selectedIlac.stock) {
      message.error("Geçersiz miktar.");
      return;
    }
    const yeniSatis = {
      id: Date.now().toString(),
      ilacAdi: selectedIlac.name,
      miktar,
      fiyat: selectedIlac.price,
      toplam: selectedIlac.price * miktar,
      tarih: dayjs().format("YYYY-MM-DD HH:mm"),
    };
    const eskiSatislar = JSON.parse(localStorage.getItem("satislar") || "[]");
    localStorage.setItem("satislar", JSON.stringify([yeniSatis, ...eskiSatislar]));
    message.success("Satış kaydedildi.");
    setSelectedIlac(null);
    setMiktar(1);
  };

  return (
    <Card>
      <Title level={4}>İlaç Satışı</Title>
      <Form layout="vertical">
        <Form.Item label="İlaç Seç">
          <Select
            placeholder="İlaç seçiniz"
            value={selectedIlac?.name || undefined}
            onChange={(val) => {
              const ilac = ilaclar.find((i) => i.name === val);
              setSelectedIlac(ilac || null);
              setMiktar(1);
            }}
          >
            {ilaclar.map((ilac) => (
              <Option key={ilac.name} value={ilac.name}>
                {ilac.name} (Stok: {ilac.stock})
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Miktar">
          <InputNumber
            min={1}
            max={selectedIlac?.stock || 1}
            value={miktar}
            onChange={(val) => setMiktar(val)}
            disabled={!selectedIlac}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSatis} disabled={!selectedIlac}>
            Satış Yap
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
