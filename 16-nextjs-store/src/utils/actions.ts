import prisma from "./prisma";

interface AllProductsProps {
  search?: string;
}

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({ where: { featured: true } });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: AllProductsProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return products;
};
