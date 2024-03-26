import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import {
    BsInstagram,
    BsTwitterX,
    BsFacebook,
    BsLinkedin,
} from 'react-icons/bs';

const FOOTER_ITEMS = [
    'About us',
    'FAQ',
    'Contact us',
    'Products',
    'Career',
    'Privacy policy',
    'Refund policy',
    'Terms of service',
    'Customer care',
    'How to order',
    'How to refund',
    'Track your order',
];

const SOCIAL_LIST = [
    {
        name: 'Instagram',
        icon: BsInstagram,
    },
    {
        name: 'Twitter',
        icon: BsTwitterX,
    },
    {
        name: 'Facebook',
        icon: BsFacebook,
    },
    {
        name: 'Linkedin',
        icon: BsLinkedin,
    },
];

const Footer = () => {
    return (
        <div>
            <div className="relative h-[150px] w-full overflow-hidden bg-black xl:h-[250px]">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/shoes-store-4cb03.appspot.com/o/Hyper-logo.png?alt=media&token=85290c20-7044-4f89-83e9-6ab06d9975e4"
                    alt=""
                    className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 object-cover object-center invert"
                />
            </div>
            <div className="flex min-h-[80px] flex-col items-start justify-between gap-2 border-b-[1px] border-b-black pb-6 pt-4 md:min-h-[150px] md:items-center lg:min-h-56 lg:flex-row">
                <div className="flex h-full w-full shrink-0 grow-0 items-start md:w-3/5 lg:w-2/3">
                    <div className="grid w-full grid-cols-3 gap-x-5 lg:w-[80%]">
                        {FOOTER_ITEMS.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    className="font-base h-fit w-fit basis-1/3 py-1 text-sm uppercase transition-all hover:underline"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 shrink-0 grow-0">
                    <h4 className="mb-2 text-left font-Oswald text-2xl font-bold md:text-right">
                        JOIN OUR COMMUNITY
                    </h4>
                    <div
                        className="relative flex w-fit items-center justify-end before:absolute before:left-1 before:top-1 
                    before:-z-10 before:h-full before:w-full before:bg-white before:ring-1 before:ring-black before:content-['']
                    "
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="h-10 w-56 p-2 outline-none ring-1 ring-black"
                        />
                        <button className="group flex h-10 w-12 shrink-0 grow-0 items-center justify-center bg-black ring-1 ring-black">
                            <GoArrowRight className="invert transition-all group-hover:translate-x-1" />
                        </button>
                    </div>
                    <div className="clear-both"></div>
                </div>
            </div>
            <div className="flex h-auto flex-col items-center justify-between md:flex-row">
                <p className="py-2 text-sm">
                    &#169;2024 HYPER. All right reserved.
                </p>
                <div className="flex shrink-0 items-center">
                    {SOCIAL_LIST.map((item, index) => {
                        const Element = item.icon;
                        return (
                            <Link
                                to="/"
                                key={index}
                                className="group relative h-[40px] w-24 cursor-pointer overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 w-full text-center uppercase transition-all duration-300 group-hover:-top-[40px]">
                                    <div className="flex h-[40px] items-center justify-center">
                                        <span className="">{item.name}</span>
                                    </div>
                                    <div className="flex h-[40px] items-center justify-center">
                                        <Element width={24} height={24} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;
