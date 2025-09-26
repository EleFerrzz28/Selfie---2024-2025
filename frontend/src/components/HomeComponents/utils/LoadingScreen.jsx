import { motion } from "framer-motion";


const LoadingScreen = () => {
   return (
    <div
      className="loadingScreen"
      style={{
        width: '100%',
        height: '92vh',
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "var(--darkPurple)",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;