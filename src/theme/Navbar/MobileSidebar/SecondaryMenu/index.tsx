import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';

function MobileNavbarLinks({items}: {items: NavbarItemConfig[]}): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <ul className="menu__list mobile-navbar-links">
      {items.map((item, index) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={index}
        />
      ))}
    </ul>
  );
}

export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  const items = useThemeConfig().navbar.items as NavbarItemConfig[];
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <>
      <MobileNavbarLinks items={items} />
      {/* Top-level links and the document tree stay in one expanded panel. */}
      {secondaryMenu.content}
    </>
  );
}
