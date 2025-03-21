"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 1, 100));
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="flex h-screen  justify-center">
      <div className="w-full max-w-md px-4">
        <motion.div
          className="flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mb-4 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="w-full h-full rounded-full border-4 border-primary" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold text-primary text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ARCADE MAX
          </motion.h1>

          <motion.p
            className="text-xl  text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Tu tienda de tecnología
          </motion.p>

          <motion.div
            className="w-full mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Progress value={progress} className="h-2 bg-primary" />
            <div className="flex justify-between mt-2 text-primary">
              <p>Loading...</p>
              <p>{progress}%</p>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
