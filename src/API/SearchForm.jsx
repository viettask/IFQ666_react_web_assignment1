import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';


function SearchForm() {
    const [industry, setIndustry] = React.useState("");
    const [error, setError] = React.useState(null);
    const [options, setOptions] = React.useState([
        { value: 'software', label: 'Software' },
        { value: 'devops', label: 'Devops' },
        { value: 'data', label: 'Data' }
    ]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleAddOption = () => {
        if (!industry.trim()) return;

        const newOption = {
            value: industry.toLowerCase(),
            label: industry.charAt(0).toUpperCase() + industry.slice(1)
        };

        // Prevent duplicates
        if (options.some(opt => opt.value === newOption.value)) {
            setError("This industry already exists.");
            return;
        }

        setOptions(prev => [...prev, newOption]);
        setIndustry("");
        setError(null);
    };

    const handleSearch = async () => {
        if (!selectedOption) {
            alert("Please select a topic to search.");
            return;
        }

        setLoading(true);
        setArticles([]);
        try {
            const apiKey = '7b095b192f894b7d9d8a66750fb79c23'; // replace with your NewsAPI key
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(selectedOption.value)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
            );
            setArticles(response.data.articles);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch news. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">Please enter an industry that you like?  </h3>
            <h5 className="text-gray-600 mb-4 text-sm">Software, Devops, Data are addressed.</h5>

            {/* Input field */}
            <div className="mb-4">
                <label htmlFor="industry" className='block text-gray-700 font-medium mb-1'>Your answer: </label>
                <input
                    type="text"
                    name="industry"
                    id="industry"
                    value={industry}
                    onChange={
                        (event) => {
                            if (/[0-9]/.test(event.target.value)) {
                                setError("A industry shouldn't have numbers");
                            } else {
                                setError(null);
                            }
                            setIndustry(event.target.value);
                        }
                    }
                />


            </div>


            {error != null ? <p className="text-red-500 mt-1">Error: {error}</p> : (<p className="text-red-500 mt-1">please do not enter numbers</p>)}

            {/* Add button */}
            <div className="mb-4">
                <button
                    onClick={handleAddOption}
                    className="mt-2 px-3 py-1text-black rounded"
                >
                    Add to Select
                </button>
            </div>

            {/* Select dropdown */}
            <h5 className="text-gray-600 mb-4 text-sm">Please choose an option that you wanna to search</h5>
            <div >
                <Select
                    options={options}
                    value={selectedOption}
                    onChange={setSelectedOption}   // <-- this uses setSelectedOption
                    placeholder="Select your favorite career path"
                    className="mb-4"
                    isClearable
                />
            </div>

            {/* Search button */}
            <div className="mb-4">
                <button
                    onClick={handleSearch}
                    className="mt-2 px-3 py-1 bg-green-500 text-black rounded"
                >
                    Search
                </button>
            </div>

            {/* Display fetched news */}
            <div>
                {loading && <p>Loading news...</p>}
                {!loading && articles.length > 0 && (
                    <div className="space-y-4">
                        {articles.map((article, idx) => (
                            <div key={idx} className="p-3 bg-gray-100 rounded shadow">
                                <h3 className="font-semibold">{article.title}</h3>
                                <p className="text-sm text-gray-700">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    Read more
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchForm
