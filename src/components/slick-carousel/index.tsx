/* eslint-disable react/jsx-props-no-spreading */
import RouterLink from '@components/router-link';
import { Box, Button, Paper, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import carouselImg from '../../assets/images/home/carousel/carousel-01.webp';
import './index.css';

const carouselItems = [
  {
    id: 1,
    url: carouselImg,
    title: 'The new way to plan your next trip',
    subTitle: 'Create a fully customized day by day itinerary for free',
    button: {
      title: 'Start Planning',
      url: '/packages',
    },
  },
  {
    id: 2,
    url: carouselImg,
    title: 'The new way to plan your next trip',
    subTitle: 'Create a fully customized day by day itinerary for free',
    button: {
      title: 'Start Planning',
      url: '/guides',
    },
  },
  {
    id: 3,
    url: carouselImg,
    title: 'The new way to plan your next trip',
    subTitle: 'Create a fully customized day by day itinerary for free',
    button: {
      title: 'Start Planning',
      url: '/guides',
    },
  },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function SlickCarousel() {
  return (
    <Slider {...settings}>
      {carouselItems.map((item) => (
        <Paper
          key={item.id}
          sx={{
            height: 500,
            backgroundImage: `url(${item.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          component="section"
        >
          <Box
            sx={{
              height: '100%',
              width: { sm: '100%', md: '40%' },
              px: 4,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h3" color="white" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1" color="white" gutterBottom>
                {item.subTitle}
              </Typography>
              {item?.button && (
                <RouterLink to={item.button.url}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    {item.button.title}
                  </Button>
                </RouterLink>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Slider>
  );
}
