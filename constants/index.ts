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
import { article1, article2, article3, article4 } from "@/components/assets";
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
  "Life Style",
  "Template",
  "Active Page",
  "Other Page",
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

//This object holds stories that are in vogue. This is subjected to change due to season, politics or prevailing situations. It will be fetched from backend database and probably this should go into context as the initial state 🤔
export const trendingStories = [
  {
    photo: author1,
    title: "Mariners Claim C Jacob Nottingham, select C Jose Goday",
    author: "Josh David",
    date: "May 20, 2021",
  },
  {
    photo: author1,
    title: "Mariners Claim C Jacob Nottingham, select C Jose Goday",
    author: "Josh David",
    date: "May 20, 2024",
  },
  {
    photo: author2,
    title:
      "Where to grow your business as a photographer: site or social media?",
    author: "Susan David",
    date: "May 23, 2024",
  },
  {
    photo: author3,
    title: "Caring is the new marketing",
    author: "Kate George",
    date: "March 20, 2025",
  },
  {
    photo: author4,
    title: "How a visual artist redefines success in graphic design",
    author: "Josh David",
    date: "February 10, 2025",
  },
  {
    photo: author5,
    title:
      "How to optimize images in WordPress for faster loading (complete guide)",
    author: "Mark Lucky",
    date: "June 20, 2023",
  },
  {
    photo: author6,
    title: "Travelling as a way of self-discovery and progress",
    author: "Okon Buchi",
    date: "January 08, 2025",
  },
  {
    photo: author7,
    title: "Starting your traveling blog with Vasco",
    author: "Fisher Son",
    date: "August 11, 2022",
  },
  {
    photo: author8,
    title: "How to choose the right customer for your photo business?",
    author: "Olivia Jason",
    date: "December 23, 2022",
  },
  {
    photo: author9,
    title: "Start a blog to reach your creative peak",
    author: "Kemi Imo",
    date: "April 24, 2024",
  },
];

//These data belongs to the categories component. I think this might be subjected to changes, e.g. new categories may be added to the blog and definitely the counter should increase with time. Will also be stored in database and should be in context.
export const categories = [
  {
    photo: programmingImg,
    category: "Programming",
    counter: "19 Articles",
  },
  {
    photo: gamingImg,
    category: "Gaming",
    counter: "26 Articles",
  },
  {
    photo: travelImg,
    category: "Travel",
    counter: "53 Articles",
  },
  {
    photo: fitnessImg,
    category: "Gym and Fitness",
    counter: "87 Articles",
  },
  {
    photo: foodImg,
    category: "Foods",
    counter: "118 Articles",
  },
  {
    photo: techImg,
    category: "Technology",
    counter: "150 Articles",
  },
  {
    photo: abstractImg,
    category: "Abstract Art",
    counter: "14 Articles",
  },
  {
    photo: lifestyleImg,
    category: "Lifestyle",
    counter: "28 Articles",
  },
];

//This will likely be static data and may end up just living here permanently.
export const articleMenu = ["All", "Life styles", "Art styles", "Gamming"];

//This should increase or decrease with time, e.g. when a new article is published or when an article is deleted. This should be fetched from the database and stored in context.
export const articleItems = [
  {
    authorPhoto: author9,
    // title: `UI interactions of the week #${num}`,
    author: "Kemi Imo",
    date: "April 24, 2024",
    category: "Travel, Tech",
    articlePhoto: article1,
    title: "An UI/UX case study of an emerging local bicycle brand",
  },
  {
    authorPhoto: author4,
    title: "How a visual artist redefines success in graphic design",
    author: "Josh David",
    date: "February 10, 2025",
    category: "Art styles",
    articlePhoto: article2,
  },
  {
    authorPhoto: author7,
    title: "How to choose the right colors when creating a website?",
    author: "Fisher Son",
    date: "August 11, 2022",
    category: "Tech",
    articlePhoto: article3,
  },
];

//This will be returned from the database filtered on certain criteria which will return a single object. Therefore, destined for context.
export const mainLatestArticle = [
  {
    authorPhoto: author5,
    title: "My Google Interview Experience (data analyst)",
    author: "Mark Lucky",
    date: "June 20, 2023",
    category: "Life style",
    articlePhoto: article4,
  },
];

//Do I strictly restrict the tags suitable for this blog site making this list static with no permisssion of submitting stories that doesn't fit the available tag? If yes, this will be home for the tags array.
export const tags = [
  "Culture",
  "Science",
  "Technology",
  "Medicine",
  "Engineering",
  "Sound",
  "Nature",
  "Photography",
  "Mineral resources",
  "Cloud",
  "Design",
  "Finance",
];

//This should be fetched from the database and filtered to return maximum of four objects. It will be stored in context.
export const trendingTopics = [
  {
    img: trend1,
    category: "Life Style",
    counter: 6,
  },
  {
    img: trend2,
    category: "Programming",
    counter: 15,
  },
  {
    img: trend3,
    category: "Fitness",
    counter: 18,
  },
  {
    img: trend4,
    category: "Interviews",
    counter: 9,
  },
];

//This should be fetched from the database and filtered to return maximum of four objects. It will be stored in context.
export const authors = [
  {
    img: writer1,
    name: "Niamh O'Shea",
    field: "Author Success with Job Interviews",
  },
  {
    img: writer2,
    name: "Adrian Taylor",
    field: "Author Salt of the world",
  },
  {
    img: writer4,
    name: "Akano Grace",
    field: "Author Financial prudence",
  },
  {
    img: writer3,
    name: "Olga Jan",
    field: "Author Best Travel Destinations in Asia",
  },
];

//This should be fetched from the database and filtered to return maximum of three objects. It will be stored in context.
export const popularPostsList = [
  {
    authImg: popAuth1,
    author: "John Bull",
    date: "March 5, 2021",
    topic: "Helping a local business reinvent itself",
    storyImg: popStoryImg1,
  },
  {
    authImg: popAuth2,
    author: "Louis Marek",
    date: "Jene 17, 2024",
    topic: "Having God at the center of all you do is non-negotiable",
    storyImg: popStoryImg2,
  },
  {
    authImg: popAuth3,
    author: "Godwin Okon",
    date: "February 28, 2025",
    topic: "Starting your life style blog with Dinma",
    storyImg: popStoryImg3,
  },
];

//This should be fetched from the database and filtered to return maximum of four objects. It will be stored in context.
export const horizontalArticleCards = [
  {
    articleImg: articleImg1,
    author: "Kemi Imo",
    date: "April 24, 2024",
    authorImg: author4,
    title: "An UI/UX case study of an emerging local bicycle brand",
  },
  {
    articleImg: articleImg2,
    author: "Godwin Okon",
    date: "August 04, 2023",
    authorImg: author9,
    title: "Balanced diet for effective nourishment",
  },
  {
    articleImg: articleImg3,
    author: "John Bull",
    date: "April 02, 2025",
    authorImg: author7,
    title: "Lessons and insights from 8 years of Pixelgrade",
  },
  {
    articleImg: articleImg4,
    author: "Olga Jan",
    date: "January 31, 2025",
    authorImg: author7,
    title: "Investing due dilligence",
  },
];
