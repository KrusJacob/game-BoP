import { motion } from "framer-motion";

const DoorTop = () => {
  return (
    <motion.div
      animate={{ y: [0, -10, -1000], display: ["block", "none"] }}
      transition={{ duration: 1.4, delay: 2, times: [0, 0.4, 1.3] }}
      className="top"
    />
  );
};

export default DoorTop;
