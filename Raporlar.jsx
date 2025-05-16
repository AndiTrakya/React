import React, { useState, useEffect } from "react";
import { Table, Typography, Button, message } from "antd";

const { Title } = Typography;

export default function Raporlar() {
  const [satislar, setSatislar] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("satislar") || "[]");
    setSatislar(data);
  }, []);

  const columns = [
    {
      title: "İlaç Adı",
      dataIndex: "ilacAdi",
      key: "ilacAdi",
    },
    {
      title: "Miktar",
      dataIndex: "miktar",
      key: "miktar",
    },
    {
      title: "Birim Fiyat (₺)",
      dataIndex: "fiyat",
      key: "fiyat",
    },
    {
      title: "Toplam (₺)",
      dataIndex: "toplam",
      key: "toplam",
    },
    {
      title: "Tarih",
      dataIndex: "tarih",
      key: "tarih",
    },
  ];

  const handleEmail = () => {
    if (satislar.length === 0) {
      message.info("Gönderilecek rapor yok.");
      return;
    }
    alert("Rapor e-posta olarak gönderildi! (Simüle)");
  };

  return (
    <div>
      <Title level={4}>Satış Raporları</Title>
      <Button type="primary" onClick={handleEmail} style={{ marginBottom: 12 }}>
        Raporu E-posta ile Gönder
      </Button>
      <Table dataSource={satislar} columns={columns} rowKey="id" />
    </div>
  );
}
