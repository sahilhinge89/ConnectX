import React from 'react'
import ActionButton from '../HomePage/Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position,heading, subheading,actionbtn1,actionbtn2,
    codeblocks,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex {position} my-20 justify-between gap-10`}>
        {/*section 1*/}
        <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className ='text-center text-lg text-richblack-300'>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
         <ActionButton active ={actionbtn1.active} linkto={actionbtn1.linkto}>
            <div className='flex gap-2 item-center'>
                {actionbtn1.btnText}
                <FaArrowRight/>
            </div>
         </ActionButton>

         <ActionButton active ={actionbtn2.active} linkto={actionbtn2.linkto}>      
                {actionbtn2.btnText}     
         </ActionButton>
        </div>
        </div>
        {/*section 2*/}
        <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]'>
            {/*HW -> BG gradient*/}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`} >
                <TypeAnimation 
                sequence={[codeblocks,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block",
                        }
                    }
                    omitDeletionAnimation
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks