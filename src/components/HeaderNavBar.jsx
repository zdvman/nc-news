import { Detective } from '@phosphor-icons/react';
import { Avatar } from '@/components/catalyst-ui-kit/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/catalyst-ui-kit/dropdown';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/catalyst-ui-kit/navbar';

import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  PlusCircleIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { useContext } from 'react';
import UserAccount from '../context/UserAccount';

{
  /* <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/articles/:article_id' element={<ArtilclePage />} />
      <Route path='/profile' element={<UserProfilePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes> */
}

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Articles', url: '/articles' },
  { label: 'Topics', url: '/topics' },
  { label: 'Profile', url: '/my-profile' },
];

export default function HeaderNavBar() {
  const { loggedUser } = useContext(UserAccount);

  const LoggedInMenu = () => (
    <>
      <DropdownItem href='/my-profile'>
        <UserIcon />
        <DropdownLabel>My Profile</DropdownLabel>
      </DropdownItem>
      <DropdownItem href='/add-article'>
        <PlusCircleIcon />
        <DropdownLabel>Add Article</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href='/logout'>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </>
  );

  const LoggedOutMenu = () => (
    <DropdownItem href='/signin'>
      <ArrowLeftStartOnRectangleIcon />
      <DropdownLabel>Sign in</DropdownLabel>
    </DropdownItem>
  );

  return (
    <Navbar>
      <NavbarSection className='max-lg:hidden'>
        {navItems.map(({ label, url }) => (
          <NavbarItem key={label} href={url}>
            {label}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            {loggedUser ? (
              <Avatar src={loggedUser.avatar_url} square />
            ) : (
              <Detective />
            )}
          </DropdownButton>

          <DropdownMenu className='min-w-64' anchor='bottom end'>
            {loggedUser ? <LoggedInMenu /> : <LoggedOutMenu />}
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
    </Navbar>
  );
}
