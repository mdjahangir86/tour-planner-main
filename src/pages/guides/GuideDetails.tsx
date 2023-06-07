import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { db } from '@config/firebase';
import { localNumberFormat } from '@utils/formatters';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export interface Response {
  id: string;
  title: string;
  subTitle: string;
  cost: number;
  duration: string;
  description: string;
  location: string;
  img: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

function GuideDetails() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [guideInfo, setGuideInfo] = useState<Response>({
    id: '',
    title: '',
    subTitle: '',
    description: '',
    cost: 0,
    duration: '',
    location: '',
    img: '',
    images: [],
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    (async () => {
      if (itemId) {
        setIsLoading(true);
        const docRef = doc(db, 'guides', itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Response;

          setGuideInfo({ ...data, id: docSnap.id });
          setIsLoading(false);
        }
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={10}>
      <Box
        paddingY={10}
        paddingX={5}
        bgcolor={(theme) => theme.palette.primary.main}
        sx={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography color="white" variant="h2" gutterBottom>
          {guideInfo.title}
        </Typography>
        {!!guideInfo?.subTitle && (
          <Typography color="white" variant="subtitle1">
            {guideInfo.subTitle}
          </Typography>
        )}
      </Box>

      <Box width="100%" textAlign="center">
        <Swiper
          style={{ maxHeight: 600, width: '100%' }}
          modules={[Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
          }}
        >
          {guideInfo.images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  style={{ backgroundSize: 'cover' }}
                  src={image}
                  alt={guideInfo.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <Box display="flex" justifyContent="center" gap={1}>
        <Chip
          color="info"
          label={`${localNumberFormat({ number: guideInfo.cost })} / ${
            guideInfo.duration
          }`}
        />
        <Chip color="secondary" label={guideInfo.location} />
      </Box>

      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={() => navigate(`/booking/${guideInfo.id}?type=guides`)}
        >
          Book Now
        </Button>
      </Box>

      <Paper>
        <Box paddingX={5} paddingY={2} whiteSpace="pre-wrap">
          {guideInfo.description}
        </Box>
      </Paper>
    </Box>
  );
}

export default GuideDetails;
