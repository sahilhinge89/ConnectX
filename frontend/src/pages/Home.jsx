import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import ActionButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
const Home = () => {
  return (
    <div>
     {/*Section 1 */} 
     <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
     text-white justify-between'>
      <Link to={"/signup"}>
      <div className='group mx-auto rounded-full bg-richblack-800 font-bold
       text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16  p-4'>
        <div className='flex flex-row items-center gap-2 rounded-full 
        px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
            <p>
                Become an Instructor
            </p>
            <FaArrowRight />
            
        </div>
      </div>
      </Link>
     
      <div className='text-center text-4xl font-semibold mt-7'>
        Empower Your Future with 
        <HighlightText text={"Coding Skills"} />
      </div>
      
      <div className='mt-4 w-[85%] text-center text-lg text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
      </div>
     <div className='flex flex-row gap-7 mt-8'>
      <ActionButton active={true} linkto={'/signup'}>
        Learn More
        </ActionButton>
       <ActionButton active={false} linkto={'/login'}>
        Book a Demo
       </ActionButton>
     </div>
     
     <div className='shadow-blue-200 my-12 mx-3'>
      <video muted loop autoPlay >
           <source src ={Banner} type ="video/mp4"/>
      </video>
     </div>

    {/* Code Section 1*/}
     <div>
      <CodeBlocks
       position ={"lg:flex-row"}
       heading={
        <div className='text-4xl font-semibold'>
          Unlock your 
          <HighlightText text={"coding potential"}/>
          with our online courses
        </div>
       }
       subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

       actionbtn1={
        {
          btnText:"Try it Yourself",
          linkto: "/signup",
          active:true,
        }
       }
      
       actionbtn2={
        {
          btnText:"Learn More",
          linkto: "/login",
          active:false,
        }
       }
       codeblock={`
<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1><a href="/">Header</a></h1>
  <nav>
    <a href="one/">One</a>
    <a href="two/">Two</a>
    <a href="three/">Three</a>
  </nav>
</body>
</html>
`}
/>
     </div>
     </div>
     {/*Section 2 */} 
     {/*Section 3 */} 
     {/*Footer */} 
    </div>
  )
}

export default Home
