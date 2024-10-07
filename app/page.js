// app/page.js

export const revalidate = 0; // Disable Next.js caching

import client from "./lib/apolloClient";
import { gql } from "@apollo/client";
import ProductCard from "./components/ProductCard";
import Link from "next/link";

// Define the GraphQL query
const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      nodes {
        content
        title
        products {
          date
          price
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
  }
`;

export default async function Home() {
  let products = [];

  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
      fetchPolicy: "no-cache", // Ensure fresh data
    });
    products = data?.products?.nodes || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      <h1 className="text-center font-extrabold text-3xl text-orange-400 pt-4">
        Product List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
