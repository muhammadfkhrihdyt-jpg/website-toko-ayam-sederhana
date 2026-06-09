INSERT IGNORE INTO products
  (name, slug, description, imageUrl, category, price, stock, weightGram, isFeatured, isActive, createdAt, updatedAt)
VALUES
  ('Boneless Dada', 'boneless-dada', 'Dada ayam tanpa tulang.', '/products/boneless-dada.jpg', 'Boneless', 48500.00, 50, 1000, 1, 1, NOW(), NOW()),
  ('Boneless Paha', 'boneless-paha', 'Paha ayam tanpa tulang.', '/products/boneless-paha.jpg', 'Boneless', 47500.00, 50, 1000, 1, 1, NOW(), NOW()),
  ('Sayap', 'sayap', 'Sayap ayam segar.', '/products/sayap.jpg', 'Specific Part', 40500.00, 50, 1000, 1, 1, NOW(), NOW()),
  ('Karkas 0,9-1kg', 'karkas-09-1kg', 'Ayam utuh ukuran praktis.', '/products/karkas.jpg', 'Whole Chicken', 43500.00, 50, 1000, 1, 1, NOW(), NOW()),
  ('Telur Ayam Negeri Segar 500g', 'telur-ayam-negeri-segar-500g', 'Telur ayam negeri segar Yellow Yolk kemasan 500 gram.', '/brand/egg-products.jpg', 'Nutri Egg Fresh', 18000.00, 100, 500, 1, 1, NOW(), NOW()),
  ('Telur Ayam Negeri Segar 1kg', 'telur-ayam-negeri-segar-1kg', 'Telur ayam negeri segar Yellow Yolk untuk pemesanan 1 - 200 kg.', '/brand/egg-products.jpg', 'Nutri Egg Fresh', 28000.00, 200, 1000, 1, 1, NOW(), NOW()),
  ('Telur Ayam Omega Low Cholesterol', 'telur-ayam-omega-low-cholesterol', 'Telur ayam Omega Low Cholesterol Orange Yolk, 1 pax isi 10 butir.', '/brand/egg-products.jpg', 'Nutri Egg Fresh', 35000.00, 100, NULL, 1, 1, NOW(), NOW()),
  ('Telur Ayam Omega Ultra', 'telur-ayam-omega-ultra', 'Telur ayam Omega Ultra Orange Yolk, 1 pax isi 10 butir.', '/brand/egg-products.jpg', 'Nutri Egg Fresh', 30000.00, 100, NULL, 1, 1, NOW(), NOW()),
  ('Telur Ayam Omega Ultra 1kg', 'telur-ayam-omega-ultra-1kg', 'Telur ayam Omega Ultra Orange Yolk ukuran 1 kg.', '/brand/egg-products.jpg', 'Nutri Egg Fresh', 35000.00, 100, 1000, 1, 1, NOW(), NOW());
