import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";

export default function ProjectTab({
  index,
  title,
  reorderProject,
  loadProject,
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.PROJECTTAB, //change PROJECT to PROJECTTAB
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // The source index where item is being dragged from
      const sourceIndex = item.index;
      // Index of current hover position
      const hoverIndex = index;
      // Don't replace items with themselves
      if (sourceIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      //Only perform the move when the mouse has crossed half of the item's height
      // When dragging leftwards, only move when the cursor is left of 50%
      // When dragging downwards, only move when the cursor is above 50%
      if (sourceIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (sourceIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      reorderProject(sourceIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PROJECTTAB,
    item: () => {
      return { title, index };
    },
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li ref={ref} style={{ opacity }}>
      <button className="btn" onClick={() => loadProject(title)}>
        {title}
      </button>
    </li>
  );
}
