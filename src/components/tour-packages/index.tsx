import MediaCard from "@components/media-card";
import RouterLink from "@components/router-link";
import { db } from "@config/firebase";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface TourPackagesProps {
  home?: boolean;
}

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

function TourPackages({ home }: TourPackagesProps) {
  const [packages, setPackages] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const collectionRef = collection(db, "packages");

  const fetchPackages = async () => {
    setIsLoading(true);
    const querySnapShot = await getDocs(collectionRef);

    if (!querySnapShot.empty) {
      const packageList: Response[] = [];
      querySnapShot.forEach((pkg) => {
        const info = pkg.data() as Response;
        packageList.unshift({ ...info, id: pkg.id });
      });

      setPackages(packageList.splice(0, 6));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <Paper
        component="section"
        sx={{ px: 4, py: 3, bgcolor: "#3C414C", color: "white" }}
      >
        {home && (
          <>
            <Box marginY={10} />
            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              <Box
                sx={{
                  flex: { sm: 1, md: 0.5 },
                  textAlign: { sm: "center", md: "right" },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Tour Packages in BANGLADESH
                </Typography>
                <Typography variant="body1" gutterBottom>
                  BANGLADESH has a thousand year old tradition Let&apos;s
                  Explore the BANGLADESH!!
                </Typography>
              </Box>
              <Box sx={{ flex: { sm: 1, md: 0.5 } }}>
                <Typography variant="body1" gutterBottom>
                  If you are planning to explore the BANGLADESH. Then we are
                  here to keep surprising you. We are 100% local tour operator
                  in Bangladesh. We always operate all tours by our own guides.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We don&apos;t just offer tours and travel services but also
                  provide reliable and hassle free travel planning facilities.
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Box marginY={10} />

        <Box display="flex" justifyContent="center" gap={10} flexWrap="wrap">
          {isLoading && (
            <Box textAlign="center">
              <CircularProgress size={30} />
            </Box>
          )}
          {packages.map(({ id, title, cost, duration, img }) => (
            <MediaCard
              key={id}
              url={`/packages/${id}`}
              title={title}
              mediaUrl={img}
              mediaAlt={`img-${id}`}
              mediaHeight="280"
              actions={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap={0.5}
                  width="100%"
                  paddingBottom={2}
                >
                  <Paper>
                    <Typography paddingX={1} variant="h6">
                      {duration} days
                    </Typography>
                  </Paper>
                  <Paper>
                    <Typography
                      bgcolor="primary.light"
                      color="white"
                      paddingX={1}
                      variant="h6"
                    >
                      ৳ {cost}
                    </Typography>
                  </Paper>
                </Box>
              }
            />
          ))}
        </Box>

        <Box marginY={10} />

        {home && (
          <Box width="100%" sx={{ display: "grid", placeItems: "center" }}>
            <RouterLink to="/packages">
              <Button variant="contained" color="secondary">
                More Packages
              </Button>
            </RouterLink>
          </Box>
        )}

        <Box marginY={7} />
      </Paper>
    </>
  );
}

TourPackages.defaultProps = {
  home: false,
};

export default TourPackages;
