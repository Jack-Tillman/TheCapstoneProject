import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useState, useEffect} from 'react';
import { fetchItems } from '../api';
import React from 'react';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom';

const images = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Person_playing_videogames_%2852001476290%29.jpg',
      title: 'Games',
      width: '30%',
    },
    {
      url: 'https://images.pexels.com/photos/17784701/pexels-photo-17784701.jpeg?cs=srgb&dl=pexels-pramod-tiwari-17784701.jpg&fm=jpg',
      title: 'Hardware',
      width: '40%',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fortnite_merch_at_E3_2018_2.jpg',
      title: 'Merch',
      width: '30%',
    },
  ];
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
  
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

            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {images.map((image) => (
                <ImageButton
                focusRipple
                key={image.title}
                style={{
                    width: image.width,
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImageButton>
            ))}
            </Box>
         </div>
</>
    )
}