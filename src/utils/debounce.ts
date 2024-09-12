export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

//Adia a execução de uma função após um período especificado de inatividade.
