import ConfirmDialog from '@components/ConfirmDialog';
import { db } from '@config/firebase';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';

import { localNumberFormat } from '@utils/formatters';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function ManagePackages() {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box textAlign="end">
        <Button
          startIcon={<AddCircleIcon />}
          variant="contained"
          onClick={() => navigate('/dashboard/manage-packages/new')}
        >
          Add New
        </Button>
      </Box>

      {isLoading && (
        <Box textAlign="center">
          <CircularProgress size={30} />
        </Box>
      )}

      {packages.map((pkg) => (
        <Paper key={pkg.id}>
          <Box
            sx={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="h5">{pkg.title}</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  color="info"
                  label={`${localNumberFormat({ number: pkg.cost })} / ${
                    pkg.duration
                  }`}
                />
                <Chip color="secondary" label={`${pkg.location}`} />
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() =>
                  navigate(`/dashboard/manage-packages/edit/${pkg.id}`)
                }
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                color="warning"
                onClick={() => {
                  setDeleteId(pkg.id);
                  setIsDeleteConfirmed(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
      {isDeleteConfirmed && (
        <ConfirmDialog
          open={isDeleteConfirmed}
          onClose={() => setIsDeleteConfirmed(false)}
          title="Do you want to delete this item?"
          action={
            <Box>
              <Button onClick={() => setIsDeleteConfirmed(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  setIsDeleteConfirmed(false);
                  const docRef = doc(db, 'packages', String(deleteId));

                  await deleteDoc(docRef);
                  await fetchPackages();
                }}
                autoFocus
              >
                Confirm
              </Button>
            </Box>
          }
        />
      )}
    </Box>
  );
}

export default ManagePackages;
