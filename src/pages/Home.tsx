import CallToAction from '@components/cta';
import SlickCarousel from '@components/slick-carousel';
import TourPackages from '@components/tour-packages';
import { Box } from '@mui/material';

function Home() {
  return (
    <Box>
      <SlickCarousel />

      <Box marginY={10} />

      <CallToAction />

      <Box marginY={10} />

      <TourPackages home />

      <Box marginY={10} />
    </Box>
  );
}

export default Home;
