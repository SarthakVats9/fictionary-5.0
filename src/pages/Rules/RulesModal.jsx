import React from "react";
import { motion } from "framer-motion";
import "./RulesModal.css";

/* Short, clean rules for boxes */
export const rulesData = [
  { title: "SCORING", text: "+10 points per correct answer" },
  { title: "COINS", text: "Earn coins for every answer" },
  { title: "STUCK?", text: "Redeem coins in the shop for powerups" },
  { title: "CONFUSED?", text: "Hints unlock after timer runs out" },
  { title: "SCARED OF BEING WRONG?", text: "Unlimited attempts allowed, no negative marking!" },
];

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 rules-backdrop flex justify-center items-center z-50">
      {/* Background effects */}
      <div className="rules-stars">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
      <div className="rules-shooting-stars">
        <span></span><span></span>
      </div>
      <div className="rules-galaxies"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rules-modal"
      >
        <h2 className="rules-title font-pixel text-2xl mb-6 glow">
          SYSTEM PROTOCOLS
        </h2>

        {/* 5 BOX GRID */}
      <div className="rules-grid font-vt323">
  {rulesData.map((rule, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.12 }}
      className={`rule-wrapper ${index === 4 ? "center" : ""}`}
    >
      <div className="rule-heading">{rule.title}</div>
      <div className="rule-box">{rule.text}</div>
    </motion.div>
  ))}
</div>


        <motion.button
          onClick={onClose}
          className="rules-close-btn mt-8 font-pixel px-5 py-2 rounded-lg glow"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          CLOSE
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RulesModal;
