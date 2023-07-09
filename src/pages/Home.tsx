import CallToAction from "@components/cta";
import SlickCarousel from "@components/slick-carousel";
import TourPackages from "@components/tour-packages";
import { Box, Typography } from "@mui/material";
import carouselImg from "../assets/images/home/carousel/carousel-01.webp";

const topCarouselItems = [
  {
    id: 1,
    url: carouselImg,
    title: "The new way to plan your next trip",
    subTitle: "Create a fully customized day by day itinerary for free",
    button: {
      title: "Start Planning",
      url: "/packages",
    },
  },
  {
    id: 2,
    url: carouselImg,
    title: "The new way to plan your next trip",
    subTitle: "Create a fully customized day by day itinerary for free",
    button: {
      title: "Start Planning",
      url: "/guides",
    },
  },
  {
    id: 3,
    url: carouselImg,
    title: "The new way to plan your next trip",
    subTitle: "Create a fully customized day by day itinerary for free",
    button: {
      title: "Start Planning",
      url: "/guides",
    },
  },
];

const locationCarouselOne = [
  {
    id: 1,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image021.jpg",
    title: "Ratatgul Swamp Forest",
    subTitle: "Ratargul Swamp Forest is the only swamp forest in Bangladesh",
  },
  {
    id: 2,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image007.jpg",
    title: "Rangamati",
    subTitle:
      "The District of Chittagong Hill Tracks area in Rangamati, a place full of natural amusement.",
  },
  {
    id: 3,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image024.jpg",
    title: "Lalakhal",
    subTitle: "Lalakhal is the most attractive and wide canal in Sylhet",
  },
];

const locationCarouselTwo = [
  {
    id: 1,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image011.jpg",
    title: "Lalbag Fort",
    subTitle:
      "Lalbag Fort or Aurangabad is another most famous historical place in Bangladesh",
  },
  {
    id: 2,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image013.jpg",
    title: "Star Mosque",
    subTitle: "It is a famous tourist attraction in old Dhaka.",
  },
  {
    id: 3,
    url: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image017.jpg",
    title: "Bisanakandi",
    subTitle:
      "Undoubtedly it is a great sign of natural beauty surrounded by hills and stones",
  },
];

function Home() {
  return (
    <>
      <SlickCarousel items={topCarouselItems} />

      <Box marginY={8} />

      <CallToAction />

      <TourPackages home />

      <Box marginY={10} />

      <Typography textAlign="center" variant="h3">
        Some of the Tourist Places
      </Typography>

      <Box marginY={10} />

      <SlickCarousel items={locationCarouselOne} />

      <Box marginY={10} />

      <SlickCarousel items={locationCarouselTwo} autoplaySpeed={3500} />

      <Box marginY={10} />
    </>
  );
}

export default Home;
