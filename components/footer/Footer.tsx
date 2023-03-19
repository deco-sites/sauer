import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };

export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <>
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a
            class="no-underline text-product-4 text-primary leading-3 tracking-wider uppercase list-none lg:text-product-3"
            href={item.href}
          >
            {item.label}
          </a>
        )}
    </>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`px-6 pt-8 pb-12 lg:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  firstSection?: Section;
  secondSection?: Section;
  payments?: Section;
}

function Footer({ firstSection, secondSection, payments }: Props) {
  return (
    <footer class="w-full bg-footer">
      <Container>
        <FooterContainer class="flex flex-col">
          {/* Logo */}
          <div class="mb-8">
            <a
              href="/"
              class={`flex-grow inline-flex items-center`}
              aria-label="Store logo"
            >
              <Icon id="Logo" class="lg:hidden" width={100} height={15} />
              <Icon id="Logo" class="hidden lg:block" width={140} height={20} />
            </a>
          </div>
          {/* Sections */}
          <div class="flex flex-col justify-between lg:flex-row">
            <div class="flex flex-col lg:flex-row-reverse lg:justify-end lg:gap-x-[116px]">
              {/* Section 1 */}
              {firstSection && (
                <div class="mb-8">
                  <ul class="flex flex-row gap-x-10 lg:flex-col">
                    {firstSection.children.map((subsection) => (
                      <li class="lg:mb-3">
                        <SectionItem item={subsection} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Section 2 */}
              {secondSection && (
                <div class="mb-8">
                  <ul class="flex flex-col">
                    {secondSection.children.map((subsection) => (
                      <li class="mb-3">
                        <SectionItem item={subsection} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Payments */}
            {payments && (
              <div class="mb-12">
                <ul class="flex flex-row gap-x-5 lg:justify-end">
                  {payments.children.map((subsection) => (
                    <li class="lg:mb-3">
                      <SectionItem item={subsection} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Address */}
          <div class="mb-0">
            <p class="text-breadcrumb text-primary leading-3 tracking-normal flex flex-col gap-y-1 lg:text-product-3 lg:flex-row lg:gap-x-1">
              <span class="font-medium">
                Amsterdam Sauer Joalheiros LTDA
              </span>
              <span>
                Rua Visconde de Pirajá 250, 9º andar, Rio de Janeiro - RJ
              </span>
              <span>CEP: 22410-000 CNPJ: 33.398.975/0001-79</span>
            </p>
          </div>
        </FooterContainer>
      </Container>
    </footer>
  );
}

export default Footer;
