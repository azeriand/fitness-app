import Card from '../components/common/card'
import SectionName from '../components/common/section-name'

export default function DataRow{
    return(
        <>
            <div>
                <SectionName section='frequency'/>
                <Card className='flex flex-wrap p-[1rem]'>
                    <Card>
                        <SectionName section='total'/>
                    </Card>
                    <Card>
                        <SectionName section='last year'/>
                    </Card>
                    <Card>
                        <SectionName section='last month'/>
                    </Card>
                </Card>
            </div>
            <div>
                <SectionName section='weigth'/>
                <Card>
                    <Card>
                        <SectionName section='rm'/>
                    </Card>
                </Card>
            </div>
            <div>
                <SectionName section='estimate training'/>
            </div>
        </>
    )
}