from flask import request
from flask_cors import cross_origin
from flask_restful import Resource

from models.brand import Brand
from models.shoe_type import ShoeType


class BrandResource(Resource):
    @cross_origin()
    def get(self):
        brands = Brand.query.all()
        data = []
        for brand in brands:
            shoe_types = ShoeType.query.filter_by(brand_id=brand.id).all()
            brand_data = brand.to_json()
            brand_data["shoe_types"] = [shoe_type.to_json() for shoe_type in shoe_types]
            data.append(brand_data)
        return {"brands": data}, 200


class GetBrandResource(Resource):
    @cross_origin()
    def get(self, brand_code=None):
        if not brand_code:
            return {"message": "No brand_code is provided"}, 400
        brand = Brand.query.filter_by(code=brand_code).first()
        if not brand:
            return {
                "message": f"No brand was found that satisfied brand_code = {brand_code}"
            }, 200
        shoe_types = ShoeType.query.filter_by(brand_id=brand.id).all()
        result = brand.to_json()
        print(result)
        result["shoe_types"] = [shoe_type.to_json() for shoe_type in shoe_types]
        return {"brand": result}, 200
