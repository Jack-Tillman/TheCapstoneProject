import { useState, useEffect} from 'react';
import { fetchItems } from '../api';
import React from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

export const HomePage = () => { 

    const Carousel = () => {
        const settings = {
            dots: true, 
           infinite: true,
           arrows: true,
           autoplay: true,
           speed: 400,
           slidesToShow: 1,
           slidesToScroll: 1,
};

return (
<div className='container'>
    <div className = "carousel">
   <Slider {...settings}>
       <div className="slideDiv">
            <h1 className='carouselText'>Call of Duty</h1>
            <img className = "carouselimg" src="https://i.ytimg.com/vi/7ZXTMNHpjXA/maxresdefault.jpg" alt="Call of Duty Gameplay" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>FIFA 23</h1>
           <img className = "carouselimg" src="https://assetsio.reedpopcdn.com/fifa-23-again.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp" alt="FIFA 23 Gameplay" />
       </div>

        <div className="slideDiv">
        <h1 className='carouselText'>Skyrim</h1>
         <img className = "carouselimg" src="https://i.ytimg.com/vi/kQ6tCc5dFYc/maxresdefault.jpg" alt="Skyrim, The Elder Scrolls Gameplay" />
        </div>

        <div className="slideDiv">
        <h1 className='carouselText'>The Legend of Zelda</h1>
         <img className = "carouselimg" src="https://cdn.vox-cdn.com/thumbor/0PrsfU_7JARyXrcxuRHM3wdHp3E=/0x0:1024x576/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/53525779/zeldabreath.0.jpg" />
        </div>
        
   </Slider>
 </div>
 </div>
);

}
    return (
        <>
        <div>
            <div className="homeCard">
                <h1>Welcome to GAME NEBULA</h1>
                <h2>Your #1 stop for all GAMES, HARDWARE, and MORE!!</h2>
            </div>

            <div className= "carouselcontainer">
              <Carousel />
            </div>
         </div>
</>
    )
}