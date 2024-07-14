import { motion } from "framer-motion";
import logo from "@assets/logo.jfif";

const Logo = () => {
  return (
    <motion.div
      animate={{ opacity: 0, display: "none" }}
      transition={{ duration: 0.5, delay: 2 }}
      className="logo"
    >
      <img src={logo} alt="logo" />
    </motion.div>
  );
};

export default Logo;
