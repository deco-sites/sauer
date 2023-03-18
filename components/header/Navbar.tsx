import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { navbarHeightDesktop } from "./constants.ts"
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import Menu from "./Menu.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between flex-wrap items-center w-full px-2 gap-2`}
      >
        <a
          href="/"
          class={`flex-grow inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex-none flex items-center justify-end gap-2">
          <HeaderButton variant="search" />
          <HeaderSearchMenu searchbar={searchbar} />
          <Button
            as="a"
            variant="icon"
            href="/account"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </Button>
          <Button
            variant="icon"
            href="/favoritos"
            aria-label="Favoritos"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
          </Button>

          <Button 
            variant="icon"
            href="/checkout"
            aria-label="Cart"
          >
            <Icon id="Cart" width={20} height={20} strokeWidth={2} />
          </Button>
        </div>

        {/* <div class="grid gap-4 grid-flow-col justify-between w-full">
          {items.map((item) => <Menu items={items} />)}
        </div> */}
        <Menu items={items} />
      </div>

      {/* Desktop Version */}
      <div class={`hidden md:flex flex-row flex-wrap justify-start items-center w-full mt-[20px] mb-[30px] pl-2 pr-[52px] pl-[98px] h-[${navbarHeightDesktop}]`}>
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <Icon id="Logo" width={126} height={16} />
          </a>
        </div>
        <div class="grid gap-4 grid-flow-col justify-start">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none flex items-center justify-end gap-2 order-[-1] w-full">
          <HeaderButton variant="search" />
          <HeaderSearchMenu searchbar={searchbar} />
          <Button
            as="a"
            variant="icon"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
