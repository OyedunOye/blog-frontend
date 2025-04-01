import { SlSocialInstagram, SlSocialTwitter, SlSocialYoutube  } from "react-icons/sl";
import { author1, author2, author3, author4, author5, author6, author7, author8, author9, programmingImg, gamingImg, fitnessImg, foodImg, techImg, lifestyleImg, abstractImg, travelImg } from '@/components/assets'
import { article1, article2, article3, article4 } from "@/components/assets";

export const socialMedia = [
    { img: SlSocialTwitter, name: "Twitter", alt: "twitter logo" },
    { img: SlSocialInstagram, name:"Instagram", alt: "instagram logo" },
    { img: SlSocialYoutube, name:"Youtube", alt: "youtube logo" }
];

export const NavBarMenuList = [
    'Home',
    'Life Style',
    'Template',
    'Active Page',
    'Other Page'
]

export const useCasesList = [
    'Abstergo Ltd.',
    'Nursing Assistant',
    'Medical Assistant',
    'Markerting Coordinator',
    'Dog Trainer',
    'Web Designer',
    'President of Sales',
    'Medical Lab Technician'
]

export const categoriesList = [
    'Nigeria',
    'Algeria',
    'South Africa',
    'Central African Republic',
    'Afghanistan',
    'Vietnam',
    'Iran (Islamic Republic of)',
    'Pakistan',
    'Serbia'
]

export const ourConditionsList = [
    'Ethical Hacker',
    'UI/UX Designer',
    'Software Tester',
    'Scrum Master',
    'Project Manager',
    'Team Leader',
    'Software Developer',
    'Software Development'
]

export const trendingStories = [
   {
    photo: author1,
    title: "Mariners Claim C Jacob Nottingham, select C Jose Goday",
    author: "Josh David",
    date: "May 20, 2021"
    },
   {
    photo: author1,
    title: "Mariners Claim C Jacob Nottingham, select C Jose Goday",
    author: "Josh David",
    date: "May 20, 2024"
    },
   {
    photo: author2,
    title: "Where to grow your business as a photographer: site or social media?",
    author: "Susan David",
    date: "May 23, 2024"
    },
   {
    photo: author3,
    title: "Caring is the new marketing",
    author: "Kate George",
    date: "March 20, 2025"
    },
   {
    photo: author4,
    title: "How a visual artist redefines success in graphic design",
    author: "Josh David",
    date: "February 10, 2025"
    },
   {
    photo: author5,
    title: "How to optimize images in WordPress for faster loading (complete guide)",
    author: "Mark Lucky",
    date: "June 20, 2023"
    },
   {
    photo: author6,
    title: "Travelling as a way of self-discovery and progress",
    author: "Okon Buchi",
    date: "January 08, 2025"
    },
   {
    photo: author7,
    title: "Starting your traveling blog with Vasco",
    author: "Fisher Son",
    date: "August 11, 2022"
    },
   {
    photo: author8,
    title: "How to choose the right customer for your photo business?",
    author: "Olivia Jason",
    date: "December 23, 2022"
    },
   {
    photo: author9,
    title: "Start a blog to reach your creative peak",
    author: "Kemi Imo",
    date: "April 24, 2024"
    }

]

export const categories = [
    {
        photo: programmingImg,
        category: "Programming",
        counter: "19 Articles"
    },
    {
        photo: gamingImg,
        category: "Gaming",
        counter: "26 Articles"
    },
    {
        photo: travelImg,
        category: "Travel",
        counter: "53 Articles"
    },
    {
        photo: fitnessImg,
        category: "Gym and Fitness",
        counter: "87 Articles"
    },
    {
        photo: foodImg,
        category: "Foods",
        counter: "118 Articles"
    },
    {
        photo: techImg,
        category: "Technology",
        counter: "150 Articles"
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
    }
]

export const articleMenu = ["All", "Life styles", "Art styles", "Gamming"]

export const articleItems = [
    {
        authorPhoto: author9,
        // title: `UI interactions of the week #${num}`,
        author: "Kemi Imo",
        date: "April 24, 2024",
        category: "Travel, Tech",
        articlePhoto: article1,
        title:"An UI/UX case study of an emerging local bicycle brand"
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
    }

]

export const mainLatestArticle = [
    {
        authorPhoto: author5,
        title: "My Google Interview Experience (data analyst)",
        author: "Mark Lucky",
        date: "June 20, 2023",
        category: "Life style",
        articlePhoto: article4,
    }
]