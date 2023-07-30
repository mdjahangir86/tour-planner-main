import { db } from "@config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

interface ManageGuidesFormProps {
  mode: "create" | "edit";
}

type ImageListItem = {
  url: string;
};

interface FormValues {
  title: string;
  subTitle: string;
  description: string;
  cost: number;
  duration: string;
  location: string;
  img: string;
  images: ImageListItem[];
}

const urlRegEx = /^(.*)$/gm;

const schema = yup.object().shape({
  title: yup.string().required("title is required"),
  subTitle: yup.string().required("sub title is required"),
  description: yup.string().required("description is required"),
  cost: yup.number().required("cost is required"),
  duration: yup.string().required("duration is required"),
  location: yup.string().required("location is required"),
  img: yup
    .string()
    .matches(urlRegEx, "URL is not valid")
    .required("featured image is required"),
  images: yup.array(
    yup.object({
      url: yup
        .string()
        .matches(urlRegEx, "URL is not valid")
        .required("url is required"),
    })
  ),
});

const PLACEHOLDER_IMAGE_URL = "https://picsum.photos/200";

function ManageGuidesForm({ mode }: ManageGuidesFormProps) {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const collectionRef = collection(db, "guides");

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      subTitle: "",
      description: "",
      cost: 0,
      duration: "",
      location: "",
      img: PLACEHOLDER_IMAGE_URL,
      images: [{ url: PLACEHOLDER_IMAGE_URL }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const featuredImage = watch("img");
  const imageList = watch("images");

  useEffect(() => {
    (async () => {
      if (mode === "edit" && itemId) {
        setIsLoading(true);
        const docRef = doc(db, "guides", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const updatedImageList = data?.images?.map((image: string) => {
            return {
              url: image,
            };
          });
          setIsLoading(false);
          reset({ ...data, images: updatedImageList });
        }
      }
    })();
  }, [mode]);

  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        textTransform="uppercase"
        fontWeight={900}
      >
        {mode === "create" ? "Add New Guide" : "Edit Guide"}
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
          const updatedImages = values.images.map(({ url }) => url);
          const timeStamp = new Date();

          if (mode === "create") {
            addDoc(collectionRef, {
              ...values,
              type: "guide",
              images: updatedImages,
              createdAt: timeStamp,
              updatedAt: timeStamp,
            })
              .then((res) => {
                navigate(`/dashboard/manage-guides/edit/${res.id}`);
              })
              .finally(() => setIsLoading(false));
          } else if (mode === "edit" && itemId) {
            const docRef = doc(db, "guides", itemId);

            updateDoc(docRef, {
              ...values,
              images: updatedImages,
              updatedAt: timeStamp,
            }).finally(() => setIsLoading(false));
          }
        })}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="name"
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
        <Controller
          name="subTitle"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="sub title"
              error={!!errors?.subTitle}
              helperText={errors?.subTitle?.message}
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
          name="cost"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="cost"
              error={!!errors?.cost}
              helperText={errors?.cost?.message}
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

        {!!featuredImage && (
          <Box
            sx={{
              margin: "auto",
              borderRadius: 3,
              overflow: "hidden",
              height: 200,
              width: 200,
            }}
          >
            <img
              src={
                featuredImage ||
                "https://dummyimage.com/200x200/000/fff.jpg&text=placeholder"
              }
              alt="featuredImage"
            />
          </Box>
        )}

        <Controller
          name="img"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="featured image"
              error={!!errors?.img}
              helperText={errors?.img?.message}
            />
          )}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          {imageList?.map((image, index) => {
            return (
              <Box
                key={index}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  height: 200,
                  width: 200,
                }}
              >
                <img
                  src={
                    image.url ||
                    "https://dummyimage.com/600x300/000/fff.jpg&text=placeholder"
                  }
                  alt={`img-${index}`}
                />
              </Box>
            );
          })}
        </Box>

        {fields.map((fld, index) => {
          return (
            <Box key={fld.id} sx={{ display: "flex" }}>
              <Controller
                name={`images.${index}.url`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="image url"
                    error={!!errors?.images?.[index]}
                    helperText={errors?.images?.[index]?.url?.message}
                  />
                )}
              />
              <Box
                sx={{
                  display: "flex",
                  width: 75,
                }}
              >
                <IconButton
                  disabled={imageList.length === 3}
                  onClick={() => {
                    append({ url: "https://picsum.photos/200" });
                  }}
                >
                  <AddCircleIcon />
                </IconButton>

                <IconButton
                  disabled={imageList.length === 1}
                  color="warning"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        <Box textAlign="center">
          {isLoading ? (
            <Button variant="outlined" type="submit" disabled={isLoading}>
              <CircularProgress size={30} />
            </Button>
          ) : (
            <Button type="submit" variant="contained" size="large">
              {mode === "create" ? "Add" : "Update"}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default ManageGuidesForm;
