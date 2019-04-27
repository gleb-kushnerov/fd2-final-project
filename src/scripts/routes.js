import {Home} from "../pages/home/home.js";
import {Features} from "../pages/features/features.js";
import {Reviews} from "../pages/reviews/reviews.js";

export const routes = [
    {
        path: '',
        page: Home
    },
    {
        path: 'home',
        page: Home
    },
    {
        path: 'features',
        page: Features
    },
    {
        path: 'reviews',
        page: Reviews
    }
];