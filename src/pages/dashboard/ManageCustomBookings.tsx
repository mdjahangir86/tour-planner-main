/* eslint-disable no-alert */
import { db } from '@config/firebase';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ResponseTypeCustomBooking } from 'types';

function ManageCustomBookings() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<ResponseTypeCustomBooking[]>([]);

  const fetchBookings = () => {
    setLoading(true);

    const q = query(collection(db, 'custom-bookings'));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const dataList: ResponseTypeCustomBooking[] = [];
          querySnapshot.forEach((docFire) => {
            const docData = docFire.data() as ResponseTypeCustomBooking;
            dataList.unshift({ ...docData, id: docFire.id });
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

  const bookingActionHandler = (
    action: 'accepted' | 'canceled',
    id: string
  ) => {
    const confirmed = window.confirm('Are you sure?');

    if (!confirmed) {
      return null;
    }
    setLoading(true);

    const docRef = doc(db, 'custom-bookings', id);

    updateDoc(docRef, {
      status: action,
    }).finally(() => {
      fetchBookings();
    });

    return null;
  };

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
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
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

                {booking.status === 'pending' && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        bookingActionHandler('accepted', booking.id!)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        bookingActionHandler('canceled', booking.id!)
                      }
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

export default ManageCustomBookings;
