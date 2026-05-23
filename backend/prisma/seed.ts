import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Using exact adapter structure matching backend
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding Database...');

  // 1. Categorías
  const catCafe = await prisma.category.create({
    data: { name: 'Café', isActive: true },
  });
  const catBebidas = await prisma.category.create({
    data: { name: 'Bebidas Frías', isActive: true },
  });

  // 2. Ingredientes
  const ingLeche = await prisma.ingredient.create({
    data: { name: 'Leche entera', isAllergen: true },
  });
  const ingAzucar = await prisma.ingredient.create({
    data: { name: 'Azúcar Blanca', isAllergen: false },
  });

  // 3. Productos (Ejemplo usando transacciones para atar ingredientes)
  await prisma.product.create({
    data: {
      name: 'Café Latte Clásico',
      categoryId: catCafe.id,
      price: 2.50,
      aiDescription: 'Latte suave con notas de caramelo.',
      isAvailable: true,
      productIngredients: {
        create: [
          { ingredientId: ingLeche.id, isOptional: true },
          { ingredientId: ingAzucar.id, isOptional: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Frappuccino',
      categoryId: catBebidas.id,
      price: 4.00,
      aiDescription: 'Helado batido con base de vainilla.',
      isAvailable: true,
      productIngredients: {
        create: [
          { ingredientId: ingLeche.id, isOptional: false },
        ],
      },
    },
  });

  // 4. Mesas
  await prisma.table.createMany({
    data: [
      { tableName: 'Mesa 1', status: 'Available' },
      { tableName: 'Mesa Torre', status: 'Reserved' },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
