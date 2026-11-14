/* ===== Kabab Corner — site content =====
   Edit prices, dishes and photos here. To use your own photos, drop them in
   /images and replace the URL, e.g. img: "images/chicken-kebab.jpg"        */

const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const IMG = {
  kebab:        U("1599487488170-d11ec9c172f0"),
  skewers:      U("1555939594-58d7cb561ad1"),
  seekh:        U("1529042410759-befb1204b468"),
  biryani:      U("1563379091339-03b21ab4a4f8"),
  biryani2:     U("1589302168068-964664d93dc0"),
  tandoori:     U("1610057099443-fde8c4d50f91"),
  curry:        U("1565557623262-b51c2513a641"),
  curry2:       U("1603894584373-5ac82b2ae398"),
  paneer:       U("1567188040759-fb8a883dc6d8"),
  samosa:       U("1601050690597-df0568f70950"),
  naan:         U("1600628421055-4d30de868b8f"),
  lassi:        U("1556679343-c7306c1976bc"),
  interior:     U("1517248135467-4c7edcad34c4", 1600),
  interior2:    U("1555396273-367ea4eb4db5"),
  exterior:     U("1414235077428-338989a2e8c0", 1800),
  grillHero:    U("1555939594-58d7cb561ad1", 1800),
  table:        U("1559339352-11d035aa65de"),
};

const RESTAURANT = {
  name: "Kabab Corner Restaurant",
  phone: "+91 73396 51811",
  // WhatsApp number that receives table bookings: country code + number, digits only
  whatsapp: "917339651811",
  address: "Commercial Road, Ooty, Tamil Nadu",
  hours: "Open Daily: 11 AM – 11 PM",
  mapQuery: "Commercial Road, Ooty, Tamil Nadu",
};

const CATEGORIES = [
  { id: "kebabs",    label: "Kebabs",    icon: "fa-fire" },
  { id: "biryani",   label: "Biryani",   icon: "fa-bowl-rice" },
  { id: "tandoori",  label: "Tandoori",  icon: "fa-drumstick-bite" },
  { id: "curries",   label: "Curries",   icon: "fa-bowl-food" },
  { id: "starters",  label: "Starters",  icon: "fa-utensils" },
  { id: "breads",    label: "Breads",    icon: "fa-bread-slice" },
  { id: "beverages", label: "Beverages", icon: "fa-mug-hot" },
];

