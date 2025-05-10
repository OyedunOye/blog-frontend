import {
  SlSocialInstagram,
  SlSocialTwitter,
  SlSocialYoutube,
  SlSocialFacebook
} from "react-icons/sl";
import {
  author1,
  author2,
  author3,
  author4,
  author5,
  author6,
  author7,
  author8,
  author9,
  programmingImg,
  gamingImg,
  fitnessImg,
  foodImg,
  techImg,
  lifestyleImg,
  abstractImg,
  travelImg,
  trend1,
  trend2,
  writer1,
  writer2,
  writer3,
  trend3,
  trend4,
  writer4,
  popAuth1,
  popStoryImg1,
  popAuth2,
  popStoryImg2,
  popAuth3,
  popStoryImg3,
  articleImg1,
  articleImg2,
  articleImg3,
  articleImg4,
} from "@/components/assets";
import { FcGoogle } from "react-icons/fc";

export const loginSocialMedia = [
  {img: SlSocialFacebook, name: "Facebook"},
  {img: FcGoogle, name: "Google"},
  {img: SlSocialTwitter, name: "Twitter"}
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
  "Categories",
  "Subscription",

];

//The next 3 consecutive lists are holding the contents for the footer component
export const useCasesList = [
  "Abstergo Ltd.",
  "Nursing Assistant",
  "Medical Assistant",
  "Markerting Coordinator",
  "Dog Trainer",
  "Web Designer",
  "President of Sales",
  "Medical Lab Technician",
];

export const categoriesList = [
  "Nigeria",
  "Algeria",
  "South Africa",
  "Central African Republic",
  "Afghanistan",
  "Vietnam",
  "Iran (Islamic Republic of)",
  "Pakistan",
  "Serbia",
];

export const ourConditionsList = [
  "Ethical Hacker",
  "UI/UX Designer",
  "Software Tester",
  "Scrum Master",
  "Project Manager",
  "Team Leader",
  "Software Developer",
  "Software Development",
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