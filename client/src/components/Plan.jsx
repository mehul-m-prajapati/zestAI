import { PricingTable } from '@clerk/clerk-react'
import {useTheme} from '../context/ThemeContext'
import { dark, light } from '@clerk/themes'

const Plan = () => {

    const {theme} = useTheme();

    return (
        <div className='max-w-2xl mx-auto z-20 my-5'>

            <div className='text-center'>
                <h2 className=' text-[38px] font-semibold'>Choose Your Plan</h2>
                <p className='text-gray-500 dark:text-gray-300 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
            </div>

            <div className="mt-14 max-sm:mx-8 rounded-lg">
                <PricingTable
                    appearance={{
                    baseTheme: theme === 'dark' ? dark : light,
                    variables: {
                        colorBackground: theme === 'dark' ? '#1f2937' : '#ffffff',         // card background
                        colorForeground: theme === 'dark' ? '#f9fafb' : '#111827',         // text color
                    },
                    }}
                />
            </div>

        </div>
    );
};

export default Plan;
