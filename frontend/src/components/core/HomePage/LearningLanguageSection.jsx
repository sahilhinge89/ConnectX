import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg"
import ActionButton from '../HomePage/Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5 '>
        <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife For 
            <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto textbase mt-2 font-medium w-[55%]'>
            Using spin making learning multiple languages easy.
             with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row item-center justify-center mt-5'>
            <img src={know_your_progress }
             alt = "KnowYourProgress"
            className='object-contain -mr-32'
            />


            <img src={compare_with_others}
             alt = "CompareWithOthers"
            className='object-contain'
            />

            <img src={plan_your_lesson }
             alt = "PlanYourlesson"
            className='object-contain -ml-36'
            
            />

        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
