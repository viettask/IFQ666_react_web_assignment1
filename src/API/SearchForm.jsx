// Import React and necessary hooks
import React, { useState } from 'react';
// Import react-select dropdown component
import Select from 'react-select';
// Import axios for API calls
import axios from 'axios';


function SearchForm() {
    // Stores the user's text input for adding a new industry option
    const [industry, setIndustry] = React.useState("");

    // Stores form-related validation errors
    const [error, setError] = React.useState(null);

    // Predefined list of dropdown options
    const [options, setOptions] = React.useState([
        { value: 'software', label: 'Software' },
        { value: 'devops', label: 'Devops' },
        { value: 'data', label: 'Data' }
    ]);

    // Stores the currently selected dropdown option

    const [selectedOption, setSelectedOption] = useState(null);
    // Stores fetched news articles
    const [articles, setArticles] = useState([]);
    // Tracks loading state during API call
    const [loading, setLoading] = useState(false);

    /**
     * 🔹 Add new user-defined industry to the dropdown list
     * - Validates for empty input
     * - Prevents duplicates
     * - Formats the label correctly (capitalize)
     */
    const handleAddOption = () => {
        // ignore empty values
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

        // Add new option to dropdown
        setOptions(prev => [...prev, newOption]);
        // Reset input and error message
        setIndustry("");
        setError(null);
    };

    /**
 * 🔹 Fetch news articles from NewsAPI based on the selected option
 */

    const handleSearch = async () => {
        if (!selectedOption) {
            alert("Please select a topic to search.");
            return;
        }

        setLoading(true);
        // reset previous results
        setArticles([]);
        try {
            const apiKey = '7b095b192f894b7d9d8a66750fb79c23'; //NewsAPI key
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${encodeURIComponent(selectedOption.value)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
            );
            // Store fetched results
            setArticles(response.data.articles);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch news. Please try again.");
        } finally {
            // Always stop loading
            setLoading(false);
        }
    };


    return (
        <div className='max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md'>
            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">Please enter an industry that you like?  </h3>
            <h5 className="text-gray-600 mb-4 text-sm">Software, Devops, Data are addressed.</h5>

            {/* Text input for adding new industry */}
            <div className="mb-4">
                <label htmlFor="industry" className='block text-gray-700 font-medium mb-1'>Your answer: </label>
                <input
                    className='button'
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

            {/* Error message (shows if user enters numbers) */}
            {error != null ? <p className="text-red-500 mt-1">Error: {error}</p> : (<p className="text-red-500 mt-1">please do not enter numbers</p>)}

            {/* Button to add new industry to dropdown */}
            <div className="mb-4">
                <button
                    onClick={handleAddOption}
                    className="mt-2 px-3 py-1text-black rounded button"
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
                    className="mb-4 text-black"
                    isClearable
                />
            </div>

            {/* Search button */}
            <div className="mb-4">
                <button
                    onClick={handleSearch}
                    className="mt-2 px-3 py-1 bg-green-500 text-black rounded button"
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

// Export the component so it can be used in other parts of the app
export default SearchForm
