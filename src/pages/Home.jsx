import RoutineHistory from '../components/routine-history'
import { Calendar } from 'azeriand-library'
import { useContext, useState } from 'react'
import { TrainingContext } from '../components/training-context'
import InfiniteScroller from '../components/infinite-scroller';

export default function Home(){

  const { history } = useContext(TrainingContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleHistory, setVisibleHistory] = useState(6); // Start with 6 items visible

  const getMoreData = () => {
    if (isLoading || visibleHistory >= history.length) return;

    setIsLoading(true);

    setTimeout(() => {
      // Increase the number of visible items
      setVisibleHistory((prev) => Math.min(prev + 6, history.length));

      // Stop loading if all items are visible
      if (visibleHistory + 6 >= history.length) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 500); // Simulate a delay for loading
  };

  return(
    <>
      <p className='text-start text-[2rem] font-bold'>Your latest Trainings</p>
      <InfiniteScroller
        className='grid grid-cols-[70%_30%] grid-rows-[100%] gap-x-[1rem] mt-[2rem]'
        getMoreData={getMoreData}
        hasMore={hasMore}
        isLoading={isLoading}
        containerHeight={600} // Example height
        bufferPx={50} // Optional buffer
        loader={<p>Loading...</p>} // Optional loader
      >
        <div className='flex flex-col gap-y-[1rem]'>
          {
            history.slice(0, visibleHistory).map((routine) => <RoutineHistory key={routine.day} routine={routine}/>)
          }
        </div>
        <div>
          <Calendar selectedDates={history}/>
        </div>
      </InfiniteScroller>
    </>
  )
}