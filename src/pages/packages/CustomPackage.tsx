import { db } from "@config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@hooks/useRedux";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type FormValues = {
  name: string;
  phone: string;
  title: string;
  description: string;
  budget: number;
  duration: string;
  location: string;
};

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone is required"),
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  budget: yup.number().required("budget is required"),
  duration: yup.string().required("duration is required"),
  location: yup.string().required("location is required"),
});

function CustomPackage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useAppSelector((state) => state.auth);

  const collectionRef = collection(db, "custom-bookings");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      title: "",
      description: "",
      budget: 0,
      duration: "",
      location: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box marginY={10}>
      <Typography
        variant="h4"
        textAlign="center"
        textTransform="uppercase"
        fontWeight={900}
      >
        Custom Package
      </Typography>

      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          margin: "auto",
          width: "100%",
          maxWidth: 700,
          marginTop: 30,
        }}
        onSubmit={handleSubmit((values) => {
          setIsLoading(true);

          const timeStamp = new Date();

          addDoc(collectionRef, {
            ...values,
            status: "pending",
            userInfo,
            userId: userInfo.uid,
            createdAt: timeStamp,
            updatedAt: timeStamp,
          })
            .then(() => {
              navigate("/dashboard/my-custom-bookings");
            })
            .finally(() => setIsLoading(false));
        })}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="your name"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="phone"
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
            />
          )}
        />

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="title"
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="location"
              error={!!errors?.location}
              helperText={errors?.location?.message}
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
          name="budget"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="budget"
              error={!!errors?.budget}
              helperText={errors?.budget?.message}
            />
          )}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="duration"
              error={!!errors?.duration}
              helperText={errors?.duration?.message}
            />
          )}
        />

        {userInfo ? (
          <Box textAlign="center">
            {isLoading ? (
              <Button variant="outlined" type="submit" disabled={isLoading}>
                <CircularProgress size={30} />
              </Button>
            ) : (
              <Button type="submit" variant="contained" size="large">
                Place Offer
              </Button>
            )}
          </Box>
        ) : (
          <Box textAlign="center">
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
            >
              Submit Package
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
}

export default CustomPackage;
