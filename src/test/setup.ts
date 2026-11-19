import '@testing-library/jest-dom';

// Mock HTMLCanvasElement.prototype.getContext for jsdom environments
if (typeof window !== 'undefined' && window.HTMLCanvasElement) {
  const mockContext2D = {
    canvas: null,
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    moveTo: () => {},
    lineTo: () => {},
    scale: () => {},
    translate: () => {},
    rotate: () => {},
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
  };

  window.HTMLCanvasElement.prototype.getContext = function (contextId: string) {
    if (contextId === '2d') {
      return mockContext2D as unknown as CanvasRenderingContext2D;
    }
    return null;
  } as unknown as typeof window.HTMLCanvasElement.prototype.getContext;
}
