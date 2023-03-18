import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const title = (
    <Text
      class="flex-grow min-h-[40px] flex items-center justify-start text-uppercase text-xs tracking-[1.2px]"
      variant={level === 0 ? "menu" : "caption"}
    >
      {item.label}
    </Text>
  );

  return (
    <li>
      <div
        class={`flex justify-between items-center w-full py-2 ${
          level > 0 ? "pl-2" : ""
        }`}
        onClick={() => {
          if (hasChildren) open.value = !open.value;
        }}
      >
        {hasChildren
          ? title
          : <a class="w-full inline-block" href={item.href}>{title}</a>}
      </div>

      {hasChildren && (
        <ul class={`flex-col ${open.value === true ? "flex" : "hidden"}`}>
          {item.children!.map((node) => (
            <MenuItem
              item={node}
              level={level + 1}
            />
          ))}
          <li>
            <a href={item.href} class="w-full py-2 pl-2 inline-block">
              <Text class="underline" variant="caption">
                Ver Tudo
              </Text>
            </a>
          </li>          
        </ul>
      )}
    </li>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="px-4 flex-grow flex w-full justify-between">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>
    </>
  );
}

export default Menu;
