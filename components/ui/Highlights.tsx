import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Gallery from "./Gallery.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  labelTop?: string;
  labelBottom?: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="flex flex-col py-10">
      <h2 class=" relative text-center py-10">
        <Text variant="heading-2">{title}</Text>
      </h2>

      <Gallery
        class="gap-3"
        snap=""
      >
        {highlights.map(({ href, src, alt, labelTop,labelBottom }) => (
          <a
            href={href}
            class=" relative flex flex-col gap-4 items-center min-w-[190px]"
          >
            <span class="absolute top-0 left-0 p-2 text-heading-2 text-default-inverse">{labelTop}</span>
            <Image
              class="rounded-[0px]"
              src={src}
              alt={alt}
              width={613}
              height={423}
            />
            <span class="absolute bottom-0 left-0 p-2 text-heading-3 text-default-inverse">{labelBottom}</span>
          </a>
        ))}
      </Gallery>
    </div>
  );
}

export default Highlights;
