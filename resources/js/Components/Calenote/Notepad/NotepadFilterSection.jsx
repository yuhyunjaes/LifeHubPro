import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/Components/Elements/FormInput.jsx";
import {useCallback, useEffect, useState} from "react";
export default function NotepadFilterSection({ setLoading }) {
    const [categories, setCategories] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");

    const getCategories = useCallback(async () => {
        setLoading(true);

        try {
            const res = await axios.get("/api/notepads/categories");
            if (res.data.success) {
                let categories = res.data.categories;
                categories = categories.filter((item, index, self) =>
                    index === self.findIndex(t => t.category === item.category)
                ).sort((a, b) => a.category.localeCompare(b.category));
                setCategories(categories);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div className="flex items-center space-x-5">
            <div className="min-w-[100px] sm:min-w-[150px]">
                <label htmlFor="category" className="form-label">카테고리</label>
                <select
                    className="form-control"
                    name="category"
                    id="category"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">전체</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>

            </div>

            <FormInput label="타이틀" name="title" id="title" />

            {/*<button className="flex px-4 cursor-pointer h-10 rounded-full md:rounded-2xl main-btn font-semibold items-center">*/}
            {/*    <FontAwesomeIcon icon={faPlus} />*/}
            {/*    <span className="hidden md:block">새 메모</span>*/}
            {/*</button>*/}
        </div>
    );
}
