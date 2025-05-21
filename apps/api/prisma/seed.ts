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
      gallery: [
        'https://s.alicdn.com/@sc04/kf/Ad3ef4d4826514c21b542c56e7cbd5dabz.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/A5c84a4bb16c9400189693cab62fb0861w.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/A1b4e6b78e5414497950660a6376a08a3b.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Ab3985ed093da4aaa8bd04fa99d0e530cJ.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Iphone 12 Mini - 128GB',
      description: 'Wholesale 99% New Original US Version Unlocked Used Mobile Phones Low Price for iPhone 12 Mini 12 Pro Max',
      price: 235,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Heba994a30b9e43b285aeb04d2568703dF.jpg_720x720q50.jpg',
      stockQuantity: 6,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H234d073456a54f7b8d0e573ecc69557dY.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H0a666922e1fe4b898f85af2b41b664b9s.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H1354aef70def4e89bf8d14b843f47c8bS.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Samsung Galaxy Z Flip 3 Refurbish 8/128',
      description: 'Cheap Used Phones Z Flip3 Wholesale Used Cell Phones Fold Bulk Smartphone Use Mobile Phone Refurbished Low Price 5g',
      price: 200,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H16da993b44654e1398b65a20506a1b59D.jpg_720x720q50.jpg',
      stockQuantity: 6,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H37558d7f9fe245ccba7988bd418b5d0db.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H4980ac2002da454295cc8a86320036b46.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H6db1b295bc6646ba9e36ac4b271bcf4b8.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Iphone 15 Pro Max - 128GB',
      description: 'Factory Cheap Wholesale Used Smartphone for 15 Promax Unlocked Original Cell Phone for Sale at Low Price',
      price: 230,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H8322bc02d6a4448ba300b72ffc5a1be3A.jpg_720x720q50.jpg',
      stockQuantity: 100,
      minimumOrderQuantity: 10,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H9dce6d0c12574f7fbf1fa4d8400dfdea3.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Hd4885f8ca9314c3fa547de7695c808bcn.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Hb4404c35204e46d39f1b60e28b1caa96g.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H6d7065d046a142f695f6cecd44bbc58fD.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Samsung Galaxy S21 Ultra - 128GB',
      description: 'Original Used Mobile Cell Phone for Samsung S21 Ultra 128gb 256gb 512gb High Quality Unlocked Second Hand Phones S9 S10 S20 S22',
      price: 191,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H73fdf747f53e4985b4c10f05080cec23y.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 2,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H8ec7f6ff63234dae96e9452c5daa06f2Q.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H6acb66fde457430798be9be5814d9b8e8.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Ha02827d084264ff78db720c21af01660s.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H2e724b72ef1d454292bb7e86421eae44a.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Iphone 14 Pro Max - Grade A+',
      description: 'Used Apple iPhone 13 14 15 Pro Max 13 14 15 Pro 13 14 15 128GB / 512GB Unlocked Used Mobile Phone',
      price: 385,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/He3a965d918d743de9f51141572a8ebadl.jpg_720x720q50.jpg',
      stockQuantity: 5,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H2610111799524374b5b2cc13a8da18805.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Hc52d0d508c5f41d6938366d893829404o.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H44df3ba22d9e4d208780a26c2b19e9fdQ.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Iphone 12 Pro Max - 128GB',
      description: '12promax Wholesale Original 99 New Smartphone for iphone 8 8plus Xr Xsmax 11 11pro 12 12promax Used Unlocked Mobile Phones',
      price: 168,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H09623fb0485b4c8ba2fa19c07253d67cc.jpg_720x720q50.jpg',
      stockQuantity: 60,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H60b276864f234d50b12b83203500f91d4.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Head77031704c40ca9008f1ec25574cf9b.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H35aa12df6b0348f88b284ace17108c6eE.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Samsung Galaxy S24 Ultra - 128GB',
      description: '99% New Original Used Mobile Phones Unlocked Smart Phones S24 Ultra 5G for Samsung Galaxy S24 Ultra Cell Phone',
      price: 558,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H74a4fb2e8c60461a9100cbd35d05ca95P.jpg_720x720q50.jpg',
      stockQuantity: 20,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/Hd929bf18c103422ca847a01b512645d6s.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H0ddfccfec40142d6a2894edf8d27aef5E.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H28200fde4f544cb29e94733cbceba24ao.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Gopix 8 Global - 128 GB',
      description: 'Wholesale Google Pixel 8 Lobal Edition Smartphone 99% New for Unlocked Mobile Phones 4700mah High-Capacity',
      price: 399,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H71e17757d4fa40f8bf79ade023e9d31a4.jpg_720x720q50.jpg',
      stockQuantity: 200,
      minimumOrderQuantity: 1,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H13f12d5dfee9432d95d4bd704e1c7f48D.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/He7be60ee72cc4a98b2e676b490085514m.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H922fa9b511d7490cb50458a3a4a36bd9b.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Google Pixel 9 - 128GB',
      description: 'For Google Pixel 9 Used Mobile Phone Unlocked Android 5G Original Brand New Unlocked 6.4 Inch Mobile Phones',
      price: 600,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H3d6ff58cde464a45b76e2056db77562ev.jpg_720x720q50.jpg',
      stockQuantity: 50,
      minimumOrderQuantity: 2,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H01d5ed1048784019a3a9554446bdc5b9Y.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Ha46a96947a1e4f0b825a1415fd3670e3p.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H93511386c848478bb33c38a5739f0cdb5.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Pixel 9 Pro Fold - 128GB',
      description: 'High Quality Original Genuine for Google Pixel 9 Pro Fold Smart Phone Fold 5G Unlocked Sim Free and Expand 8inch Large Screen',
      price: 502,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Hcf6f3bfcc71c43f1b44c9e7f9b906bf6z.jpg_720x720q50.jpg',
      stockQuantity: 30,
      minimumOrderQuantity: 2,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/H4e98772f8a1245488a14313541f0c9adg.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H25618ca4e59b4342b8b7395abc62caadZ.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/H46ca73327a934e9fb84827e9fdce4c7f9.jpg_720x720q50.jpg',
      ],
    },
    {
      name: 'Pixel 8 Pro - 128GB',
      description: 'Original Genuine for Google Pixel 8 Pro A+ Second Hand Mobile Phones 99% New Unlocked Mobile Phones',
      price: 498,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Hbcec9ac27944478db49cd882739238efs.jpg_720x720q50.jpg',
      stockQuantity: 200,
      minimumOrderQuantity: 2,
      gallery: [
        'https://s.alicdn.com/@sc04/kf/Hdcb4a8f05f514690872d82005e9baaefQ.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Hd7c8bc170dc04eff9c22acf90926e3a2w.jpg_720x720q50.jpg',
        'https://s.alicdn.com/@sc04/kf/Hadb8cb6990bb4866881a18da0276219dz.jpg_720x720q50.jpg',
      ],
    },
    // Tambahkan produk lainnya sesuai screenshot...
  ];

  for (const p of products) {
    const createdProduct = await prisma.product.create({
      data: {
        sku: nanoid(8),
        slug: slugify(p.name, { lower: true }) + '-' + nanoid(4),
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl,
        stockQuantity: p.stockQuantity,
        minimumOrderQuantity: p.minimumOrderQuantity,
      },
    });

    await prisma.product_gallery.createMany({
      data: p.gallery.map((url) => ({
        productId: createdProduct.id,
        imageUrl: url,
      })),
    });
  }
}

main()
  .then(() => {
    console.log('seeding completed');
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
