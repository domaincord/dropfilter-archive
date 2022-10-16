import React from 'react';
import BackorderServiceSelector from './BackorderServiceSelector';
import DDMonthSelector from './DDMonthSelector';
import DDYearSelector from './DDYearSelector';
import DDDaySelector from './DDDaySelector';

const SelectorBar = () => {


    return (
        <header className="bg-blue-500 w-full h-48 lg:h-24">
            <div className="px-6 flex flex-col lg:flex-row justify-around lg:justify-center items-center h-full">
                <div className="lg:flex-grow">
                    <BackorderServiceSelector />
                </div>
                <div className="flex flex-row flex-nowrap">
                    <DDYearSelector />
                    <DDMonthSelector />
                    <DDDaySelector />
                </div>
            </div>
        </header>
    )
}

export default SelectorBar