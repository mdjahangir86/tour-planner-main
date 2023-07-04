import { db } from '@config/firebase';
import { useAppSelector } from '@hooks/useRedux';
import { Box, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ResponseTypeCustomBooking } from 'types';

function MyCustomBookings() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<ResponseTypeCustomBooking[]>([]);

  const { userInfo } = useAppSelector((state) => state.auth);

  const fetchBookings = () => {
    setLoading(true);

    const q = query(
      collection(db, 'custom-bookings'),
      where('userId', '==', userInfo.uid)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const dataList: ResponseTypeCustomBooking[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as ResponseTypeCustomBooking;

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
        Custom Bookings
      </Typography>

      {bookings.length === 0 && (
        <Typography textAlign="center">No Booking Found!</Typography>
      )}

      {bookings?.map((booking, index) => {
        const date = new Date(booking.createdAt.toDate()).toLocaleDateString();

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
                  <Box component="span" role="button">
                    {booking.title}
                  </Box>
                </Typography>
                <Typography>{booking.name}</Typography>
                <Typography>{booking.phone}</Typography>
                <Typography>Location: {booking.location}</Typography>

                {booking.description && (
                  <Typography>Description: {booking.description}</Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Chip
                  color={booking.status === 'canceled' ? 'error' : 'success'}
                  label={booking.status}
                />
                <Chip color="secondary" label={`${booking.budget}tk`} />
                <Chip color="info" label={booking.duration} />
                <Chip color="default" label={date} />
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

export default MyCustomBookings;
