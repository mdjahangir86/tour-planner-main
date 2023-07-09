import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

// Import Swiper styles
import MediaCard from "@components/media-card";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
    id: "",
    title: "",
    subTitle: "",
    description: "",
    cost: 0,
    duration: "",
    location: "",
    img: "",
    images: [],
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    (async () => {
      if (itemId) {
        setIsLoading(true);
        const docRef = doc(db, "guides", itemId);
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
    <>
      <Box
        paddingY={10}
        paddingX={5}
        bgcolor={(theme) => theme.palette.primary.main}
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography color="white" variant="h2" gutterBottom>
          {guideInfo?.title}
        </Typography>
        {!!guideInfo?.subTitle && (
          <Typography color="white" variant="subtitle1">
            {guideInfo.subTitle}
          </Typography>
        )}
      </Box>
      <Box
        textAlign="center"
        sx={{
          display: "grid",
          placeItems: "center",
        }}
        margin={8}
      >
        <MediaCard
          title={guideInfo?.title}
          mediaUrl={guideInfo?.images[0]}
          mediaHeight="280"
          cardMaxWidth={600}
          cardMinWidth={350}
          actions={
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                gap={0.5}
                width="100%"
                paddingBottom={2}
              >
                <Paper>
                  <Button variant="contained">৳ {guideInfo.cost}</Button>
                </Paper>
                <Paper>
                  <Typography paddingX={1} variant="h6">
                    {guideInfo.duration} days
                  </Typography>
                </Paper>
                <Paper>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/guides/${guideInfo.id}`)}
                  >
                    Book Now
                  </Button>
                </Paper>
              </Box>
            </>
          }
        />

        <Box marginBottom={10} paddingX={5} marginTop={5}>
          <Chip color="secondary" label={guideInfo.location} />
          <h1>Description</h1>
          {guideInfo?.description}
        </Box>
      </Box>
    </>
  );
}

export default GuideDetails;
