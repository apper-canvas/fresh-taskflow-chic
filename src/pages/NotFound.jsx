import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const ArrowLeft = getIcon('ArrowLeft');
  const FolderX = getIcon('FolderX');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <div className="relative w-32 h-32 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FolderX size={128} className="bg-gradient-primary bg-clip-text text-transparent opacity-70" />
        </motion.div>
      </div>

      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.p 
        className="text-xl md:text-2xl font-medium mb-2 text-surface-700 dark:text-surface-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Page Not Found
      </motion.p>

      <motion.p 
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary px-6 py-2.5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          className="btn bg-gradient-primary hover:bg-gradient-primary-hover px-6 py-2.5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-white"
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;