import {
  SlSocialInstagram,
  SlSocialTwitter,
  SlSocialYoutube,
  // SlSocialFacebook
} from "react-icons/sl";

import {
  programmingImg,
  foodImg,
  techImg,
  lifestyleImg,
  abstractImg,
  travelImg,

} from "@/components/assets";
import { FcGoogle } from "react-icons/fc";

export const loginSocialMedia = [
  // {img: SlSocialFacebook, name: "Facebook"},
  {img: FcGoogle, name: "Google"},
]

export const socialMedia = [
  { img: SlSocialTwitter, name: "Twitter", alt: "twitter logo" },
  { img: SlSocialInstagram, name: "Instagram", alt: "instagram logo" },
  { img: SlSocialYoutube, name: "Youtube", alt: "youtube logo" },
];

// These are the Navbar menus, the name of this array is descriptive
export const NavBarMenuList = [
  "Home",
  "Discover",
];

//These data belongs to the categories component. I think this might be subjected to changes, e.g. new categories may be added to the blog.
export const categories = [
  {
    photo: programmingImg,
    category: "Programming",
  },
  {
    photo: travelImg,
    category: "Travel",
  },
  {
    photo: foodImg,
    category: "Food",
  },
  {
    photo: techImg,
    category: "Technology",
  },
  {
    photo: lifestyleImg,
    category: "Lifestyle",
  },
  {
    photo: abstractImg,
    category: "Others",
  }
];

//This will likely be static data and may end up just living here permanently.
export const articleMenu = ["All", "Life styles", "Art styles", "Gamming"];