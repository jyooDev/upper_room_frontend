import React from 'react'
import { HomeNavBar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Community } from '../components/Community'
import { Features } from '../components/Features'
import { Contact } from '../components/Contact'

export const Home = () => {
    return (
        <>
            <HomeNavBar/>
            <Hero/>
            <Features/>
            <Community/>
            <Contact/>
        </>
    )
}

