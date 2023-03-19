import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useSignal } from "@preact/signals";

const POSSIBILITY = "Tamanho";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const possibilities = useVariantPossibilities(product);

  return (
    <div class="flex flex-col gap-3 lg:gap-10">
      <div class="hidden lg:block">
        <p class="text-product-3 text-primary leading-3 tracking-widest uppercase lg:text-product-2">
          {POSSIBILITY}
        </p>
      </div>

      <select class="border-b-1 border-primary text-primary cursor-pointer outline-none p-3 text-product-4 w-[196px] lg:text-button">
        <option value={""}>
          Selecione um tamanho
        </option>
        {Object.entries(possibilities[POSSIBILITY]).slice(1).map((
          [url, value],
        ) => (
          <option value={url}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VariantSelector;
