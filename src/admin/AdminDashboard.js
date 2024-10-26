import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import SellerCategories from '../Components/SellerCategories';
import AdminSellerItems from './AdminSellerItems';
import AdminSellerCategories from './AdminSellerCategories';
import AdminItemType from './AdminItemType';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [currentPage, setCurrentPage] = useState(1);  // 🆕 Pagination state
  const [categoriesPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
  
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch

        const categoriesResponse = await axios.get(`${BASE_URL}/items/get/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Categories:', categoriesResponse.data);
        console.log('Items:', itemsResponse.data);
  
        const categoryCounts = {};
        itemsResponse.data.forEach(item => {
          if (item.category) {
            const categoryName = item.category.name;
            categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
          }
        });
        
        console.log('Category counts:', categoryCounts);
        console.log('Category counts:', categoryCounts);
  
        const categoriesWithItemCounts = categoriesResponse.data.map(category => {
          const categoryName = category.name;
          return { ...category, itemsCount: categoryCounts[categoryName] || 0 };
        });
  
        console.log('Categories with item counts:', categoriesWithItemCounts);
        setIsLoading(false);  // 🆕 Hide loader after fetch

        setCategories(categoriesWithItemCounts);
      } catch (error) {
        setIsLoading(false);  // 🆕 Hide loader after fetch

        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/admin/category-items/category/${categoryId}`);
    } else {
      console.error('Invalid category ID:', categoryId);
    }
  };

  const handleAddCategory = () => {
    navigate('/admin/addcategory');
  };


    // Pagination logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  
    const totalPages = Math.ceil(categories.length / categoriesPerPage);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (
    <div className="admin-dashboard-container" style={{padding:"10px auto"}}>
      <h1>Dashboard</h1>

      {isLoading ? (  // 🆕 Display loader during fetching
                <div className="loader-container">
                    <div className="loader"></div>
                    <h2> Loading ...</h2>
                </div>
            ) : (
                <>

      <button style={{margin:"0 auto"}} onClick={handleAddCategory} className="add-buttons ad">ADD CATEGORY</button>
      <div className="categories-list">
        {currentCategories .map(category => (
          <div key={category.id} className="category-item" onClick={() => handleCategoryClick(category.id)}>
            <h2>{category.name}</h2>
            <h3>Total Items : {category.itemsCount || 0}</h3> {/* Display item count */}
            {category.image && (
              <img
                src={`data:image/jpeg;base64,${category.image}`}
                alt={category.name}
                className="category-image"
              />
            )}
            <button onClick={() => handleCategoryClick(category.id)}>
              View Items
            </button>
            {/* Debugging line */}
            {console.log('Category ID:', category.id)}
          </div>
        ))}
      </div>

  {/* Pagination Controls */}
  <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
                {i + 1}
              </button>
            ))}
          </div>






      </>
            )}




      
      <hr/>
      <AdminSellerCategories />
      <AdminItemType/>
    
    </div>
  );
}

export default AdminDashboard;
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const token = localStorage.getItem('token');
  
  //     try {
  //       const response = await axios.get('http://localhost:8080/items/get/category', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  
  //       const categoriesWithItemCounts = response.data.map(category => {
  //         const itemCount = response.data.reduce((count, cat) => {
  //           if (cat.id === category.id) {
  //             return count + 1;
  //           }
  //           return count;
  //         }, 0);
  
  //         return { ...category, itemsCount: itemCount };
  //       });
  
  //       setCategories(categoriesWithItemCounts);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  
  //   fetchCategories();
  // }, []);