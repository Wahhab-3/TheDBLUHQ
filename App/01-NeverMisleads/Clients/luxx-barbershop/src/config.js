// ============================================================
// LUXX BARBERSHOP — CLIENT CONFIG
// Change this file to clone this template for a new client
// ============================================================

export const config = {
    // Business
    name: "Luxx Barbershop",
    tagline: "It's Not Just a Haircut, It's an Experience",
    subtagline: "Premium grooming in Oviedo, FL. Walk in fresh, walk out legendary.",
    phone: "689-248-1419",
    address: "1605 Tuskawilla Rd, Oviedo, FL 32765",
    email: "",
    booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo",

    // Social
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",

    // Hours
    hours: [
        { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
        { day: "Saturday", time: "8:00 AM – 6:00 PM" },
        { day: "Sunday", time: "10:00 AM – 4:00 PM" },
    ],

    // Barber Services (each links to Booksy)
    services: [
        { name: "Skin Fade / Textured Cuts", price: "$35+", duration: "45 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-2588864" },
        { name: "Regular Clipper Cut", price: "$30", duration: "30 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-7010056" },
        { name: "Kids / Senior Cut", price: "$25+", duration: "30 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-3341793" },
        { name: "Haircut & Beard", price: "$45", duration: "45 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-8141068" },
        { name: "Edge Up / Beard Cleanup", price: "$20+", duration: "20 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-2588919" },
        { name: "Female Haircuts", price: "$40+", duration: "35 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-8191600" },
        { name: "Facial", price: "$35", duration: "35 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-7480733" },
        { name: "Eyebrow Wax", price: "$15", duration: "15 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-9373889" },
        { name: "Shampoo + Scalp Massage", price: "$7+", duration: "10 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-9373967" },
        { name: "Beard Enhancement", price: "$10", duration: "10 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-1894360" },
        { name: "Ear / Nose Wax", price: "$15+", duration: "10 min", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-6047802" },
        { name: "Early Bird / After Hours", price: "Varies", duration: "1 hr", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-9818019" },
        { name: "House Call / Concierge", price: "$70+", duration: "By appt", booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-6848114" },
    ],

    // VIP Packages
    vipPackages: [
        { name: "Luxx Cut", description: "Haircut + Massage + Shampoo + 1 Complimentary Drink", price: "$45", duration: "45 min", popular: false, booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-8087148" },
        { name: "The Classic VIP", description: "Haircut + Beard + Eyebrows + Hot Towel + Massage", price: "$55", duration: "55 min", popular: false, booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-8087139" },
        { name: "VIP Full Service", description: "Haircut + Exfoliating Facial with Steamer", price: "$65", duration: "1 hr", popular: false, booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-7010076" },
        { name: "Deluxe VIP", description: "Haircut + Beard + Eyebrows + Facial + Wax", price: "$75", duration: "1 hr 15 min", popular: true, booksy: "https://booksy.com/en-us/12457_luxx-barber-shop_barber-shop_16062_oviedo#service-7378878" },
    ],

    // Reviews — Real verified Booksy reviews
    reviews: [
        {
            name: "David",
            rating: 5,
            service: "Haircut and beard",
            date: "Feb 4, 2026",
            text: "Luxx Barber Shop has an amazing feel to it. Not just another barber shop! Charlene Nuñez is an awesome barber & my first ever female barber. Her talent & personality made this a unique experience. She has my business from now on 100%.",
        },
        {
            name: "Jonathan",
            rating: 5,
            service: "Edge up / beard cleanup",
            date: "May 12, 2025",
            text: "First time visit and it won't be my last. Charlene and the space were super comfortable and professional. I decided to treat myself right and get the VIP treatment... and it exceeded expectations. Definitely felt like a VIP!",
        },
        {
            name: "Ronny",
            rating: 5,
            service: "Haircut beard eyebrows hot towel massage",
            date: "Feb 20, 2026",
            text: "Luxx Barber Shop continues to amaze me with their service. The atmosphere is completely chill. After a long day, I highly suggest if you are looking for a haircut service, mixed with an environment of serenity, this is the right spot.",
        },
        {
            name: "Ayush Jay",
            rating: 5,
            service: "Deluxe VIP haircut, beard, eyebrows, facial, wax",
            date: "Feb 13, 2026",
            text: "Charlene was fantastic, one of the best cuts I've had in a while. Everyone should try the VIP experience — it's worth every penny.",
        },
    ],

    // Event Types
    eventTypes: [
        {
            icon: "🥂",
            title: "Groomsmen Packages",
            description: "Make your pre-wedding experience legendary. Private barber services, premium grooming, and the full lounge — all yours.",
            features: ["Full grooming for the entire party", "Complimentary drinks included", "Private lounge access"],
        },
        {
            icon: "🎂",
            title: "Birthday Celebrations",
            description: "Celebrate the right way. Cuts, drinks, and your whole crew in the ultimate man cave experience.",
            features: ["Group cut packages available", "Custom celebration setup", "Flexible booking hours"],
        },
        {
            icon: "🎮",
            title: "Game Nights",
            description: "Rent the lounge for your squad. Kicks back, music on, drinks flowing — the ultimate hangout space.",
            features: ["Full lounge rental", "Entertainment setup", "BYOB or drink packages"],
        },
        {
            icon: "🎉",
            title: "Private Events",
            description: "Corporate gatherings, team events, or any milestone. Contact us for fully custom packages.",
            features: ["Flexible capacity", "Catering options available", "Custom event planning"],
        },
    ],
};
