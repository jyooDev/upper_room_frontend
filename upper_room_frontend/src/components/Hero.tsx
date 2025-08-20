import React from "react";
import hero from '../assets/hero-page/hero-image.jpg';
import { Element } from "react-scroll";
export const Hero = () => {
    return (
        <Element name='hero'>

            <section id='hero' className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0'>
                    <div className='absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 opacity-90"'>
                        <img src={hero} className='absolute inset-0 w-full h-full object-cover'/>
                    </div>
                </div>
                <div className='relative max-w-7xl mt-25 sm:my-auto mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <div className="text-center lg:text-left">
                            <h1 className='flex flex-col text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight py-2'>
                                <span>
                                    Worship Together,
                                </span>
                                <span>
                                    Beyond Language
                                </span>
                            </h1>
                            <div className='text-center px-15 text-lg sm:px-30 md:text-lg lg:text-left lg:px-0 xl:text-xl font-medium text-white/80'>
                                UpperRoom envisions the church as a true community of faith, nurturing authentic fellowship within and carrying the Gospel beyond every barrier.
                            </div>
                            <button className='mt-3 bg-white/70 p-3 rounded font-bold text-primary'>
                                Getting Started
                            </button>
                        </div>
                        <div className="flex flex-col text-center gap-5">
                        <div className="flex justify-center items-center bg-black/30 rounded-xl py-3 gap-2">
                            <span className="text-white text-sm w-[35%] text-right">Break Language Barriers</span>
                            <span className="w-0.5 h-7 bg-white/30"></span>
                            <span className="text-white w-[60%] text-left">Worship translated into 50+ languages</span>
                        </div>
                        <div className="flex justify-center items-center bg-black/30 rounded-xl py-3 gap-2">
                            <span className="text-white text-sm w-[35%] text-right">Grow Together</span>
                            <span className="w-0.5 h-7 bg-white/30"></span>
                            <span className="text-white w-[60%] text-left">Private space for church members</span>
                        </div>
                        <div className="flex justify-center items-center bg-black/30 rounded-xl py-3 gap-2">
                            <span className="text-white text-sm w-[35%] text-right">Connect Churches</span>
                            <span className="w-0.5 h-7 bg-white/30"></span>
                            <span className="text-white w-[60%] text-left">Join the wider community of faith</span>
                        </div>
                        </div>

                    </div>
                </div>
            </section>
        </Element>
     );
}