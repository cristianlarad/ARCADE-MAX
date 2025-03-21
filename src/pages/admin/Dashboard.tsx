import DashboardChart from "@/components/dashBoardChart";
import { useGet } from "@/hooks/useGet";
import { DailsSalesProps } from "@/types/PedidosAll";
import React from "react";
import LoadingState from "@/components/ui/LoadinState";
import { ErrorState } from "@/components/ErrorState";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useGet<DailsSalesProps>({
    url: `/pedidos/all`,
    key: ["projects"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingState title="Estamos Cargando Los Datos" />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6 p-6">
      {data?.dailySales && <DashboardChart dailySales={data?.dailySales} />}
    </div>
  );
};

export default Dashboard;
