const DetailForm = ({ form = {} }) => {
    return (
        <div>
            <div className="flex items-center justify-between gap-4 pb-2 [&>*]:w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="phone_number">Phone Number</label>
                        {form.errors.phone_number &&
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
                        <label htmlFor="date_of_birth">Date of birth</label>
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
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="phone_number">Address</label>
                    {form.errors.phone_number && form.touched.phone_number && (
                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                            {form.errors.phone_number}
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
