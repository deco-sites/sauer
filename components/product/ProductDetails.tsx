import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import ProductSelector from "$store/components/product/ProductVariantSelector.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

const SPECIFICATIONS = [
  {
    name: "Mais Informações",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    name: "Tamanhos e Medidas",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    name: "Cuidados com a Joia",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    sku,
    description,
    offers,
    image: images,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  const productName = product.isVariantOf?.hasVariant[0].name;
  const skuName = product.name;

  return (
    <Container class="py-0 lg:py-16">
      <div class="flex flex-col">
        {/* Breadcrumb - Desktop */}
        <div class="hidden lg:block px-6 py-7 lg:px-0">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>
        <div class="flex flex-col lg:flex-row lg:gap-10">
          {/* Image Gallery */}
          <div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth lg:max-w-[792px] lg:w-[792px] lg:mr-28">
            {[front, back ?? front].map((img, index) => (
              <Image
                style={{ aspectRatio: "375 / 375" }}
                class="min-w-[100vw] lg:h-[fit-content] lg:min-w-[-webkit-fill-available]"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={img.url!}
                alt={img.alternateName}
                width={375}
                height={375}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
          {/* Product Info */}
          <div class="flex-auto px-6 lg:px-0 lg:w-1/2">
            {/* Breadcrumb - Mobile */}
            <div class="lg:hidden py-7 lg:px-0">
              <Breadcrumb
                itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
              />
            </div>
            {/* Code and name */}
            <div class="mt-2">
              <h1 class="text-product-4 text-primary font-medium leading-3 tracking-normal lg:text-product-1">
                {skuName === productName
                  ? productName
                  : `${productName} - ${skuName}`}
              </h1>
            </div>
            {/* Prices */}
            <div class="flex flex-col gap-1 mt-3 lg:gap-0.5">
              <p class="text-product-4 text-primary-ligth leading-3 tracking-normal lg:text-product-3">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </p>
              <p class="text-product-4 text-primary-ligth leading-3 tracking-normal lg:text-product-3">
                {installments}
              </p>
              <p class="text-product-4 text-primary-ligth leading-3 tracking-normal lg:text-product-3">
                <span class="mr-1">Preço à vista:</span>
                <span class="font-bold">
                  {formatPrice(price, offers!.priceCurrency!)}
                </span>
              </p>
            </div>
            {/* Description */}
            <div class="mt-4 lg:mt-12">
              <p class="text-product-4 text-primary leading-3 tracking-normal lg:text-product-2">
                {description}
              </p>
            </div>
            {/* Sku Selector */}
            <div class="mt-4 lg:mt-12">
              <ProductSelector product={product} />
            </div>
            {/* Buy */}
            <div class="mt-4 mb-10 lg:mt-12">
              {seller && (
                <AddToCartButton
                  skuId={sku}
                  sellerId={seller}
                />
              )}
            </div>
            {/* Specifications */}
            <div class="mt-4 lg:mt-12">
              {SPECIFICATIONS.map((specification) => (
                <details class="my-10 max-w-max">
                  <summary class="text-product-3 text-primary leading-3 tracking-widest uppercase list-none lg:text-product-2">
                    {specification.name}
                  </summary>
                  <p class="text-product-4 text-primary tracking-normal leading-6 pt-4 lg:text-product-2 lg:leading-9 lg:pt-8">
                    {specification.value}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
