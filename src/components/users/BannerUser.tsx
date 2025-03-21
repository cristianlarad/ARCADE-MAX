"use client";

import { useState } from "react";
import { usePost } from "@/hooks/usePost";
import type { APIError } from "@/types/api";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Ban, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BannerUserProps {
  userIds: string[];
}

const BannerUser = ({ userIds }: BannerUserProps) => {
  const [open, setOpen] = useState(false);

  const { mutate } = usePost<BannerUserProps, BannerUserProps>({
    url: "/users/banner",
    onSuccess: () => {
      toast.success("Usuarios actualizados exitosamente");
      setOpen(false);
    },
    onError: (error: APIError) => {
      toast.error(error.message || "Error al actualizar los usuarios");
    },
    invalidateQueries: ["users"],
  });

  const onSubmit = (data: BannerUserProps) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={userIds.length === 0}
            variant="destructive"
            className="w-full sm:w-auto gap-2 transition-all hover:scale-105"
          >
            <Ban className="h-4 w-4" />
            Banear {userIds.length} usuario{userIds.length !== 1 ? "s" : ""}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Confirmar acción de baneo
            </DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea banear a {userIds.length} usuario
              {userIds.length !== 1 ? "s" : ""}? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => onSubmit({ userIds })}
              className="gap-2"
            >
              <Ban className="h-4 w-4" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BannerUser;
