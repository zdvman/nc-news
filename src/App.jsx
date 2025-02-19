import { StackedLayout } from '@/components/catalyst-ui-kit/stacked-layout';
import HeaderNavBar from './components/HeaderNavBar';
import SideNavBar from './components/SideNavBar';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <StackedLayout navbar={<HeaderNavBar />} sidebar={<SideNavBar />}>
      <AppRouter />
    </StackedLayout>
  );
}

export default App;
