import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "deco-sites/std/commerce/types.ts";
import { formatPrice } from "./format.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  currency?: string,
) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement || !currency) {
    return "";
  }

  return `ou ${billingDuration}x de R$ ${
    formatPrice(billingIncrement, currency)
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const currency = aggregateOffer?.priceCurrency;

  return {
    price,
    listPrice: listPrice?.price,
    seller,
    installments: installment && price
      ? installmentToString(installment, currency)
      : null,
  };
};
