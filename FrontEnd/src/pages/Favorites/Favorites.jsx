import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../components';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const favorite_product_ids = favoriteProducts.map((prod) => prod.id);

    useEffect(() => {
        if (isAuthenticated) {
            request
                .get('/me/favorites')
                .then((res) => setFavoriteProducts(res.data.favorite_products));
        }
    }, [isAuthenticated]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-4">
            <h2 className="pb-4 text-2xl font-medium">Favorite Products</h2>
            {isAuthenticated ? (
                <>
                    {favoriteProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                            {favoriteProducts.map((product, index) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                        isFavorite={favorite_product_ids.includes(
                                            product.id,
                                        )}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="relative left-1/2 top-2/3 w-full -translate-x-1/2 select-none py-20 opacity-60">
                            <div className="flex items-center justify-center text-center">
                                <img
                                    src="/shoes-store/src/assets/images/open-box.png"
                                    alt=""
                                    className="size-60 object-cover"
                                />
                            </div>
                            <h3
                                className="text-center font-BebasNeue text-3xl font-medium capitalize tracking-widest
                                        text-slate-400"
                            >
                                No product found
                            </h3>
                        </div>
                    )}
                </>
            ) : (
                <div className="select-none opacity-60">
                    <div className="flex items-center justify-center text-center">
                        <img
                            src="/shoes-store/src/assets/images/open-box.png"
                            alt=""
                            className="size-60 object-cover"
                        />
                    </div>
                    <h3
                        className="text-center font-BebasNeue text-3xl font-medium capitalize tracking-widest
                text-slate-400"
                    >
                        No product show here{' '}
                        <Link to="/login" className="font-medium">
                            login
                        </Link>{' '}
                        to see
                    </h3>
                </div>
            )}
        </div>
    );
};

export default Favorites;
