import {Home} from "../pages/home/home";
import {Features} from "../pages/features/features";
import {Reviews} from "../pages/reviews/reviews";
import {OrderNow} from "../pages/order-now/order-now";
import {Step2Order} from "../pages/order-now/step-2/step-2";
import {Step3Order} from "../pages/order-now/step-3/step-3";
import {Step4Order} from "../pages/order-now/step-4/step-4";
import {SuccessPage} from "../pages/order-now/wait-for-your-cab/wait-for-your-cab";

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