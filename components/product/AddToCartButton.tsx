import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button
      {...props}
      variant="secondary"
      class="w-[78px] h-7 px-3.5 rounded-b-none border-primary bg-primary text-white lg:w-[142px] lg:h-11 hover:bg-white hover:text-primary"
    >
      <span class="text-product-4 leading-3 tracking-normal font-normal lg:text-product-2">
        Comprar
      </span>
    </Button>
  );
}

export default AddToCartButton;
