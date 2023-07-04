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
import { useNavigate } from 'react-router-dom';

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

function Packages() {
  const [packages, setPackages] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const collectionRef = collection(db, 'packages');

  const fetchPackages = async () => {
    setIsLoading(true);
    const querySnapShot = await getDocs(collectionRef);

    if (!querySnapShot.empty) {
      const packageList: Response[] = [];
      querySnapShot.forEach((pkg) => {
        const info = pkg.data() as Response;
        packageList.unshift({ ...info, id: pkg.id });
      });

      setPackages(packageList);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        Packages
      </Typography>

      <Box textAlign="center" my={3}>
        <Button
          variant="contained"
          onClick={() => navigate('/packages/custom')}
        >
          Create Package
        </Button>
      </Box>

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

          {!isLoading &&
            packages.map(({ id, title, cost, duration, img }) => (
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
      </Container>
    </Box>
  );
}

export default Packages;
