import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  format,
  parseISO,
  isSameDay,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { getSalesByDateCategory } from "../../api/purchaseApi";

export default function SalesDashboard() {
  const [period, setPeriod] = useState("day"); // day | week | month
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fromDate = selectedDate;
        let toDate = selectedDate;

        const baseDate = new Date(selectedDate);

        if (period === "week") {
          // 월요일 시작
          const day = baseDate.getDay(); // 0(일)~6(토)
          const diffToMonday = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 나머지 월~토 계산
          const monday = new Date(baseDate);
          monday.setDate(baseDate.getDate() + diffToMonday);
          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);

          fromDate = monday.toISOString().slice(0, 10);
          toDate = sunday.toISOString().slice(0, 10);
        }

        if (period === "month") {
          const firstDay = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            1
          );
          const lastDay = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
          );

          fromDate = firstDay.toISOString().slice(0, 10);
          toDate = lastDay.toISOString().slice(0, 10);
        }

        const res = await getSalesByDateCategory(fromDate, toDate);
        setData(res);
        console.log("응답 데이터:", res);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [selectedDate, period]);

  // ======= 필터링된 데이터 계산 =======
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const baseDate = parseISO(selectedDate); // selectedDate: "YYYY-MM-DD"

    if (period === "day") {
      return data.filter((item) => {
        const itemDate = parseISO(item.date);
        return isSameDay(itemDate, baseDate);
      });
    }

    if (period === "week") {
      const startWeek = startOfWeek(baseDate, { weekStartsOn: 1 }); // 월요일 시작
      const endWeek = new Date(startWeek);
      endWeek.setDate(startWeek.getDate() + 6); // 일요일까지
      return data.filter((item) => {
        const itemDate = parseISO(item.date);
        return itemDate >= startWeek && itemDate <= endWeek;
      });
    }

    if (period === "month") {
      const startMonth = startOfMonth(baseDate);
      const endMonth = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + 1,
        0
      ); // 해당 달 마지막 날
      return data.filter((item) => {
        const itemDate = parseISO(item.date);
        return itemDate >= startMonth && itemDate <= endMonth;
      });
    }

    return [];
  }, [period, selectedDate, data]);

  // ======= 일별/주별/월별 차트 데이터 변환 =======
  const salesByDate = useMemo(() => {
    const grouped = {};
    filteredData.forEach((item) => {
      if (!grouped[item.date]) grouped[item.date] = 0;
      grouped[item.date] += item.amount;
    });
    return Object.entries(grouped).map(([date, total]) => ({
      date,
      total,
    }));
  }, [filteredData]);

  const salesByCategory = useMemo(() => {
    const grouped = {};
    filteredData.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = 0;
      grouped[item.category] += item.amount;
    });
    return Object.entries(grouped).map(([category, total]) => ({
      category,
      total,
    }));
  }, [filteredData]);

  // ======= 미니 통계 =======
  const totalSales = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const topDay = salesByDate.reduce(
    (max, cur) => (cur.total > max.total ? cur : max),
    { total: 0 }
  );
  const topCategory = salesByCategory.reduce(
    (max, cur) => (cur.total > max.total ? cur : max),
    { total: 0 }
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* ======= 미니 카드 ======= */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <MiniCard title="총 매출" value={`${totalSales.toLocaleString()} 원`} />
        <MiniCard title="최고 매출일" value={topDay.date || "-"} />
        <MiniCard title="카테고리 TOP1" value={topCategory.category || "-"} />
      </div>

      {/* ======= 필터 ======= */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="day">일별</option>
          <option value="week">주별</option>
          <option value="month">월별</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* ======= 차트 영역 ======= */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {/* 매출 추이 차트 */}
        <div
          style={{ height: "300px", border: "1px solid #ddd", padding: "10px" }}
        >
          <h3>매출 추이</h3>
          <ResponsiveContainer>
            <LineChart data={salesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 카테고리별 매출 차트 */}
        <div
          style={{ height: "300px", border: "1px solid #ddd", padding: "10px" }}
        >
          <h3>카테고리별 매출</h3>
          <ResponsiveContainer>
            <BarChart data={salesByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: 0 }}>{title}</h4>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
