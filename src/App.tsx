import FallBackSpinner from '@components/fallback-spinner';
import PrivateRoute from '@components/PrivateRoutes';
import { useAuth } from '@hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import DashboardLayout from '@layouts/DashboardLayout';
import SiteLayout from '@layouts/SiteLayout';
import UserProfile from '@pages/dashboard/Profile';
import { initialAuthCheck } from '@store/user/authSlice';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home'));
const NotFound = lazy(() => import('@pages/NotFound'));

const Guides = lazy(() => import('@pages/guides'));
const GuideDetails = lazy(() => import('@pages/guides/GuideDetails'));

const Packages = lazy(() => import('@pages/packages'));
const PackageDetails = lazy(() => import('@pages/packages/PackageDetails'));

const Authentication = lazy(() => import('@pages/Authentication'));

const ManagePackages = lazy(() => import('@pages/dashboard/ManagePackages'));
const ManageGuides = lazy(() => import('@pages/dashboard/ManageGuides'));
const ManageBookings = lazy(() => import('@pages/dashboard/ManageBookings'));
const MyBookings = lazy(() => import('@pages/dashboard/MyBookings'));
const ManagePackagesForm = lazy(
  () => import('@pages/dashboard/ManagePackagesForm')
);
const ManageGuidesForm = lazy(
  () => import('@pages/dashboard/ManageGuidesForm')
);
const BookingForm = lazy(() => import('@pages/BookingForm'));

function App() {
  const { pathname } = useLocation();
  const { loading, user } = useAuth();
  const { isAuthChecked } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !isAuthChecked) {
      dispatch(initialAuthCheck());
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  if (loading) {
    return <FallBackSpinner />;
  }

  return (
    <Suspense fallback={<FallBackSpinner />}>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Home />} />

          <Route path="guides" element={<Guides />} />
          <Route path="guides/:itemId" element={<GuideDetails />} />

          <Route path="packages" element={<Packages />} />
          <Route path="packages/:itemId" element={<PackageDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/booking/:itemId" element={<BookingForm />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<UserProfile />} />

              <Route
                path="/dashboard/manage-packages"
                element={<ManagePackages />}
              />
              <Route
                path="/dashboard/manage-packages/new"
                element={<ManagePackagesForm mode="create" />}
              />
              <Route
                path="/dashboard/manage-packages/edit/:itemId"
                element={<ManagePackagesForm mode="edit" />}
              />

              <Route
                path="/dashboard/manage-guides"
                element={<ManageGuides />}
              />
              <Route
                path="/dashboard/manage-guides/new"
                element={<ManageGuidesForm mode="create" />}
              />
              <Route
                path="/dashboard/manage-guides/edit/:itemId"
                element={<ManageGuidesForm mode="edit" />}
              />

              <Route
                path="/dashboard/manage-bookings"
                element={<ManageBookings />}
              />
              <Route path="/dashboard/my-bookings" element={<MyBookings />} />
            </Route>
          </Route>

          <Route path="login" element={<Authentication />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
