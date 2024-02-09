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
            <div className="bg-black w-full h-[250px] relative overflow-hidden">
                <h5 className="select-none absolute top-2 left-0 w-full font-BebasNeue text-[250px] leading-none text-white tracking-widest text-center">
                    HYPER
                </h5>
            </div>
            <div className="pt-4 pb-6 min-h-[80px] md:min-h-[150px] lg:min-h-56 flex flex-col lg:flex-row gap-2 items-start md:items-center justify-between border-b-[1px] border-b-black">
                <div className="w-full md:w-3/5 lg:w-2/3 h-full flex items-start shrink-0 grow-0">
                    <div className="w-full lg:w-[80%] grid grid-cols-3 gap-x-5">
                        {FOOTER_ITEMS.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    className="w-fit h-fit basis-1/3 uppercase text-sm font-base py-1 hover:underline transition-all"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 grow-0 shrink-0">
                    <h4 className="font-bold text-2xl font-Oswald text-left md:text-right mb-2">
                        JOIN OUR COMMUNITY
                    </h4>
                    <div
                        className="w-fit flex items-center justify-end before:content-[''] before:w-full before:h-full before:ring-1 
                    before:ring-black before:bg-white relative before:absolute before:top-1 before:left-1 before:-z-10
                    "
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-56 h-10 ring-1 ring-black outline-none p-2"
                        />
                        <button className="group w-12 h-10 grow-0 shrink-0 flex items-center justify-center ring-1 ring-black bg-black">
                            <GoArrowRight className="invert group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                    <div className="clear-both"></div>
                </div>
            </div>
            <div className="h-auto flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">&#169;2024 HYPER. All right reserved.</p>
                <div className="flex items-center shrink-0">
                    {SOCIAL_LIST.map((item, index) => {
                        const Element = item.icon;
                        return (
                            <Link
                                to="/"
                                key={index}
                                className="h-[40px] w-24 group relative overflow-hidden cursor-pointer"
                            >
                                <div className="w-full text-center uppercase absolute top-0 left-0 group-hover:-top-[40px] transition-all duration-300">
                                    <div className="h-[40px] flex items-center justify-center">
                                        <span className="">{item.name}</span>
                                    </div>
                                    <div className="h-[40px] flex justify-center items-center">
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
