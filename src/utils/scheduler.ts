// Task scheduling utilities for main thread optimization

export type TaskPriority = 'user-blocking' | 'user-visible' | 'background';

export interface SchedulerTask {
  id: string;
  task: () => void | Promise<void>;
  priority: TaskPriority;
  timeout?: number;
}

declare global {
  interface Window {
    scheduler?: {
      postTask: (task: () => void, options?: { priority: string }) => Promise<void>;
    };
  }
}

export const scheduleTask = (
  task: () => void | Promise<void>, 
  priority: TaskPriority = 'user-visible'
): Promise<void> => {
  if (typeof window !== 'undefined' && 'scheduler' in window && window.scheduler) {
    return window.scheduler.postTask(task, { priority });
  }
  
  // Fallback for browsers without scheduler API
  return new Promise(resolve => {
    if (priority === 'user-blocking') {
      // Execute immediately for user-blocking tasks
      Promise.resolve(task()).then(() => resolve());
    } else if (priority === 'user-visible') {
      // Use setTimeout for user-visible tasks
      setTimeout(() => {
        Promise.resolve(task()).then(() => resolve());
      }, 0);
    } else {
      // Use requestIdleCallback for background tasks
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          Promise.resolve(task()).then(() => resolve());
        });
      } else {
        setTimeout(() => {
          Promise.resolve(task()).then(() => resolve());
        }, 16); // ~60fps
      }
    }
  });
};

export const executeInChunks = (
  tasks: (() => void)[],
  chunkSize: number = 5,
  priority: TaskPriority = 'background'
): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;
    
    function processChunk() {
      const chunk = tasks.slice(index, index + chunkSize);
      
      chunk.forEach(task => {
        try {
          task();
        } catch (error) {
          console.error('Task execution error:', error);
        }
      });
      
      index += chunkSize;
      
      if (index < tasks.length) {
        scheduleTask(processChunk, priority);
      } else {
        resolve();
      }
    }
    
    processChunk();
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  
  const setTimeoutFn = typeof window !== 'undefined' && window.setTimeout 
    ? window.setTimeout 
    : (typeof global !== 'undefined' && (global as any).setTimeout)
    ? (global as any).setTimeout
    : setTimeout;
    
  const clearTimeoutFn = typeof window !== 'undefined' && window.clearTimeout 
    ? window.clearTimeout 
    : (typeof global !== 'undefined' && (global as any).clearTimeout)
    ? (global as any).clearTimeout
    : clearTimeout;
  
  return ((...args: any[]) => {
    clearTimeoutFn(timeout);
    timeout = setTimeoutFn(() => func(...args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  
  const setTimeoutFn = typeof window !== 'undefined' && window.setTimeout 
    ? window.setTimeout 
    : (typeof global !== 'undefined' && (global as any).setTimeout)
    ? (global as any).setTimeout
    : setTimeout;
  
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeoutFn(() => inThrottle = false, limit);
    }
  }) as T;
};

// Performance monitoring utility
export const measurePerformance = (
  name: string,
  task: () => void | Promise<void>
): Promise<void> => {
  return new Promise((resolve) => {
    const perf = typeof window !== 'undefined' && window.performance 
      ? window.performance 
      : (typeof global !== 'undefined' && (global as any).performance)
      ? (global as any).performance
      : performance;
      
    const start = perf.now();
    
    Promise.resolve(task())
      .then(() => {
        const end = perf.now();
        console.log(`${name} took ${end - start} milliseconds`);
        resolve();
      })
      .catch((error) => {
        console.error(`Task ${name} failed:`, error);
        const end = perf.now();
        console.log(`${name} took ${end - start} milliseconds`);
        resolve();
      });
  });
};

// Batch DOM updates
export const batchDOMUpdates = (updates: (() => void)[]): void => {
  // Use requestAnimationFrame to batch DOM updates
  const raf = typeof window !== 'undefined' && window.requestAnimationFrame 
    ? window.requestAnimationFrame 
    : (typeof global !== 'undefined' && (global as any).requestAnimationFrame)
    ? (global as any).requestAnimationFrame
    : requestAnimationFrame;
    
  raf(() => {
    updates.forEach(update => {
      try {
        update();
      } catch (error) {
        console.error('DOM update error:', error);
      }
    });
  });
};