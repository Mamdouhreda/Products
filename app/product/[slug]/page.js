// /app/product/[slug]/page.js

import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import Image from "next/image";
import { notFound } from "next/navigation";

// GraphQL query to fetch a single product by slug
const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      content(format: RENDERED)
      title
      products {
        date
        price
        auther
      }
      featuredImage {
        node {
          uri
          sourceUrl
        }
      }
      slug
    }
  }
`;

export default async function ProductPage({ params }) {
  const { slug } = params;

  let product = null;

  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_SLUG,
      variables: { slug },
    });

    product = data?.product || null;

    if (!product) {
      notFound(); // Return a 404 page if no product is found
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    notFound(); // Return a 404 page on error
  }

  return (
    <div className="container mx-auto rounded-2xl bg-[#F5F5F5] min-h-screen shadow-md shadow-black mt-5">
      <div className="relative">
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-semibold">
          {product.title}
        </h1>
        <Image
          alt={product.title}
          src={product.featuredImage?.node?.sourceUrl || "/default-image.jpg"}
          className="rounded-t-2xl w-full max-h-48 object-cover"
          width={1500}
          height={500}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between pb-5 font-sans font-bold text-orange-400">
          <h1>{new Date(product.products.date).toLocaleDateString()}</h1>
          <h1>{product.products.auther}</h1>
          <h1>{product.products.price}£</h1>
        </div>
        <div
          className="text-[#242424] font-serif text-lg"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>
    </div>
  );
}
