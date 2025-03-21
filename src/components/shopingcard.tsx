"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCartIcon as IconCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ArrowLeft,
  Package,
  X,
  ShoppingBag,
  Truck,
  Shield,
  Clock,
  Gift,
  ChevronRight,
  CreditCardIcon as CardIcon,
  Banknote,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { AnimatedDeleteButton } from "./ui/DeleteButton";
import type {
  LaptopsResponse,
  LaptopsType,
  LaptopsTypeData,
} from "@/types/laptops";
import { useCartStore } from "@/hooks/useStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePost } from "@/hooks/usePost";
import toast from "react-hot-toast";
import { Input } from "./ui/input";

interface CartItem extends LaptopsType {
  quantity: number;
}

interface ShoppingCartProps {
  onCheckout: () => void;
}

export function ShoppingCart({ onCheckout }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [showCheckoutAnimation, setShowCheckoutAnimation] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  // Calcular totales cuando cambian los items
  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => {
      const price = Number.parseFloat(item.precio.replace(/[^\d.-]/g, ""));
      return sum + price * item.quantity;
    }, 0);

    const calculatedTax = calculatedSubtotal * 0.16; // 16% de impuesto
    const calculatedShipping = calculatedSubtotal > 100 ? 0 : 9.99; // Envío gratis para compras mayores a $100
    const calculatedDiscount =
      calculatedSubtotal > 200 ? calculatedSubtotal * 0.05 : 0; // 5% de descuento para compras mayores a $200
    const calculatedTotal =
      calculatedSubtotal +
      calculatedTax +
      calculatedShipping -
      calculatedDiscount;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setDiscount(calculatedDiscount);
    setTotal(calculatedTotal);
  }, [items]);

  // Prepare the data for the POST request
  const orderData: LaptopsTypeData[] = items.map((item) => ({
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.quantity,
    tipo: item.tipo,
    total: item.quantity * Number.parseFloat(item.precio.replace(/[\D.]/g, "")),
    paymentMethod: paymentMethod,
    descuento: discount,
    direccion: direccion,
  }));

  console.log(orderData);

  // Use the usePost hook to send the data
  const { mutate } = usePost<LaptopsResponse, LaptopsTypeData[]>({
    url: "/pedidos",
    onSuccess: (data) => {
      toast.success(data.message || "Pedido creado exitosamente");
      clearCart();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error al crear el pedido");
    },
  });

  // Call the mutate function to send the order data
  const handleCheckout = () => {
    if (direccion === "") {
      return toast.error("La direccion es requerida");
    } else mutate(orderData);

    onCheckout();
    setShowCheckoutAnimation(true);
    setTimeout(() => {
      setShowCheckoutAnimation(false);
      setIsOpen(false);
    }, 2000);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-primary hover:bg-primary/90 text-primary-foreground border-primary hover:border-primary/90"
        >
          <IconCart className="h-5 w-5" />
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            >
              {totalItems}
            </motion.div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 h-full">
        <SheetHeader className="p-4 pb-0 border-b">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Mi Carrito
            <Badge
              variant="outline"
              className="ml-auto bg-primary/10 text-primary border-primary/20"
            >
              {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {showCheckoutAnimation ? (
            <motion.div
              className="flex-1 flex flex-col items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 1],
                  opacity: 1,
                }}
                transition={{ duration: 0.5 }}
                className="relative mb-4"
              >
                <div className="text-primary text-6xl">
                  <CreditCard />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  style={{ filter: "blur(10px)" }}
                />
              </motion.div>
              <motion.p
                className="text-xl font-medium text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Procesando su pago...
              </motion.p>
              <motion.p
                className="text-sm text-muted-foreground text-center mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Por favor no cierre esta ventana
              </motion.p>

              {/* Partículas decorativas */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`checkout-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-primary"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    left: "50%",
                    top: "40%",
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: 1,
                    repeatType: "mirror",
                  }}
                />
              ))}
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div
              className="flex-1 flex flex-col items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 1,
                  rotate: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 5,
                  },
                }}
                className="relative mb-4"
              >
                <div className="text-muted-foreground text-6xl">
                  <Package />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  style={{ filter: "blur(10px)" }}
                />
              </motion.div>
              <motion.p
                className="text-xl font-medium text-center mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Tu carrito está vacío
              </motion.p>
              <motion.p
                className="text-muted-foreground text-center mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Añade algunos productos para comenzar
              </motion.p>
              <SheetClose asChild>
                <Button className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continuar comprando
                </Button>
              </SheetClose>
            </motion.div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-primary/10">
                <div className="flex items-center text-sm text-primary">
                  <Truck className="h-4 w-4 mr-1.5" />
                  <span>Envío gratis en pedidos mayores a $100</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 h-7 px-2"
                  onClick={clearCart}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Vaciar
                </Button>
              </div>

              {/* Contenido principal con scroll */}
              <ScrollArea className="flex-1 max-h-[80%]">
                <div className="space-y-3 p-4">
                  <AnimatePresence initial={false}>
                    <div className="space-y-2">
                      <Label>Direccion</Label>
                      <Input
                        className=" "
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                      />
                    </div>
                    {items.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Sección de resumen y pago */}
                  <div className="pt-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mb-4"
                    >
                      <AccordionItem value="payment" className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm font-medium">
                          Método de pago
                        </AccordionTrigger>
                        <AccordionContent className="pt-1">
                          <RadioGroup
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" />
                              <Label
                                htmlFor="card"
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <CardIcon className="h-4 w-4 text-primary" />
                                Tarjeta de crédito/débito
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label
                                htmlFor="cash"
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <Banknote className="h-4 w-4 text-green-500 dark:text-green-400" />
                                Pago en efectivo
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="transfer" id="transfer" />
                              <Label
                                htmlFor="transfer"
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <Landmark className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                Transferencia bancaria
                              </Label>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="space-y-2 mb-4 bg-card p-3 rounded-md border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Impuestos (16%)
                        </span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envío</span>
                        {shipping === 0 ? (
                          <span className="text-green-600 dark:text-green-400">
                            Gratis
                          </span>
                        ) : (
                          <span>${shipping.toFixed(2)}</span>
                        )}
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 dark:text-green-400">
                            Descuento (5%)
                          </span>
                          <span className="text-green-600 dark:text-green-400">
                            -${discount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <motion.span
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: 1,
                            repeatDelay: 5,
                          }}
                          className="text-lg text-primary"
                        >
                          ${total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                        <Shield className="h-4 w-4 flex-shrink-0" />
                        <span>
                          Compra protegida, garantía de devolución de 30 días
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 p-2 rounded-md">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>Entrega estimada: 1-3 días hábiles</span>
                      </div>
                      {discount === 0 && subtotal > 0 && subtotal < 200 && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                          <Gift className="h-4 w-4 flex-shrink-0" />
                          <span>
                            ¡Añade ${(200 - subtotal).toFixed(2)} más para
                            obtener un 5% de descuento!
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full gap-2"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="h-4 w-4" />
                      Hacer Pedido
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleIncrement = () => {
    onUpdateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item._id, item.quantity - 1);
    }
  };

  const itemTotal =
    Number.parseFloat(item.precio.replace(/[^\d.-]/g, "")) * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-md border p-3",
        "bg-card",
        isHovered ? "shadow-md border-primary/30" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3">
        {/* Imagen simulada */}
        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-muted-foreground">
            {item.nombre.split(" ")[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm line-clamp-1">{item.nombre}</h3>
            <AnimatedDeleteButton
              variant="ghost"
              size="sm"
              onDelete={() => onRemoveItem(item._id)}
              confirmText=""
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive px-8"
            >
              <X className="h-3 w-3" />
            </AnimatedDeleteButton>
          </div>

          <div className="text-xs text-muted-foreground mt-0.5 space-y-0.5">
            <p className="line-clamp-1">{item.procesador}</p>
            <p className="line-clamp-1">
              {item.memoria_RAM} / {item.almacenamiento}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none rounded-l-md"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="w-8 text-center text-sm">{item.quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-none rounded-r-md"
                onClick={handleIncrement}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <motion.div
              className="font-medium text-sm"
              animate={{
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? "var(--primary)" : "var(--foreground)",
              }}
              transition={{ duration: 0.2 }}
            >
              ${itemTotal.toFixed(2)}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ShoppingCart;
