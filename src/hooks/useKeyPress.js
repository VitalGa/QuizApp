import { useEffect } from 'react';

/**
 * Простой хук для обработки нажатий клавиш
 * @param {Function} callback - функция, которая будет вызвана при нажатии клавиши
 * @param {Array} keys - массив клавиш для отслеживания (опционально, если не указан - отслеживает все)
 */
export function useKeyPress(callback, keys = []) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (keys.length === 0 || keys.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callback, keys]);
}
