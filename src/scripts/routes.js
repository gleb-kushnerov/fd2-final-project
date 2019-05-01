import {Home} from "../pages/home/home.js";
import {Features} from "../pages/features/features.js";
import {Reviews} from "../pages/reviews/reviews.js";
import {OrderNow} from "../pages/order-now/order-now.js";
import {Step2Order} from "../pages/order-now/step-2/step-2.js";
import {Step3Order} from "../pages/order-now/step-3/step-3.js";
import {Step4Order} from "../pages/order-now/step-4/step-4.js";
import {SuccessPage} from "../pages/order-now/wait-for-your-cab/wait-for-your-cab.js";

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
        path: 'order-now',
        page: OrderNow
    },
    {
        path: 'order-now/step-2',
        page: Step2Order
    },
    {
        path: 'order-now/step-3',
        page: Step3Order
    },
    {
        path: 'order-now/step-4',
        page: Step4Order
    },
    {
        path: 'order-now/wait-for-your-cab',
        page: SuccessPage
    },
    {
        path: 'reviews',
        page: Reviews
    }
];