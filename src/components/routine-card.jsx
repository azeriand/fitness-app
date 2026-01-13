import { useNavigate } from 'react-router-dom';
import useGetExercises from '../hooks/useGetExercises';
import { useContext } from 'react';
import { TrainingContext } from './training-context';
import './routine-card.css'
import { Button, Card, Timeline, TlListItem } from 'azeriand-library'
import ColorBadge from './color-badge';
import { FaPlay } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


export default function RoutineCard({exercises, label, timeAgo, ...cardProps}){

    const exerciseList = useGetExercises(exercises.map((exercise, index) => exercise.exercise_name))
    const navigate = useNavigate()
    const { routinesList, setTrainingData } = useContext(TrainingContext)

    const trainingWidgetStyle = {
        height: '4.5rem',
    }

    const currentRoutine = routinesList.find((routine) => routine.routine_name === label)

    function handleStart(){
        navigate('/training')
        setTrainingData({...currentRoutine, state: 'RUNNING'})
    }

    function editRoutine() {
        navigate('/edit-routine?name=' + currentRoutine.routine_name)
    }

    return (
      <Card
        intensity={900}
        blur={40}
        color="zinc"
        noBlur
        noPadding
        {...cardProps}
      >
        <div className="p-[1rem] flex flex-col gap-[1rem]">
          <div className="grid grid-cols-12 items-center gap-[1rem] justify-between align-center">
            <div className="text-start col-span-8">
              <div className="font-bold text-[1.25rem] truncate">{label}</div>
              <div className="rc-timeago text-[0.75rem] text-zinc-400">
                {timeAgo}
              </div>
            </div>

            <div className='col-span-4 flex justify-end align-top'>
              <Button
                onClick={editRoutine}
                appearance="ghost"
                icon={<MdEdit />}
                position="right"
              />
              
            </div>
          </div>
          <div className="routine-card-ul">
            <Timeline style={trainingWidgetStyle}>
              {exerciseList.map((exercise, index) => (
                <TlListItem
                  key={index}
                  label={exercise.exercise_name}
                  badge={<ColorBadge label={exercise.muscle_type} size="sm" />}
                />
              ))}
            </Timeline>
          </div>
          <Button
            appearance="mate"
            color="purple"
            intensity={600}
            dark={false}
            label="Start"
            icon={<FaPlay />}
            position="right"
            className="!text-purple-950 w-full"
            onClick={() => {
              handleStart();
            }}
            />
        </div>
        
      </Card>
    );
}