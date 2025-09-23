import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText' 
import ActionButton from '../HomePage/Button'
import { FaArrowRight } from "react-icons/fa6";
const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>

            <div className='w-[50%]'>
                <img src={Instructor} 
                className='shadow-white'/>
            </div>

            <div className ='w-[50%] flex flex-col gap-10 '>
                <div className= 'text-4xl font-semibold w-[50%]'>
                Become an
                <HighlightText text ={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Using spin making learning multiple languages easy.
                     with 20+ languages realistic voice-over, 
                     progress tracking, custom schedule and more.

                </p>
                <div className='w-fit'>

                <ActionButton active={true} linkto={"/signup"}> 
                <div className='flex flex-row gap-2 items-center'>Start Teaching Today <FaArrowRight/></div>
                </ActionButton>
                </div>
             

            </div>
        </div>
      
    </div>
  )
}

export default InstructorSection
