import { Tooltip } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem({
  icon,
  label,
  expanded,
  active = false,
  onClick,
}: SidebarNavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      <Tooltip content={label} placement="right" hidden={expanded}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut" }}
        >
          <div
            className={`
          			flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer 
          			transition-all duration-200 my-1 relative group
          			${active ? "bg-violet-800/20 text-violet-400" : "text-gray-300 hover:text-white"}
          			${isHovered ? "bg-white/5" : ""}
						`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Active indicator */}
            {active && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-violet-700 rounded-r-full"></div>
            )}

            {/* Icon with subtle animation */}
            <motion.div
              className={`w-6 h-6 transition-transform duration-200 ${isHovered ? "scale-110" : ""}`}
            >
              {icon}
            </motion.div>

            {expanded && (
              <motion.span
                key="label"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className={`font-medium text-sm truncate ${active ? "text-violet-400" : ""}`}
              >
                {label}
              </motion.span>
            )}
          </div>
        </motion.div>
      </Tooltip>
    </AnimatePresence>
  );
}
