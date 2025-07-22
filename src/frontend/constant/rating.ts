import type { Review } from "./type";

export const reviews: Review[] = [
  {
    _id: "rev_001",
    rating: 3,
    comment:
      "Great quality, but shipping was a bit slow.Great quality, but shipping was a bit slowGreat quality, but shipping was a bit slow.Great quality, but shipping was a bit slow.",
    product: "prod_abc123",
    user: {
      _id: "user_001",
      name: "Alice Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    _id: "rev_002",
    rating: 3,
    comment: "Absolutely perfect! Exceeded my expectations.",
    product: "prod_abc123",
    user: {
      _id: "user_002",
      name: "Bob Smith",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    _id: "rev_003",
    rating: 4,
    comment: "Very happy with this purchase, would recommend.",
    product: "prod_abc123",
    user: {
      _id: "user_003",
      name: "Clara Evans",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  },
  {
    _id: "rev_004",
    rating: 4,
    comment: "Fantastic build and design, worth every penny.",
    product: "prod_abc123",
    user: {
      _id: "user_004",
      name: "Daniel Lee",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
  {
    _id: "rev_001",
    rating: 5,
    comment: "Great quality, but shipping was a bit slow.",
    product: "prod_abc123",
    user: {
      _id: "user_001",
      name: "Alice Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    _id: "rev_002",
    rating: 5,
    comment: "Absolutely perfect! Exceeded my expectations.",
    product: "prod_abc123",
    user: {
      _id: "user_002",
      name: "Bob Smith",
      photo: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  },
  {
    _id: "rev_003",
    rating: 1,
    comment: "Very happy with this purchase, would recommend.",
    product: "prod_abc123",
    user: {
      _id: "user_003",
      name: "Clara Evans",
      photo: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  },
  {
    _id: "rev_004",
    rating: 2,
    comment: "Fantastic build and design, worth every penny.",
    product: "prod_abc123",
    user: {
      _id: "user_004",
      name: "Daniel Lee",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
];