// veg: true = vegetarian. special: true = shown in "Our Specialties"
const DISHES = [
  // Kebabs
  { id: 1,  cat: "kebabs",   name: "Chicken Kebabs",      desc: "Tender pieces of chicken marinated with authentic spices.", price: 220, img: IMG.kebab,   special: true },
  { id: 2,  cat: "kebabs",   name: "Seekh Kebabs",        desc: "Spiced minced meat grilled to perfection.",                price: 250, img: IMG.seekh,   special: true },
  { id: 3,  cat: "kebabs",   name: "Mutton Boti Kebab",   desc: "Juicy mutton chunks charred over open coals.",             price: 320, img: IMG.skewers },
  { id: 4,  cat: "kebabs",   name: "Reshmi Kebab",        desc: "Silky chicken in cream, cashew and mild spices.",          price: 260, img: IMG.kebab },
  { id: 5,  cat: "kebabs",   name: "Hariyali Kebab",      desc: "Chicken in a fresh mint and coriander marinade.",          price: 240, img: IMG.skewers },
  { id: 6,  cat: "kebabs",   name: "Veg Seekh Kebab",     desc: "Mixed vegetables and paneer on the skewer.",               price: 200, img: IMG.seekh, veg: true },
  // Biryani
  { id: 7,  cat: "biryani",  name: "Chicken Biryani",     desc: "A royal dish with aromatic basmati rice.",                 price: 280, img: IMG.biryani,  special: true },
  { id: 8,  cat: "biryani",  name: "Mutton Biryani",      desc: "Rich and flavourful biryani with tender mutton.",          price: 360, img: IMG.biryani2, special: true },
  { id: 9,  cat: "biryani",  name: "Egg Biryani",         desc: "Fragrant rice layered with masala-roasted eggs.",          price: 220, img: IMG.biryani },
  { id: 10, cat: "biryani",  name: "Veg Dum Biryani",     desc: "Seasonal vegetables slow-cooked on dum.",                  price: 200, img: IMG.biryani2, veg: true },
  // Tandoori
  { id: 11, cat: "tandoori", name: "Tandoori Chicken",    desc: "Classic tandoori delight with smoky flavour.",             price: 300, img: IMG.tandoori, special: true },
  { id: 12, cat: "tandoori", name: "Chicken Tikka",       desc: "Boneless chicken, yoghurt and Kashmiri chilli.",           price: 270, img: IMG.kebab },
  { id: 13, cat: "tandoori", name: "Paneer Tikka",        desc: "Soft paneer cubes with spices.",                           price: 260, img: IMG.paneer, veg: true, special: true },
  { id: 14, cat: "tandoori", name: "Tandoori Fish",       desc: "Fresh fish fillet in ajwain masala, clay-oven roasted.",   price: 340, img: IMG.tandoori },
  // Curries
  { id: 15, cat: "curries",  name: "Butter Chicken",      desc: "Charred chicken tikka in a velvety tomato gravy.",         price: 290, img: IMG.curry },
  { id: 16, cat: "curries",  name: "Mutton Rogan Josh",   desc: "Kashmiri-style slow-cooked mutton curry.",                 price: 360, img: IMG.curry2 },
  { id: 17, cat: "curries",  name: "Paneer Butter Masala",desc: "Cottage cheese in a rich, buttery gravy.",                 price: 250, img: IMG.curry, veg: true },
  { id: 18, cat: "curries",  name: "Dal Makhani",         desc: "Black lentils simmered overnight with butter.",            price: 200, img: IMG.curry2, veg: true },
  // Starters
  { id: 19, cat: "starters", name: "Chicken 65",          desc: "Crispy fried chicken tossed with curry leaves.",           price: 230, img: IMG.tandoori },
  { id: 20, cat: "starters", name: "Samosa (2 pcs)",      desc: "Crisp pastry stuffed with spiced potatoes.",               price: 80,  img: IMG.samosa, veg: true },
  { id: 21, cat: "starters", name: "Chilli Paneer",       desc: "Indo-Chinese paneer with peppers and onion.",              price: 220, img: IMG.paneer, veg: true },
  // Breads
  { id: 22, cat: "breads",   name: "Butter Naan",         desc: "Soft tandoor-baked bread brushed with butter.",            price: 50,  img: IMG.naan, veg: true },
  { id: 23, cat: "breads",   name: "Garlic Naan",         desc: "Naan topped with garlic and coriander.",                   price: 60,  img: IMG.naan, veg: true },
  { id: 24, cat: "breads",   name: "Rumali Roti",         desc: "Paper-thin handkerchief bread.",                           price: 40,  img: IMG.naan, veg: true },
  // Beverages
  { id: 25, cat: "beverages",name: "Sweet Lassi",         desc: "Chilled churned yoghurt drink.",                           price: 90,  img: IMG.lassi, veg: true },
  { id: 26, cat: "beverages",name: "Mango Lassi",         desc: "Lassi blended with Alphonso mango pulp.",                  price: 110, img: IMG.lassi, veg: true },
  { id: 27, cat: "beverages",name: "Masala Chai",         desc: "Nilgiri tea brewed with ginger and cardamom.",             price: 40,  img: IMG.lassi, veg: true },
];

const REVIEWS = [
  { name: "Priya S.",   text: "Amazing food, great ambience and super friendly staff. Highly recommended!" },
  { name: "Rahul M.",   text: "The seekh kebabs are the best I've had in Ooty. Perfect after a cold day out." },
  { name: "Ayesha K.",  text: "Mutton biryani was rich and perfectly spiced. Will definitely be back with family." },
  { name: "Daniel J.",  text: "Cozy place, quick service and the tandoori chicken is smoky perfection." },
];
