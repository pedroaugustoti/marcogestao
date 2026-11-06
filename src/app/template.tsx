"use client"
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}  
      transition={{ ease: "easeInOut", duration: 0.35 }} 
      className="flex-1 flex flex-col w-full h-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}