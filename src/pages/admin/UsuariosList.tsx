import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { useGet } from "@/hooks/useGet";
import { IUser, IUserData } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";

const UsuariosList = () => {
  const { data, isLoading } = useGet<IUserData>({
    url: "/users",
    key: ["users"],
    enabled: true,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "admin",
      header: "Roles",
      cell: ({ row }) => (
        <Badge variant={row.original.admin ? "default" : "outline"}>
          {row.original.admin ? "Admin" : "User"}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.users ?? []}
        title="Usuarios"
        description="Lista de usuarios"
        filterColumn="email"
        filterPlaceholder="Buscar por email"
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsuariosList;
