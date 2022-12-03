import React, { Suspense } from 'react';
import UploadPicture from 'UploadPicture';
import AlarmList from 'AlarmList';
import ToastRender from 'shared/components/Toast';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ForBidden from 'ForBidden';
import Intro from 'Intro/Intro';
import GallerySetting from 'GallerySetting/GallerySetting';
import RedirectPage from 'Intro/RedirectPage';
import SinglePicPage from './SinglePicture/index';
import OnePicPage from 'SinglePicture/OnePage/OnePicPage';
import AuthCheck from 'shared/hooks/useAuth';
const Header = React.lazy(() => import('shared/components/Header'));
const GalleryFourPic = React.lazy(() => import('Gallery/GalleryFourPic'));
const GalleryAllPic = React.lazy(() => import('Gallery/GalleryAllPic'));
const SingleComment = React.lazy(() => import('./SingleComments/index'));
const AllComment = React.lazy(() => import('./AllComments/AllComments'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <ToastRender />
        <Outlet />
      </>
    ),
    errorElement: <ForBidden />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: '/gallerySetting',
        element: (
          <AuthCheck>
            <GallerySetting />
          </AuthCheck>
        ),
      },
      {
        path: '/alarmList',
        element: (
          <AuthCheck>
            <AlarmList />
          </AuthCheck>
        ),
      },
      {
        path: '/uploadPicture',
        element: (
          <AuthCheck>
            <UploadPicture />
          </AuthCheck>
        ),
      },
      { path: '/localStorage', element: <RedirectPage /> },

      {
        path: '/allPic/:galleryId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GalleryAllPic />
          </Suspense>
        ),
      },
      {
        path: `/fourPic/:galleryId`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GalleryFourPic />
          </Suspense>
        ),
      },
      { path: `/allPic/:galleryId/artworks`, element: <SinglePicPage /> },
      {
        path: '/allPic/:galleryId/artworks/comments',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AllComment />,
          </Suspense>
        ),
      },
      {
        path: '/allPic/:galleryId/:artworkId',
        element: <OnePicPage />,
      },
      {
        path: '/allPic/:galleryId/:artworkId/comments',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleComment />,
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;