import { useContext, useEffect, useState } from 'react';
import UserAccount from './context/UserAccount';
import { fetchArticles } from './utils/api';
import { StackedLayout } from '@/components/catalyst-ui-kit/stacked-layout';
import HeaderNavBar from './components/HeaderNavBar';
import SideNavBar from './components/SideNavBar';
import AppRouter from './router/AppRouter';

function App() {
  const { loggedUser } = useContext(UserAccount);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchArticles().then((articles) => {
      console.log(articles);
    });
  }, []);

  return (
    <StackedLayout navbar={<HeaderNavBar />} sidebar={<SideNavBar />}>
      <AppRouter />
    </StackedLayout>
  );
}

export default App;
