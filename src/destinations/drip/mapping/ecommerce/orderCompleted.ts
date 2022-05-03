import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";

export default function orderCompleted({
  properties,
}: Ecommerce.OrderCompleted): TEvent<"Order Completed"> {
  // Note that Drip's version of Liquid templating language doesn't support nested properties or arrays, so we must add
  // top-level properties currently for each product.
  const productsNumbered: any = {};
  properties.products?.forEach((product, key) => {
    Object.keys(product).forEach((productKey) => {
      productsNumbered[`product_${key + 1}_${productKey}`] = (product as any)[
        productKey
      ];
    });
  });

  return {
    name: "Order Completed",
    properties: {
      // Drip requires the value in Zero Decimal form (cents not dollars)
      value: (properties.total || properties.revenue) * 100,
      // Set the other properties available as custom properties
      affiliation: properties.affiliation,
      coupon: properties.coupon,
      currency: properties.currency,
      discount: properties.discount,
      order_id: properties.order_id,
      products: properties.products?.map((i) => ({
        price: i.price ? i.price * 100 : undefined,
        ...i,
      })),
      ...productsNumbered,
      shipping: properties.shipping,
      tax: properties.tax,
    },
  };
}
