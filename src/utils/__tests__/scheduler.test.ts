import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  scheduleTask,
  executeInChunks,
  debounce,
  throttle,
  measurePerformance,
  TaskPriority
} from '../scheduler';

describe('Scheduler Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('scheduleTask', () => {
    it('should execute task immediately for user-blocking priority', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      await scheduleTask(task, 'user-blocking');
      
      expect(task).toHaveBeenCalled();
    });

    it('should execute task for user-visible priority', async () => {
      vi.useFakeTimers();
      const task = vi.fn().mockReturnValue('result');
      
      const promise = scheduleTask(task, 'user-visible');
      vi.runAllTimers();
      await promise;
      
      expect(task).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should use requestIdleCallback for background tasks when available', async () => {
      vi.useFakeTimers();
      // Mock requestIdleCallback that executes callback immediately
      const mockRequestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
        // Execute callback synchronously for test
        setTimeout(() => callback({ timeRemaining: () => 50, didTimeout: false }), 0);
        return 1;
      });
      
      Object.defineProperty(global, 'window', {
        value: { requestIdleCallback: mockRequestIdleCallback },
        configurable: true
      });
      
      const task = vi.fn();
      
      const promise = scheduleTask(task, 'background');
      vi.runAllTimers();
      await promise;
      
      expect(task).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should default to user-visible priority', async () => {
      vi.useFakeTimers();
      const task = vi.fn().mockResolvedValue('result');
      
      const promise = scheduleTask(task);
      vi.runAllTimers();
      await promise;
      
      expect(task).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe('executeInChunks', () => {
    it('should process tasks in chunks', async () => {
      vi.useFakeTimers();
      const task1 = vi.fn();
      const task2 = vi.fn();
      const task3 = vi.fn();
      const tasks = [task1, task2, task3];
      
      const promise = executeInChunks(tasks, 2);
      vi.runAllTimers();
      await promise;
      
      expect(task1).toHaveBeenCalled();
      expect(task2).toHaveBeenCalled();
      expect(task3).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should use default background priority', async () => {
      vi.useFakeTimers();
      const task1 = vi.fn();
      const task2 = vi.fn();
      const tasks = [task1, task2];
      
      const promise = executeInChunks(tasks);
      vi.runAllTimers();
      await promise;
      
      expect(task1).toHaveBeenCalled();
      expect(task2).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(fn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      
      expect(fn).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', () => {
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should allow calls after throttle period', () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);
      
      throttledFn();
      expect(fn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(100);
      throttledFn();
      
      expect(fn).toHaveBeenCalledTimes(2);
      vi.useRealTimers();
    });
  });

  describe('measurePerformance', () => {
    it('should measure sync task performance', async () => {
      const mockNow = vi.fn()
        .mockReturnValueOnce(100)  // Start time
        .mockReturnValueOnce(150); // End time
      
      Object.defineProperty(global, 'performance', {
        value: { now: mockNow },
        configurable: true,
        writable: true
      });

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const task = vi.fn();
      
      await measurePerformance('test-task', task);
      
      expect(task).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('test-task took 50 milliseconds');
      
      consoleLogSpy.mockRestore();
    });

    it('should handle async task errors', async () => {
      const mockNow = vi.fn()
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);
      
      Object.defineProperty(global, 'performance', {
        value: { now: mockNow },
        configurable: true,
        writable: true
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const task = vi.fn().mockRejectedValue(new Error('Test error'));
      
      // measurePerformance catches errors internally, so it should resolve successfully
      await expect(measurePerformance('test-task', task)).resolves.toBeUndefined();
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Task test-task failed:', expect.any(Error));
      expect(consoleLogSpy).toHaveBeenCalledWith('test-task took 50 milliseconds');
      
      consoleErrorSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });
  });
});