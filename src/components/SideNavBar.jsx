import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarSection,
} from '@/components/catalyst-ui-kit/sidebar';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Topics', url: '/topics' },
  { label: 'Profile', url: '/my-profile' },
];

export default function SideNavBar() {
  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection>
          {navItems.map(({ label, url }) => (
            <SidebarItem key={label} href={url}>
              {label}
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
}
