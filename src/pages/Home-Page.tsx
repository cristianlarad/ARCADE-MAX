"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fondo from "../../public/fondo.jpeg";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};

export default function HomePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  

  return (
    <div className="">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className=" flex items-center justify-center overflow-hidden"
      >
        <div className="z-10 text-center">
          <motion.h1
            variants={slideIn}
            className="text-6xl font-bold mb-4 text-blue-500"
          >
            Ocean Blue
          </motion.h1>
          <motion.p variants={slideIn} className="text-2xl mb-8">
            Experience the taste of the sea
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Reserve a Table
          </motion.button>
        </div>
      </motion.section>

      {/* Featured Menu */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4 md:px-8 "
      >
        <h2 className="text-4xl font-bold mb-12 text-center ">Featured Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Atlantic Salmon",
              price: "$24",
              img: fondo,
            },
            {
              name: "Lobster Tail",
              price: "$32",
              img: fondo,
            },
            {
              name: "Grilled Octopus",
              price: "$28",
              img: fondo,
            },
          ].map((dish, index) => (
            <motion.div
              key={dish.name}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 },
                },
              }}
              className=" rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={dish.img || "/placeholder.svg"}
                alt={dish.name}
                width={400}
                height={300}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-blue-300">{dish.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Us */}
      <motion.section
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4 md:px-8 "
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-500">Our Story</h2>
          <motion.p variants={slideIn} className="text-lg mb-8">
            Ocean Blue was born from a passion for the sea and its bounty. Our
            chefs craft each dish with care, bringing the freshest flavors of
            the ocean to your plate.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
