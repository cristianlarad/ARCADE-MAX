import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Monitor,
  Headphones,
  Camera,
  Watch,
  Tablet,
  Speaker,
  Cpu,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import LG from "@/components/icons/lg.ico";
import microsoft from "@/components/icons/microsoft.ico";
import apple from "@/components/icons/Apple.ico";
import samsung from "@/components/icons/samsung.ico";
import dell from "@/components/icons/dell.ico";
import hp from "@/components/icons/hp.png";
import lenovo from "@/components/icons/lenovo.ico";
import asus from "@/components/icons/asus.png";
import acer from "@/components/icons/acer.ico";
import sony from "@/components/icons/sony.png";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
      title: "",
      subtitle: "Descubre lo último en innovación tecnológica",
      cta: "Explorar ahora",
      color: "from-primary/20 to-transparent",
      image: "",
    },
    {
      title: "",
      subtitle: "Hasta 30% de descuento en productos seleccionados",
      cta: "Ver ofertas",
      color: "from-accent/20 to-transparent",
      image: "",
    },
    {
      title: "",
      subtitle: "Recibe tus productos en tiempo récord",
      cta: "Saber más",
      color: "from-[hsl(var(--success))]/20 to-transparent",
      image: "",
    },
  ];

  // Cambiar banner automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Categorías principales
  const categories = [
    { name: "Laptops", icon: Laptop, color: "bg-primary/10 text-primary" },
    {
      name: "Smartphones",
      icon: Smartphone,
      color: "bg-accent/10 text-accent",
    },
    {
      name: "Monitores",
      icon: Monitor,
      color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    },
    {
      name: "Auriculares",
      icon: Headphones,
      color: "bg-secondary/10 text-secondary",
    },
    {
      name: "Cámaras",
      icon: Camera,
      color: "bg-destructive/10 text-destructive",
    },
    { name: "Smartwatches", icon: Watch, color: "bg-primary/10 text-primary" },
    { name: "Tablets", icon: Tablet, color: "bg-accent/10 text-accent" },
    {
      name: "Altavoces",
      icon: Speaker,
      color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
    },
  ];

  // Ventajas de la tienda
  const benefits = [
    {
      title: "Garantía Extendida",
      description:
        "Todos nuestros productos incluyen garantía extendida sin costo adicional",
      icon: ShieldCheck,
      color: "text-primary",
    },
    {
      title: "Envío Gratuito",
      description: "En pedidos superiores a $50 a cualquier parte del país",
      icon: Truck,
      color: "text-accent",
    },
    {
      title: "Pago Seguro",
      description: "Múltiples métodos de pago con la mayor seguridad",
      icon: CreditCard,
      color: "text-[hsl(var(--success))]",
    },
    {
      title: "Devoluciones Sencillas",
      description: "30 días para devoluciones sin preguntas",
      icon: RotateCcw,
      color: "text-secondary",
    },
  ];

  // Marcas destacadas
  const brands = [
    {
      name: "Apple",
      icon: <img src={apple} className="rounded-full" alt="Apple" />,
    },
    {
      name: "Samsung",
      icon: <img src={samsung} className="rounded-full" alt="Samsung" />,
    },
    {
      name: "Dell",
      icon: <img src={dell} className="rounded-full" alt="Dell" />,
    },
    { name: "HP", icon: <img src={hp} className="rounded-full" alt="HP" /> },
    {
      name: "Lenovo",
      icon: <img src={lenovo} className="rounded-full" alt="Lenovo" />,
    },
    {
      name: "Asus",
      icon: <img src={asus} className="rounded-full" alt="Asus" />,
    },
    {
      name: "Acer",
      icon: <img src={acer} className="rounded-full" alt="Acer" />,
    },
    {
      name: "Sony",
      icon: <img src={sony} className="rounded-full" alt="Sony" />,
    },
    { name: "LG", icon: <img src={LG} alt="LG" /> },
    {
      name: "Microsoft",
      icon: <img src={microsoft} className="rounded-full" alt="Microsoft" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section con Banners Animados */}
      <section className="relative h-[400px] md:h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30 z-10" />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${banners[currentBanner].color} z-10`}
            />
            <img
              src={banners[currentBanner].image || "/placeholder.svg"}
              alt={banners[currentBanner].title}
              className="object-cover"
            />
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  Nuevo
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
                  {banners[currentBanner].title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl">
                  {banners[currentBanner].subtitle}
                </p>
                <Button size="lg" className="gap-2 group">
                  {banners[currentBanner].cta}
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de banner */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentBanner === index ? "bg-primary w-6" : "bg-primary/30"
              }`}
              aria-label={`Ver banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categorías Principales */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explora Nuestras Categorías
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Encuentra los mejores productos tecnológicos organizados por
              categorías
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to="#" className="block">
                  <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary text-primary-foreground">
                Oferta Especial
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tecnología de Última Generación a Tu Alcance
              </h2>
              <p className="text-muted-foreground mb-6">
                Descubre nuestra selección de productos premium con los mejores
                precios del mercado. Innovación y calidad garantizada.
              </p>
              <Button size="lg" className="gap-2 group">
                Descubrir Ofertas
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="h-24 w-24 text-primary/40" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Ventajas */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Por Qué Elegirnos
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="h-full border-t-4"
                  style={{
                    borderTopColor: `hsl(var(--${
                      benefit.color.split("-")[1]
                    }))`,
                  }}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-card flex items-center justify-center mb-4 ${benefit.color}`}
                    >
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Marcas Destacadas
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm mb-2">
                  {brand.icon} {/* Renderiza el ícono aquí */}
                </div>
                <p className="text-sm font-medium">{brand.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 md:px-10 lg:px-20 bg-primary/10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary text-primary-foreground">
              ¿Listo para comenzar?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Descubre la Mejor Tecnología para Tu Vida Diaria
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Explora nuestra amplia selección de productos electrónicos y
              encuentra exactamente lo que necesitas.
            </p>
            <Button size="lg" className="gap-2 group">
              Explorar Tienda
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1/3 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-6 md:px-10 lg:px-20 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TechStore</h3>
              <p className="text-muted-foreground text-sm">
                Tu destino para la mejor tecnología al mejor precio.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Accesorios
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Componentes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">info@techstore.com</li>
                <li className="text-muted-foreground">+1 (555) 123-4567</li>
                <li className="text-muted-foreground">
                  123 Tech Street, Ciudad
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TechStore. Todos los derechos
              reservados.
            </p>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Términos
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidad
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
