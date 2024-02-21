import axios from 'axios';
import { useEffect, useState } from 'react';

const DetailForm = ({ form = {} }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        axios
            .get('https://vapi.vnappmob.com/api/province')
            .then((res) => setProvinces(res.data.results));
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/district/${form.values.province?.province_id}`,
            )
            .then((res) => {
                setDistricts(res.data.results);
            });
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/ward/${form.values.district?.district_id}`,
            )
            .then((res) => {
                setWards(res.data.results);
            });
    }, [form]);

    const handleSelectProvince = (e) => {
        const { name } = e.target;
        const province = provinces.find(
            (province) => province.province_id == e.target.value,
        );
        form.setFieldValue(name, province);
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/district/${e.target.value}`,
            )
            .then((res) => {
                setDistricts(res.data.results);
                form.setFieldValue('district', {
                    district_id: -1,
                    district_name: '--Select district--',
                });
                form.setFieldValue('ward', {
                    ward_id: -1,
                    ward_name: '--Select ward--',
                });
            });
    };

    const handleSelectDistrict = (e) => {
        const district = districts.find(
            (district) => district.district_id == e.target.value,
        );
        form.setFieldValue('district', district);
        axios
            .get(
                `https://vapi.vnappmob.com/api/province/ward/${e.target.value}`,
            )
            .then((res) => {
                setWards(res.data.results);
                form.setFieldValue('ward', {
                    ward_id: -1,
                    ward_name: '--Select ward--',
                });
            });
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-4 pb-2 [&>*]:w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="address" className="font-medium">
                            Phone Number
                        </label>
                        {form.errors.address &&
                            form.touched.phone_number && (
                                <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                    {form.errors.phone_number}
                                </span>
                            )}
                    </div>
                    <input
                        type="tel"
                        name="phone_number"
                        id="phone_number"
                        placeholder="0xxx xxx xxx"
                        value={form.values.phone_number}
                        onChange={form.handleChange}
                        className="mt-1 w-full rounded-md border border-gray-400 p-2.5 outline-none 
                        ring-2 ring-transparent transition-all focus:border-transparent focus:ring-slate-800
                        2xl:rounded-xl 2xl:p-4 2xl:text-3xl"
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="date_of_birth" className="font-medium">
                            Date of birth
                        </label>
                        {form.errors.date_of_birth &&
                            form.touched.date_of_birth && (
                                <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                    {form.errors.date_of_birth}
                                </span>
                            )}
                    </div>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        value={form.values.date_of_birth}
                        onChange={form.handleChange}
                        className="mt-1 w-full rounded-md border border-gray-400 p-2.5 outline-none 
                        ring-2 ring-transparent transition-all focus:border-transparent focus:ring-slate-800
                        2xl:rounded-xl 2xl:p-4 2xl:text-3xl"
                    />
                </div>
            </div>
            <div className="pb-2 2xl:pb-8">
                <div className="flex items-center justify-between pb-2">
                    <label
                        htmlFor="province"
                        className="block font-medium 2xl:text-3xl"
                    >
                        Province/ City
                    </label>
                    {form.errors?.province?.province_id && (
                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                            {form.errors?.province?.province_id}
                        </span>
                    )}
                </div>
                <select
                    name="province"
                    id="province"
                    className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 
                        2xl:text-3xl`}
                    value={form.values.province?.province_id}
                    onChange={handleSelectProvince}
                >
                    <option value={-1}>--Select province--</option>
                    {provinces.map((province, index) => (
                        <option key={index} value={province.province_id}>
                            {province.province_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-4 [&>*]:w-full">
                <div className="pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="province"
                            className="block font-medium 2xl:text-3xl"
                        >
                            District/ County
                        </label>
                        {form.errors.district?.district_id && (
                            <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {form.errors.district?.district_id}
                            </span>
                        )}
                    </div>
                    <select
                        name="province"
                        id="province"
                        className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                        value={form.values.district?.district_id}
                        onChange={handleSelectDistrict}
                    >
                        <option value={-1}>--Select district--</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district.district_id}>
                                {district.district_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="province"
                            className="block font-medium 2xl:text-3xl"
                        >
                            Ward/ Commune
                        </label>
                        {form.errors.ward?.ward_id && (
                            <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {form.errors.ward?.ward_id}
                            </span>
                        )}
                    </div>
                    <select
                        name="province"
                        id="province"
                        className={`w-full rounded-md
                            border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                            2xl:p-4 
                            2xl:text-3xl`}
                        value={form.values.ward?.ward_id}
                        onChange={(e) => {
                            const ward = wards.find(
                                (ward) => ward.ward_id == e.target.value,
                            );
                            form.setFieldValue('ward', ward);
                        }}
                    >
                        <option value={-1}>--Select ward--</option>
                        {wards.map((ward, index) => (
                            <option key={index} value={ward.ward_id}>
                                {ward.ward_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="address" className="font-medium">
                        Address
                    </label>
                    {form.errors.address && form.touched.address && (
                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                            {form.errors.address}
                        </span>
                    )}
                </div>
                <textarea
                    name="address"
                    value={form.values.address}
                    onChange={form.handleChange}
                    placeholder="Address"
                    className="w-full resize-none rounded-md border border-gray-400 px-2 py-1 outline-none 
                    ring-2 ring-transparent focus:border-transparent focus:ring-black"
                    rows={3}
                ></textarea>
            </div>
        </div>
    );
};

export default DetailForm;
