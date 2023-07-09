import {
  Box,
  Button,
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

function PackageDetails() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [packageInfo, setPackageInfo] = useState<Response>({
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
        const docRef = doc(db, "packages", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Response;

          setPackageInfo({ ...data, id: docSnap.id });
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
          {packageInfo?.title}
        </Typography>
        {!!packageInfo?.subTitle && (
          <Typography color="white" variant="subtitle1">
            {packageInfo.subTitle}
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
          title={packageInfo?.title}
          mediaUrl={packageInfo?.images[0]}
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
                  <Button variant="contained">৳ {packageInfo.cost}</Button>
                </Paper>
                <Paper>
                  <Typography paddingX={1} variant="h6">
                    {packageInfo.duration} days
                  </Typography>
                </Paper>
                <Paper>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(`/booking/${packageInfo.id}?type=packages`)
                    }
                  >
                    Book Now
                  </Button>
                </Paper>
              </Box>
            </>
          }
        />
        <Box marginBottom={10} paddingX={5} marginTop={5}>
          <h1>Description</h1>
          {packageInfo?.description}
        </Box>
      </Box>
    </>
  );
}

export default PackageDetails;
