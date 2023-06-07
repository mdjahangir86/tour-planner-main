import { db } from '@config/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/useRedux';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ResponseType } from 'types';
import * as yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  description?: string;
  date: string;
}

const schema = yup.object({
  name: yup.string().required('name is required'),
  email: yup.string().email('need valid email').required('email is required'),
  description: yup.string().notRequired(),
  phoneNumber: yup
    .string()
    .min(11, 'enter a valid phone number')
    .required('phone number is required'),
  date: yup.date().required('date is required'),
});

function BookingForm() {
  const { itemId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<ResponseType>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const docRef = doc(db, searchParams.get('type') || '', itemId || '');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as ResponseType;

        setLoading(false);
        setBookingInfo({ ...data, id: docSnap.id });
      }
    })();
  }, [itemId]);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box component="section" maxWidth={1920}>
      <Box marginY={5}>
        <Typography variant="h4" fontWeight={900} textAlign="center">
          Place Booking Request
        </Typography>
      </Box>

      <Paper
        sx={{
          maxWidth: 700,
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 3,
            padding: 3,
            marginBottom: 5,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {bookingInfo?.title}
          </Typography>
          <Box>
            <Chip
              label={`${bookingInfo?.cost} / ${bookingInfo?.duration}`}
              color="info"
            />
          </Box>
        </Box>
      </Paper>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(async (values) => {
          setLoading(true);
          const collectionRef = collection(db, 'bookings');

          const data = {
            ...values,
            userId: userInfo.uid,
            itemId,
            status: 'pending',
            type: bookingInfo?.type,
            itemInfo: bookingInfo,
          };

          try {
            const response = await addDoc(collectionRef, data);

            if (response.id) {
              setLoading(false);
              navigate('/dashboard/my-bookings');
            }
          } catch (error) {
            setLoading(false);
          }
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: 500,
            margin: 'auto',
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="name"
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                label="email"
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={10}
                label="description"
                error={!!errors?.description}
                helperText={errors?.description?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="phone number"
                error={!!errors?.phoneNumber}
                helperText={errors?.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                error={!!errors?.date}
                helperText={errors?.date?.message}
              />
            )}
          />
        </Box>

        <Box textAlign="center" marginY={3}>
          {loading ? (
            <Button variant="outlined" type="submit" disabled={loading}>
              <CircularProgress size={30} />
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Confirm
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default BookingForm;
