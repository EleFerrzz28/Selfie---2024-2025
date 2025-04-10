import React, { Component,useState } from 'react';
import useLocalStorage from 'use-local-storage';

import Schedule from './Schedule';
import NoteCard from './NoteCard';
import PomoCard from './PomoCard';
import WeatherApp from './WeatherApp';
import Clock from './Clock';
import UpcomingTasks from './UpcomingTasks';
import CalendarCard from './CalendarCard';
import ThemeToggler from './Theme';



const Home = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const[isDark,setIsDark] = useLocalStorage("isDark", preference);


    return (
      <div className='Home' data-theme={isDark ? "dark" : "light"} style={{background: 'var(--color-background)', transition: 'background-color 0.25s ease-in-out'}}> 
      <div className="container-fluid p-1 m-1" >
        <div className='row'> 
          <div className='col col-lg-12 col-md-11 col-sm-11'>
            <div className='row'>
              <div className='top' style={{display: 'flex', justifyContent: 'space-between'}}> 
                <div className='Welcome mt-3' >
                  <h1 style={{ color: 'var(--color-dark)', fontSize: '3vmin', fontWeight: 'bold' }}> Hello user! </h1>
                  <h4 style={{ fontSize: '2vmin', color: 'var(--color-dark)' }}> What are the plans for today ? </h4>
                </div>
                <ThemeToggler 
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
                />
                </div>
            </div>
            <div className='row '>
              <div className='col col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center align-items-center order-lg-1 order-md-2 order-sm-2'> <CalendarCard /> </div>
              <div className='col col-lg-7 col-md-12 col-sm-12 order-lg-2 order-md-1 order-sm-1'>
                <div className='row'>
                  <div className='col-6 d-flex justify-content-center align-items-center'> <Clock /> </div>
                  <div className='col-6 d-flex justify-content-center align-items-center'> <WeatherApp /> </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col col-lg-5 col-md-12 col-sm-12'> <Schedule /> </div>
              <div className='col col-lg-7 col-md-12 col-sm-12'>
                <div className='row'> <UpcomingTasks /> </div>
                <div className='row justify-content-center'>
                  <div className='col col-lg-6 col-md-9 col-sm-12 d-flex flex-column justify-content-center align-items-center mt-4' style={{ textAlign: 'start' }}>
                    <h3 style={{color: 'var(--color-dark)'}}> Last Session </h3>
                    <PomoCard /> </div>
                  <div className='col col-lg-6 col-md-9 col-sm-12 d-flex flex-column justify-content-center align-items-center mt-4'>
                    <h3 style={{color: 'var(--color-dark)'}}> Last Created Note </h3>
                    <NoteCard />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>

    );
  }



export default Home;
