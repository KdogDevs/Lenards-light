export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  stars: number;
  date: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
  website: string;
  nation: string; // Added nation field
  location: {
    state: string;
    county: string;
  };
}

export interface Summary {
  id: string;
  title: string;
  date: string;
  content: string;
  location: {
    state: string;
    county: string;
  };
}
