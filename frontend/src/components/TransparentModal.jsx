import React, { useRef } from "react";
import { Modal, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const TransparentModal = ({
  open,
  onClose,
  title,
  children,
  headerBackground,
  height = "90vh",
  width = "90vw",
  color,
}) => {
  const modalRef = useRef(null);

  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={onClose}>
          <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center"
          >
            <motion.div
              key="modal"
              initial={{ y: -90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-black shadow-xl outline-none w-screen h-screen overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-end items-center px-4 py-2 rounded-t-md">
                <IconButton sx={{ p: 0 }} onClick={onClose}>
                  <IoMdClose
                    className="text-white"
                    style={{
                      color: headerBackground ? "white" : "black",
                    }}
                  />
                </IconButton>
              </div>

              {/* Content */}
              <div className="p-4">{children}</div>
            </motion.div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TransparentModal;
