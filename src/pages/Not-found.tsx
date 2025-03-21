"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  // Ensure theme is available on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-[1200px] flex-col items-center justify-center gap-4 px-4 py-16 md:gap-8 md:py-24">
        <div className="relative mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-4 border-muted-foreground/20">
              <Compass className="h-24 w-24 text-primary" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
              />
            </div>
          </motion.div>
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
              className="h-80 w-80 rounded-full bg-primary"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-2 text-8xl font-extrabold tracking-tighter text-primary md:text-9xl">
            404
          </h1>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
            Page Not Found
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col gap-2 min-[400px]:flex-row"
        >
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
