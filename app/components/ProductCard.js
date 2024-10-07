import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  // Function to strip HTML tags from content
  const stripHTMLTags = (content) => {
    if (!content) return "";
    return content.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="p-4">
        <div className="w-auto h-auto bg-gray-200 rounded-xl hover:bg-white">
          <Image
            alt={product.title}
            src={product.featuredImage?.node?.sourceUrl}
            className="rounded-t-xl"
            height={2000}
            width={5000}
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight text-center text-orange-400">
              {product.title}
            </h1>
            <div className="flex justify-between text-gray-500 font-thin">
              <h6>
                <strong className=" font-bold">Date:</strong>{" "}
                {product.products.date.split("T")[0]}
              </h6>
              <h6>
                <strong className=" font-bold">Price:</strong>
                {product.products.price}£
              </h6>
            </div>
            <p className="text-start font-mono">
              {stripHTMLTags(product.content)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
