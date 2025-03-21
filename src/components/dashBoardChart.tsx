"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  BarChart3Icon,
  LineChartIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface SalesData {
  date: string;
  total: number;
}

interface DashboardProps {
  dailySales: SalesData[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-medium text-sm">
          {format(parseISO(label), "d 'de' MMMM, yyyy", { locale: es })}
        </p>
        <p className="text-primary font-bold">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardChart: React.FC<DashboardProps> = ({ dailySales }) => {
  // Prepare chart data
  const chartData = useMemo(() => {
    if (dailySales.length === 0) return [];
    return dailySales.map((sale) => ({
      ...sale,
      date: sale.date,
    }));
  }, [dailySales]);

  // Calculate summary metrics
  const totalSales = useMemo(
    () => chartData.reduce((sum, item) => sum + item.total, 0),
    [chartData]
  );

  const averageSale = useMemo(
    () => (chartData.length > 0 ? totalSales / chartData.length : 0),
    [totalSales, chartData]
  );

  const highestSale = useMemo(
    () => Math.max(...chartData.map((item) => item.total), 0),
    [chartData]
  );

  // Calculate growth (comparing last day to first day)
  const growth = useMemo(() => {
    if (chartData.length < 2) return 0;
    const firstDay = chartData[0].total;
    const lastDay = chartData[chartData.length - 1].total;
    return ((lastDay - firstDay) / firstDay) * 100;
  }, [chartData]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="p-4 md:p-6 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ventas Totales</CardDescription>
              <CardTitle className="text-2xl">
                {formatCurrency(totalSales)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                {growth >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={growth >= 0 ? "text-green-500" : "text-red-500"}
                >
                  {growth.toFixed(1)}%
                </span>
                <span className="text-muted-foreground ml-1">
                  vs período anterior
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Venta Promedio</CardDescription>
              <CardTitle className="text-2xl">
                {formatCurrency(averageSale)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                <span>Por día en el período</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Venta Más Alta</CardDescription>
              <CardTitle className="text-2xl">
                {formatCurrency(highestSale)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                <span>Mejor día del período</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
            <CardDescription>
              Visualización de ventas diarias en el período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="area">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="area">
                    <LineChartIcon className="h-4 w-4 mr-1" />
                    Área
                  </TabsTrigger>
                  <TabsTrigger value="bar">
                    <BarChart3Icon className="h-4 w-4 mr-1" />
                    Barras
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="h-[300px]">
                <TabsContent value="area" className="h-full mt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(50 100% 50%)"
                        tick={{
                          fill: "hsl(50 100% 50%)",
                          fontSize: 12,
                        }}
                      />
                      <YAxis
                        stroke="hsl(50 100% 50%)"
                        tick={{
                          fill: "hsl(50 100% 50%)",
                          fontSize: 12,
                        }}
                        tickFormatter={(tick) => formatCurrency(tick)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="hsl(50 100% 50%)" // Amarillo brillante
                        fill="hsl(50 100% 50%)" // Mismo tono de amarillo
                        fillOpacity={0.2} // Transparencia suave
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="bar" className="h-full mt-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(tick) =>
                          format(parseISO(tick), "dd MMM", { locale: es })
                        }
                      />
                      <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sales Details Table */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Detalle de Ventas Diarias</CardTitle>
            <CardDescription>
              Registro detallado de ventas por día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Fecha</th>
                    <th className="py-3 px-4 text-right font-medium">
                      Total Ventas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((day) => (
                    <tr key={day.date} className="border-b">
                      <td className="py-3 px-4 font-medium">
                        {format(parseISO(day.date), "d 'de' MMMM, yyyy", {
                          locale: es,
                        })}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(day.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardChart;
