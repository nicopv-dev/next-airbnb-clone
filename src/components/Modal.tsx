import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface IModalProps {
  isOpen: boolean;
  onChangeShowModal: (isOpen: boolean) => void;
  size?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-3xl';
  title: string;
  children: JSX.Element;
}

export default function Modal({
  isOpen,
  onChangeShowModal,
  size = 'max-w-md',
  title,
  children,
}: IModalProps) {
  const backDrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: '0',
      opacity: 0,
      transition: { delay: 0.5, ease: 'easeOut', duration: 0.5 },
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: { delay: 0.5, ease: 'easeOut', duration: 0.6 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={backDrop}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 z-30 grid place-items-center"
        >
          <motion.div
            variants={modal}
            className={`bg-white shadow-lg rounded-lg mx-auto ${size} w-full`}
          >
            {/* title */}
            <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
              <p className="w-6" />
              <h2 className="text-xl font-medium">{title}</h2>
              <button type="button" onClick={() => onChangeShowModal(false)}>
                <FiX className="w-6 h-6 text-black" />
              </button>
            </div>
            {/* content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
