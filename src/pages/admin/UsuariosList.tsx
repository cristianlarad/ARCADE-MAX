import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import ExportUsers from "@/components/ui/exportUsers";
import BannerUser from "@/components/users/BannerUser";
import { useGet } from "@/hooks/useGet";
import { IUser, IUserData } from "@/types/auth";
import FormattedDate from "@/utils/FormatDate";
import { ColumnDef, Table } from "@tanstack/react-table";

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
    {
      accessorKey: "last_login",
      header: "Ultimo Login",
      cell: ({ row }) =>
        row.original.last_login.toString() == "0001-01-01T00:00:00Z" ? (
          "No ha hecho login"
        ) : (
          <FormattedDate dateString={row.original.last_login} />
        ),
    },
    {
      accessorKey: "login_count",
      header: "Cant. de Logins",
      cell: ({ row }) => row.original.login_count,
    },
    {
      accessorKey: "banned",
      header: "Baneado",
      cell: ({ row }) => (
        <Badge variant={row.original.banned ? "destructive" : "outline"}>
          {row.original.banned ? "Baneado" : "No baneado"}
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
        children={(table: Table<IUser>) => {
          const selectedRows = table.getSelectedRowModel().rows;
          return selectedRows.length > 0 ? (
            <BannerUser userIds={selectedRows.map((row) => row.original.id)} />
          ) : null;
        }}
        childrenRight={<ExportUsers />}
      />
    </div>
  );
};

export default UsuariosList;
