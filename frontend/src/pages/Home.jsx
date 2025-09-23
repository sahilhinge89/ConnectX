import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText";
import ActionButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"



const Home = () => {
  return (
    <div>
      {/*Section 1 */}
      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
     text-white justify-between"
      >
        <Link to={"/signup"}>
          <div
            className="group mx-auto rounded-full bg-richblack-800 font-bold
       text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16  p-4"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full 
        px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[85%] text-center text-lg text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <ActionButton active={true} linkto={"/signup"}>
            Learn More
          </ActionButton>
          <ActionButton active={false} linkto={"/login"}>
            Book a Demo
          </ActionButton>
        </div>

        <div className="shadow-blue-200 my-12 mx-3">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1*/}
        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            actionbtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            actionbtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblocks={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
<a href="one/">One</a><a href="two/">Two</a> <a href="three/">Three</a>
</nav>
`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            actionbtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            actionbtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
codeblocks={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
<a href="one/">One</a><a href="two/">Two</a> <a href="three/">Three</a>
</nav>
`}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>

      {/*Section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="max-w-11/12 max-w-maxContent flex flex-row items-center justify-center gap-5 max-auto">
            <div className="h-[350px]"></div>
            <div className="flex  flex-row gap-7 text-white">
              <ActionButton active={true} linkto={"/signup"}>
                <div className="flex gap-3 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </ActionButton>
            </div>

            <ActionButton active={false} linkto={"/signup"}>
              <div className="flex items-center text-white">Learn more</div>
            </ActionButton>
          </div>
        </div>

        <div className="max-w-11/12 max-w-maxContent flex flex-row items-center justify-center gap-7 max-auto">
          <div className="flex flex-row gap-5 ml-[80px] mt-12">
            <div className="text-4xl font-semibold w-[45%] ">
              Get the skills you need for a
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] item-start">
              <div className="text-[16px]">
                The modern ConnectX is the dictates its own terms. Today, to be
                a competitive specialist requires more than professional skills.
              </div>
            </div>
             
          </div>
        </div>
      <TimelineSection />

      <LearningLanguageSection/>
      </div>


      {/*Section 3 */}
      {/*Footer */}
    </div>
  );
};

export default Home;
