import React from "react";
import { Element } from "react-scroll";
export const Contact = () => {
    return (
        <Element name='contact'>
            <section id='contact' style={{ height: '100vh', backgroundColor: 'lightblue' }}>
                <div className="flex flex-col items-center text-center justify-start gap-3 relative h-[100vh] pt-30 overflow-auto">
                    <div>
                        <h1 className="font-bold text-3xl">Community</h1>
                        <p className="text-gray-600">Share your daily life.</p>
                    </div>
                </div>
            </section>
        </Element>
    )
}