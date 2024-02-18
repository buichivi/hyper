import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../components';

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

    return (
        <div className="py-4">
            <h2 className="pb-4 text-2xl font-medium">Favorite Products</h2>
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
        </div>
    );
};

export default Favorites;
