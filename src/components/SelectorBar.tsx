import React from 'react';
import BackorderServiceSelector from './BackorderServiceSelector';
import DDMonthSelector from './DDMonthSelector';
import DDYearSelector from './DDYearSelector';
import DDDaySelector from './DDDaySelector';

const SelectorBar = () => {


    return (
        <header className="bg-blue-500 w-full h-24">
            <div className="container mx-auto px-6 flex flex-row place-content-center items-center h-full">
                <BackorderServiceSelector />
                <DDYearSelector />
                <DDMonthSelector />
                <DDDaySelector />
            </div>
        </header>
    )
}

export default SelectorBar