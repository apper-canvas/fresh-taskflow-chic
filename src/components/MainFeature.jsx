import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ onTaskCreated, categories }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    categoryId: '',
    status: 'pending'
  });

  // Icons
  const PlusCircle = getIcon('PlusCircle');
  const PanelClose = getIcon('PanelClose');
  const Calendar = getIcon('Calendar');
  const Flag = getIcon('Flag');
  const ListTodo = getIcon('ListTodo');
  const Save = getIcon('Save');
  const X = getIcon('X');
  
  const validateForm = () => {
    const errors = {};
    
    if (!taskData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!taskData.categoryId) {
      errors.categoryId = "Please select a category";
    }
    
    if (taskData.dueDate && new Date(taskData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      errors.dueDate = "Due date can't be in the past";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onTaskCreated(newTask);
    
    // Reset form
    setTaskData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      categoryId: '',
      status: 'pending'
    });
    
    setIsFormOpen(false);
  };
  
  return (
    <div className="card overflow-visible">
      <div className="p-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-lg font-medium">Task Management</h2>
        
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="btn btn-primary px-3 shadow-md"
          aria-label={isFormOpen ? "Close task form" : "Add new task"}
        >
          {isFormOpen ? (
            <>
              <X size={16} className="mr-2" />
              <span className="hidden md:inline-block">Cancel</span>
            </>
          ) : (
            <>
              <PlusCircle size={16} className="mr-2" />
              <span className="hidden md:inline-block">New Task</span>
            </>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-4 bg-surface-50 dark:bg-surface-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="col-span-full">
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Task Title <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear task title"
                    className={`w-full ${formErrors.title ? 'border-accent' : ''}`}
                  />
                  {formErrors.title && (
                    <p className="text-sm text-accent mt-1">{formErrors.title}</p>
                  )}
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Add details about your task (optional)"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                    Due Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={taskData.dueDate}
                      onChange={handleInputChange}
                      className={`w-full ${formErrors.dueDate ? 'border-accent' : ''}`}
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-surface-500" />
                  </div>
                  {formErrors.dueDate && (
                    <p className="text-sm text-accent mt-1">{formErrors.dueDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
                    Category <span className="text-accent">*</span>
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={taskData.categoryId}
                    onChange={handleInputChange}
                    className={`w-full ${formErrors.categoryId ? 'border-accent' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.categoryId && (
                    <p className="text-sm text-accent mt-1">{formErrors.categoryId}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <div className="flex items-center gap-3 h-10 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value="low"
                        checked={taskData.priority === 'low'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                        taskData.priority === 'low'
                          ? 'bg-primary text-white'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}>
                        Low
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={taskData.priority === 'medium'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                        taskData.priority === 'medium'
                          ? 'bg-secondary text-white'
                          : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      }`}>
                        Medium
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value="high"
                        checked={taskData.priority === 'high'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                        taskData.priority === 'high'
                          ? 'bg-accent text-white'
                          : 'bg-accent/10 text-accent hover:bg-accent/20'
                      }`}>
                        High
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn btn-primary shadow-md flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isFormOpen && (
        <div className="p-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <ListTodo size={32} className="text-primary" />
          </motion.div>
          
          <h3 className="text-xl font-medium mb-2">Stay Organized</h3>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-6">
            Create tasks, set priorities, and track your progress. Click the button above to add your first task.
          </p>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary shadow-md"
          >
            <PlusCircle size={18} className="mr-2" />
            Create New Task
          </button>
        </div>
      )}
    </div>
  );
};

export default MainFeature;