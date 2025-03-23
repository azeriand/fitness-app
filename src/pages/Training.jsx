import SectionName from "../components/common/section-name"
import SetsWidget from "../components/sets-widget"
import RowSet from "../components/common/row-set"

export default function Training(){
    return(
        <>
            <p className='page-name'>Workout Started</p>
            <SectionName section='Exercises'/>
            <SetsWidget>
                <RowSet/>
                <RowSet/>
            </SetsWidget>
        </>
    )
}