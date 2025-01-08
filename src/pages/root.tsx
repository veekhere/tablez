import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <main className='min-h-full min-w-full'>
      <Outlet />
    </main>
  );
}
