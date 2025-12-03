import { useState, useEffect, useContext, useMemo, Key } from 'react';


export default function useDraggable([data, setData]) {
    const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
    const [newDragPosition, setNewDragPosition] = useState(null);
    const [dragDirection, setDragDirection] = useState<'UP' | 'DOWN' | null>(null);

    function onDragStart(index){        
        setDraggedCardIndex(index);
    }
    
    function onDragOver(e, index){
        e.preventDefault(); // Allow drop
        setNewDragPosition(index);

        if (draggedCardIndex != null){

            if (index > draggedCardIndex) {
                setDragDirection('DOWN');
            } else if (index < draggedCardIndex) {
                setDragDirection('UP');
            }
        }
    }

    useEffect(() => {
        window.addEventListener('dragend', () => {
            setTimeout(() => {
                setDraggedCardIndex(null);
                setNewDragPosition(null);
            }, 0);
        });
    }, []);


    
    function onDrop(e){
        e.preventDefault();
        if (draggedCardIndex !== null && newDragPosition !== null){
            let targetIndex: number = newDragPosition;
            if (dragDirection === 'DOWN') {
                targetIndex -= 1;
            }
            let newExercisesArray = [...data.exercises];
            let exerciseMoved = newExercisesArray[draggedCardIndex];
            newExercisesArray.splice(draggedCardIndex, 1); // Remove dragged item
            newExercisesArray.splice(newDragPosition, 0, exerciseMoved); // Insert at new position
            setData((oldTrainingData) => ({
                ...oldTrainingData,
                exercises: newExercisesArray
            }))
        }
        setDraggedCardIndex(null);
        setNewDragPosition(null);
    }

    const isDraggingUp = (index) => newDragPosition === index && draggedCardIndex !== index && dragDirection === 'UP';
    const isDraggingDown = (index) => newDragPosition === index && draggedCardIndex !== index && dragDirection === 'DOWN';

    return { isDraggingUp, isDraggingDown, onDragStart, onDragOver, onDrop, draggedCardIndex, setDraggedCardIndex, newDragPosition, setNewDragPosition, dragDirection, setDragDirection };
}