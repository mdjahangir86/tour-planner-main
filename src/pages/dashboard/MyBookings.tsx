import { db } from '@config/firebase';
import { useAppSelector } from '@hooks/useRedux';
import { Box, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponseTypeBooking } from 'types';

function MyBookings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<ResponseTypeBooking[]>([]);

  const { userInfo } = useAppSelector((state) => state.auth);

  const fetchBookings = () => {
    setLoading(true);

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userInfo.uid)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const dataList: ResponseTypeBooking[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as ResponseTypeBooking;
            dataList.unshift(docData);
          });

          setBookings(dataList);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" fontWeight={600}>
        Bookings
      </Typography>

      {bookings.length === 0 && (
        <Typography textAlign="center">No Booking Found!</Typography>
      )}

      {bookings?.map((booking, index) => {
        const date = new Date(booking.date.toDate()).toLocaleDateString();

        return (
          <Paper key={index}>
            <Box
              padding={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    component="span"
                    role="button"
                    onClick={() =>
                      navigate(
                        `/${booking.type === 'guide' ? 'guides' : 'packages'}/${
                          booking.itemId
                        }`
                      )
                    }
                  >
                    {booking.itemInfo.title}
                  </Box>
                </Typography>
                <Typography>{booking.email}</Typography>
                <Typography>{booking.phoneNumber}</Typography>
                {booking.description && (
                  <Typography>{booking.description}</Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Chip color="info" label={booking.type} />
                <Chip color="success" label={booking.status} />
                <Chip color="secondary" label={`${date}`} />
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

export default MyBookings;
