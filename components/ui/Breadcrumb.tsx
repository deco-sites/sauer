import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Item({ name, item }: { name?: string; item?: string }) {
  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
      <a href={item}>
        <Text class="text-primary-ligth text-breadcrumb uppercase tracking-wider">
          {name}
        </Text>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="flex flex-row gap-2 items-center w-full">
      <Item name="Home" item="/" />
      {itemListElement.map((item) => (
        <>
          <li class="mt-0.5">
            <Icon id="ChevronRight" width={8} height={8} strokeWidth={1} />
          </li>
          <Item {...item} />
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
