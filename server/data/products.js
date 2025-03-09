const products = [
  {
    name: "Gold Necklace",
    category: "jewellery",
    subCategory: "necklaces",
    price: 25000,
    description: "22K Gold necklace with traditional design",
    images: ["necklace1.jpg", "necklace2.jpg"],
    stock: 5,
    specifications: [
      { name: "Material", value: "22K Gold" },
      { name: "Weight", value: "25g" }
    ]
  },
  {
    name: "Power Drill",
    category: "hardware",
    subCategory: "power-tools",
    price: 3500,
    description: "Professional grade power drill",
    images: ["drill1.jpg"],
    stock: 20,
    specifications: [
      { name: "Power", value: "750W" },
      { name: "Chuck Size", value: "13mm" }
    ]
  },
  // Add more sample products...
];

module.exports = products; 