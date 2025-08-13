// src/components/admin/SalesDashboard.jsx
import React, { useState, useMemo } from "react";
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
    ResponsiveContainer
} from "recharts";
import { format, parseISO, isSameDay, startOfWeek, startOfMonth } from "date-fns";

// ======= 목업 데이터 =======
const mockData = [
    { date: "2025-08-01", category: "전자제품", amount: 120000 },
    { date: "2025-08-01", category: "패션", amount: 80000 },
    { date: "2025-08-02", category: "전자제품", amount: 50000 },
    { date: "2025-08-02", category: "식품", amount: 60000 },
    { date: "2025-08-05", category: "패션", amount: 200000 },
    { date: "2025-08-08", category: "식품", amount: 150000 },
    { date: "2025-08-09", category: "전자제품", amount: 180000 },
    { date: "2025-08-09", category: "패션", amount: 70000 },
];

export default function SalesDashboard() {
    const [period, setPeriod] = useState("day"); // day | week | month
    const [selectedDate, setSelectedDate] = useState("2025-08-01");

    // ======= 필터링된 데이터 계산 =======
    const filteredData = useMemo(() => {
        const baseDate = parseISO(selectedDate);

        if (period === "day") {
            return mockData.filter(item => isSameDay(parseISO(item.date), baseDate));
        }
        if (period === "week") {
            const startWeek = startOfWeek(baseDate, { weekStartsOn: 1 });
            return mockData.filter(item => {
                const itemDate = parseISO(item.date);
                return itemDate >= startWeek && itemDate < new Date(startWeek.getTime() + 7 * 86400000);
            });
        }
        if (period === "month") {
            const startMonth = startOfMonth(baseDate);
            return mockData.filter(item => {
                const itemDate = parseISO(item.date);
                return (
                    itemDate.getFullYear() === startMonth.getFullYear() &&
                    itemDate.getMonth() === startMonth.getMonth()
                );
            });
        }
        return [];
    }, [period, selectedDate]);

    // ======= 일별/주별/월별 차트 데이터 변환 =======
    const salesByDate = useMemo(() => {
        const grouped = {};
        filteredData.forEach(item => {
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
        filteredData.forEach(item => {
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
    const topDay = salesByDate.reduce((max, cur) => (cur.total > max.total ? cur : max), { total: 0 });
    const topCategory = salesByCategory.reduce((max, cur) => (cur.total > max.total ? cur : max), { total: 0 });

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            {/* ======= 미니 카드 ======= */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <MiniCard title="총 매출" value={`${totalSales.toLocaleString()} 원`} />
                <MiniCard title="최고 매출일" value={topDay.date || "-"} />
                <MiniCard title="카테고리 TOP1" value={topCategory.category || "-"} />
            </div>

            {/* ======= 필터 ======= */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* 매출 추이 차트 */}
                <div style={{ height: "300px", border: "1px solid #ddd", padding: "10px" }}>
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
                <div style={{ height: "300px", border: "1px solid #ddd", padding: "10px" }}>
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
