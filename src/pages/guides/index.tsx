import SearchInput from '@components/filters/SearchInput';
import MediaCard from '@components/media-card';
import { db } from '@config/firebase';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { localNumberFormat } from '@utils/formatters';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface Response {
  id: string;
  title: string;
  subTitle: string;
  cost: number;
  duration: string;
  location: string;
  img: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

function Guides() {
  const [guides, setGuides] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const collectionRef = collection(db, 'guides');

  const fetchGuides = async () => {
    setIsLoading(true);
    const querySnapShot = await getDocs(collectionRef);

    if (!querySnapShot.empty) {
      const guideList: Response[] = [];
      querySnapShot.forEach((pkg) => {
        const info = pkg.data() as Response;
        guideList.unshift({ ...info, id: pkg.id });
      });

      setGuides(guideList);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        Guides
      </Typography>
      <Container>
        <Box
          width="100%"
          sx={{ display: 'grid', placeItems: 'end', margin: '2rem 0' }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
            }}
          >
            <SearchInput />
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          gap={5}
          flexWrap="wrap"
          marginY={5}
        >
          {isLoading && (
            <Box textAlign="center">
              <CircularProgress size={30} />
            </Box>
          )}

          {guides.map(({ id, title, cost, duration, img }) => (
            <MediaCard
              key={id}
              url={`${id}`}
              title={title}
              mediaUrl={img}
              mediaAlt={`img-${id}`}
              mediaHeight="320"
              actions={
                <Box
                  display="flex"
                  justifyContent="center"
                  gap={1}
                  width="100%"
                  paddingBottom={2}
                >
                  <Paper sx={{ backgroundColor: 'primary.light' }}>
                    <Typography color="white" paddingX={1} variant="h6">
                      {localNumberFormat({ number: cost })}
                    </Typography>
                  </Paper>
                  <Paper>
                    <Typography paddingX={1} variant="h6">
                      {duration}
                    </Typography>
                  </Paper>
                </Box>
              }
            />
          ))}
        </Box>
        <Box textAlign="center">
          <Button variant="outlined">Load More</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Guides;
