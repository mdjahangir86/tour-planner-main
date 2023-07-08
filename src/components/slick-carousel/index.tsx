/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import RouterLink from '@components/router-link';
import { Box, Button, Paper, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './index.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export type CarouselItem = {
  id: number;
  url: string;
  title: string;
  subTitle: string;
  button?: {
    title: string;
    url: string;
  };
};

type SlickCarouselProps = {
  items: CarouselItem[];
  autoplaySpeed?: number;
};

export default function SlickCarousel({
  items,
  autoplaySpeed = 3000,
}: SlickCarouselProps) {
  return (
    <Slider {...{ ...settings, autoplaySpeed }}>
      {items.map((item) => (
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
