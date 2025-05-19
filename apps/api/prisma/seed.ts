import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'iPhone 12 Pro Max 64GB Black',
      description: 'For iPhone 12 Pro Max 256GB Fully Unlocked Factory Cell Phone Second Hand Telefone A+ 99% Used Cellphone for iPhone 12 Promax',
      price: 245,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/A2e90ef90109c4af4a501ca9e4d3b6d2a9.jpeg_720x720q50.jpg',
      stockQuantity: 10,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Iphone 12 Mini - 128GB',
      description: 'Wholesale 99% New Original US Version Unlocked Used Mobile Phones Low Price for iPhone 12 Mini 12 Pro Max',
      price: 235,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Heba994a30b9e43b285aeb04d2568703dF.jpg_720x720q50.jpg',
      stockQuantity: 6,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Samsung Galaxy Z Flip 3 Refurbish 8/128',
      description: 'Cheap Used Phones Z Flip3 Wholesale Used Cell Phones Fold Bulk Smartphone Use Mobile Phone Refurbished Low Price 5g',
      price: 200,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H16da993b44654e1398b65a20506a1b59D.jpg_720x720q50.jpg',
      stockQuantity: 6,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Iphone 15 Pro Max - 128GB',
      description: 'Factory Cheap Wholesale Used Smartphone for 15 Promax Unlocked Original Cell Phone for Sale at Low Price',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H8322bc02d6a4448ba300b72ffc5a1be3A.jpg_720x720q50.jpg',
      stockQuantity: 100,
      minimumOrderQuantity: 10,
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 191,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
    },
    {
      name: 'Iphone 14 Pro Max - Grade A+',
      description: 'Used Apple iPhone 13 14 15 Pro Max 13 14 15 Pro 13 14 15 128GB / 512GB Unlocked Used Mobile Phone',
      price: 385,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/He3a965d918d743de9f51141572a8ebadl.jpg_720x720q50.jpg',
      stockQuantity: 5,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Iphone 12 Pro Max - 128GB',
      description: '12promax Wholesale Original 99 New Smartphone for iphone 8 8plus Xr Xsmax 11 11pro 12 12promax Used Unlocked Mobile Phones',
      price: 168,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H09623fb0485b4c8ba2fa19c07253d67cc.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Samsung Galaxy S24 Ultra - 128GB',
      description: '99% New Original Used Mobile Phones Unlocked Smart Phones S24 Ultra 5G for Samsung Galaxy S24 Ultra Cell Phone',
      price: 558,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H74a4fb2e8c60461a9100cbd35d05ca95P.jpg_720x720q50.jpg',
      stockQuantity: 20,
      minimumOrderQuantity: 1,
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
    },
    // Tambahkan produk lainnya sesuai screenshot...
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        ...p,
        sku: nanoid(8),
        slug: slugify(p.name, { lower: true }) + '-' + nanoid(4),
      },
    });
  }
}

main()
  .then(() => {
    console.log('seeding completed');
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
