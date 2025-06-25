import Card from '../components/common/card'
import SectionName from './common/section-name'
import CalendarView from './common/calendar-view'

export default function ChartStats(){

    const customScrollbar = "overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"

    return(
        <Card noPadding appearance='ghost' className={`grid grid-cols-1 md:grid-cols-2 gap-[1rem] w-full h-full overflow-y-scroll ${customScrollbar}`}>
        <div>
          <SectionName section='completed days'/>
          <Card noPadding>
            <CalendarView/>
          </Card>
        </div>

        <div>
          <SectionName section='volume over time'/>
          <Card noPadding>
            <CalendarView/>
          </Card>
        </div>

        <div>
          <SectionName section='per week day'/>
          <Card noPadding>
            <CalendarView/>
          </Card>
        </div>

        <div>
          <SectionName section='per muscle group'/>
          <Card noPadding>
            <CalendarView/>
          </Card>
        </div>
      </Card>
    )
}