import RoutineHistory from '../components/routine-history'
import { Calendar } from 'azeriand-library'
import { useContext, useState } from 'react'
import { TrainingContext } from '../components/training-context'
import InfiniteScroller from '../components/infinite-scroller';
import { useMediaQuery } from 'react-responsive'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function Home(){

  const { history } = useContext(TrainingContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleHistory, setVisibleHistory] = useState(6); // Start with 6 items visible
  const isMobile = useMediaQuery({ query: '(max-width: 48rem)' });

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
      <div className='grid grid-cols-[100%] md:!grid-cols-12 grid-rows-[100%] gap-[1rem]'>
        <InfiniteScroller
          className='mt-[2rem] md:!col-span-8'
          getMoreData={getMoreData}
          hasMore={hasMore}
          isLoading={isLoading}
          containerHeight={isMobile ? 'calc(100vh - 124px)' : 'calc(100vh - 280px)'} // Example height
          bufferPx={600} // Optional buffer
          loader={<AiOutlineLoading3Quarters className='animate-spin'/>} // Optional loader
        >
            {
              history.slice(0, visibleHistory).map((routine) => <RoutineHistory key={routine.day} routine={routine} className='mb-4'/>)
            }
        </InfiniteScroller>
        <div className='hidden md:!block md:!col-span-4'>
          <Calendar selectedDates={history} className='hidden md:!block'/>
        </div>
      </div>
    </>
  )
}