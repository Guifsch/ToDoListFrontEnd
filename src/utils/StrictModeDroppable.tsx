// Soluciona o erro de incompatibilidade com o react-beautiful-dnd e o StrictMode

import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "@hello-pangea/dnd";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
