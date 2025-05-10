import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'work', name: 'Work', color: '#7c3aed' },
    { id: 'personal', name: 'Personal', color: '#06b6d4' },
    { id: 'home', name: 'Home', color: '#f43f5e' },
    { id: 'health', name: 'Health', color: '#10b981' }
  ];

  // Icons
  const CheckSquare = getIcon('CheckSquare');
  const Clock = getIcon('Clock');
  const ListTodo = getIcon('ListTodo');
  const Info = getIcon('Info');
  const Trash2 = getIcon('Trash2');
  const PlusCircle = getIcon('PlusCircle');
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Task created successfully!");
  };
  
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        
        // Show appropriate toast
        if (newStatus === 'completed') {
          toast.success("Task completed! 🎉");
        } else {
          toast.info("Task marked as pending");
        }
        
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.error("Task deleted");
  };
  
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const statusMatch = filterStatus === 'all' || task.status === filterStatus;
      const categoryMatch = selectedCategory === 'all' || task.categoryId === selectedCategory;
      return statusMatch && categoryMatch;
    });
  };
  
  const filteredTasks = getFilteredTasks();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Tasks</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Organize, track, and complete your tasks effortlessly
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`btn ${filterStatus === 'all' ? 'bg-gradient-primary text-white' : 'btn-outline'}`}
          >
            <ListTodo size={18} className="mr-2" />
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`btn ${filterStatus === 'pending' ? 'bg-gradient-primary text-white' : 'btn-outline'}`}
          >
            <Clock size={18} className="mr-2" />
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`btn ${filterStatus === 'completed' ? 'bg-gradient-primary text-white' : 'btn-outline'}`}
            <CheckSquare size={18} className="mr-2" />
            Completed
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-1">
          <div className="card p-4">
            <h3 className="font-medium mb-4 text-lg">Categories</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-2 rounded-lg text-left flex items-center ${selectedCategory === 'all' 
                  ? 'bg-gradient-primary/10 text-primary dark:bg-primary/20'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
              >
                <div className="w-3 h-3 rounded-full bg-surface-400 mr-3"></div>
                All Categories
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded-lg text-left flex items-center ${selectedCategory === category.id 
                    ? 'bg-gradient-primary/10 text-primary dark:bg-primary/20'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                >
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="card p-4 mt-4">
            <h3 className="font-medium mb-4 text-lg">Task Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Tasks</span>
                <span className="font-semibold">{tasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed</span>
                <span className="font-semibold">{tasks.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending</span>
                <span className="font-semibold">{tasks.filter(t => t.status === 'pending').length}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-3">
          <MainFeature onTaskCreated={handleTaskCreated} categories={categories} />
          
          <div className="mt-6">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center bg-gradient-surface dark:bg-gradient-surface-dark rounded-lg">
                <Info size={40} className="mx-auto mb-4 text-surface-400" />
                <h3 className="text-xl mb-2">No tasks found</h3>
                <p className="text-surface-500 dark:text-surface-400">
                  {filterStatus !== 'all' || selectedCategory !== 'all' 
                    ? "Try changing your filters to see more tasks" 
                    : "Create your first task using the form above"}
                </p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {filteredTasks.map(task => {
                  const category = categories.find(c => c.id === task.categoryId);
                  
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`task-item ${getPriorityClass(task.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
                              task.status === 'completed'
                                ? 'bg-gradient-primary border-primary flex items-center justify-center'
                                : 'border-surface-400'
                            }`}
                          >
                            {task.status === 'completed' && (
                              <CheckSquare size={12} className="text-white" />
                            )}
                          </button>
                          
                          <div>
                            <h3 className={`font-medium ${
                              task.status === 'completed' ? 'line-through text-surface-500' : ''
                            }`}>
                              {task.title}
                            </h3>
                            
                            {task.description && (
                              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {category && (
                                <span 
                                  className="text-xs px-2 py-1 rounded-md font-medium" 
                                  style={{ 
                                    backgroundColor: `${category.color}20`, 
                                    color: category.color 
                                  }}
                                >
                                  {category.name}
                                </span>
                              )}
                              
                              {task.dueDate && (
                                <span className="text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-md">
                                  Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                                </span>
                              )}
                              
                              <span className={`text-xs px-2 py-1 rounded-md ${
                                task.priority === 'high' 
                                  ? 'bg-gradient-accent/10 text-accent' 
                                  : task.priority === 'medium'
                                    ? 'bg-gradient-secondary/10 text-secondary'
                                    : 'bg-gradient-primary/10 text-primary'
                              }`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-surface-500 hover:text-accent p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                          aria-label="Delete task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;