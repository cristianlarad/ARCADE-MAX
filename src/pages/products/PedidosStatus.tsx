"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/EmpryState";
import { ErrorState } from "@/components/ErrorState";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import LoadingState from "@/components/ui/LoadinState";
import { useGet } from "@/hooks/useGet";
import { StatusPEdidosItems, StatusPEdidosType } from "@/types/pedidos";
import { ItemList } from "./itemList";
import { StatusBadge } from "@/components/statusBadge";
import {
  Package,
  Search,
  ShoppingBag,
  User,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Filter,
  RefreshCw,
  Download,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash,
} from "lucide-react";
import FormattedDate from "@/utils/FormatDate";
import { Label } from "@/components/ui/label";

// Función para formatear fecha (simulada)

// Función para formatear el número de pedido

const PedidosStatus = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  const { data, isLoading, error, refetch } = useGet<StatusPEdidosType>({
    url: "/pedidos",
    key: ["pedidos"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const toggleOrderExpanded = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Filtrar pedidos según la pestaña activa y término de búsqueda
  const filteredOrders = useMemo(() => {
    if (!data?.pedidos) return [];

    return data.pedidos.filter((pedido) => {
      // Filtrar por estado
      if (activeTab !== "all" && pedido.status.toString() !== activeTab) {
        return false;
      }

      // Filtrar por término de búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          pedido.email.toLowerCase().includes(searchLower) ||
          pedido.items.some((item) =>
            item.nombre.toLowerCase().includes(searchLower)
          )
        );
      }

      return true;
    });
  }, [data, activeTab, searchTerm]);

  // Calcular totales para el resumen
  const orderSummary = useMemo(() => {
    if (!data?.pedidos)
      return {
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        cancelled: 0,
      };

    return {
      total: data.pedidos.length,
      pending: data.pedidos.filter((p) => p.status === 1).length,
      processing: data.pedidos.filter((p) => p.status === 2).length,
      completed: data.pedidos.filter((p) => p.status === 3).length,
      cancelled: data.pedidos.filter((p) => p.status === 4).length,
    };
  }, [data]);

  const calculateOrderTotal = (items: StatusPEdidosItems[]) => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  if (isLoading) return <LoadingState title="Cargando Pedidos" />;
  if (error)
    return (
      <ErrorState message={error.message || "Error al cargar los Pedidos"} />
    );

  return (
    <div className="space-y-6">
      {/* Cabecera con título y resumen */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Gestión de Pedidos
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualiza y gestiona todos tus pedidos en un solo lugar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Pedidos</p>
              <p className="text-2xl font-bold">{orderSummary.total}</p>
            </div>
            <Package className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold">{orderSummary.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-accent opacity-80" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">En Proceso</p>
              <p className="text-2xl font-bold">{orderSummary.processing}</p>
            </div>
            <Truck className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Completados</p>
              <p className="text-2xl font-bold">{orderSummary.completed}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))] opacity-80" />
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Cancelados</p>
              <p className="text-2xl font-bold">{orderSummary.cancelled}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-destructive opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email, número de pedido o producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Filtrar:
          </span>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-5 sm:flex">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              Todos
            </TabsTrigger>
            <TabsTrigger value="1" className="text-xs sm:text-sm">
              Pendientes
            </TabsTrigger>
            <TabsTrigger value="2" className="text-xs sm:text-sm">
              En Proceso
            </TabsTrigger>
            <TabsTrigger value="3" className="text-xs sm:text-sm">
              Completados
            </TabsTrigger>
            <TabsTrigger value="4" className="text-xs sm:text-sm">
              Cancelados
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Lista de pedidos */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((pedido) => (
              <motion.div
                key={pedido.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="overflow-hidden border-l-4"
                  style={{
                    borderLeftColor:
                      pedido.status === 0
                        ? "hsl(var(--accent))"
                        : pedido.status === 1
                        ? "hsl(var(--primary))"
                        : pedido.status === 2
                        ? "hsl(var(--success))"
                        : "hsl(var(--destructive))",
                  }}
                >
                  <CardHeader className="p-4 pb-0">
                    <FormattedDate dateString={pedido.createdAt} />
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2"></div>
                      <StatusBadge status={pedido.status} />
                    </div>

                    <CardDescription className="mt-2 flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{pedido.email}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {pedido.items.length}{" "}
                          {pedido.items.length === 1 ? "producto" : "productos"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {pedido.items[0]?.paymentMethod || "Tarjeta"}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium">Total:</span>
                        <span className="text-lg font-bold text-primary">
                          ${calculateOrderTotal(pedido.items).toFixed(2)}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOrderExpanded(pedido.id)}
                        className="gap-1"
                      >
                        {expandedOrders[pedido.id] ? (
                          <>
                            <span>Ocultar detalles</span>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>Ver detalles</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedOrders[pedido.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <Separator className="my-4" />

                          <div className="space-y-4">
                            {pedido.items.map((item) => (
                              <ItemList key={item._id} item={item} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    {pedido.status === 1 && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Cancelar
                      </Button>
                    )}

                    {pedido.status === 4 && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Trash className="h-4 w-4" />
                        Eliminar
                      </Button>
                    )}

                    {pedido.status === 3 && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Trash className="h-4 w-4" />
                        Eliminar
                      </Button>
                    )}

                    <Button
                      variant={pedido.status === 2 ? "outline" : "default"}
                      size="sm"
                      className="gap-1"
                    >
                      {pedido.status === 2 ? (
                        <>
                          <Download className="h-4 w-4" />
                          Factura
                        </>
                      ) : (
                        <>
                          <Truck className="h-4 w-4" />
                          Seguimiento
                        </>
                      )}
                    </Button>
                  </CardFooter>
                  <Label className="mt-2 mx-5">
                    {pedido.aviso && (
                      <span className="text-muted-foreground">
                        {pedido.aviso}
                      </span>
                    )}
                  </Label>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState
          description="Parece que no tienes ningún pedido que coincida con los filtros. ¡Es un buen momento para crear uno nuevo!"
          title="No se encontraron pedidos"
        />
      )}
    </div>
  );
};

export default PedidosStatus;
