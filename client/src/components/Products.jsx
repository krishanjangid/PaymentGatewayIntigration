import axios,{AxiosError} from "axios";
import { greatestIndex } from "d3";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import {RoundedSpinner5 } from "r-spinners";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [loadfailed, setLoadfailed] = useState(false);

  const [allproducts, setAllproducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showmore, setShowmore] = useState(false);
   const [selectedIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    const fatchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
        setAllproducts(data);
        setLoading(false);
        setFilteredProducts(products)
        
      } catch (error) {
        
         if(error instanceof AxiosError){
           setLoadfailed(true);
           setLoading(false);
         }
      }
    };
    fatchData();
    
    
  },[]);

  const handlebuy = async (index) => {
    console.log(products[index]);
    const productdetails = products[index];
    try {
      const result = await axios.post(
        "http://localhost:4000/api/v1/users/create-checkout-session",
        productdetails,
        {
          headers: {
            "Content-Type": "application/json",
            access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkNjNhODM1ZTYzYjliMDg3OTc2NmUiLCJpYXQiOjE2ODcxOTAzNjR9.kSuMbWZGibWNrS9lvE7Ri60YmfTJN-mNfslaDt1EI4Y`,
          },
        }
      );
      console.log(result.data.url);

      window.location.replace(result.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowmore = (index) => {
  
    setSelectedIndex(index);
    if(selectedIndex === index){
      setShowmore(true);
      setSelectedIndex(null);
    }
    setShowmore(false);
  };

  const handlesort = (e) => {
    if (e.target.value === "lth") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorted);
      console.log(products);

    }
    else if (e.target.value === "htl") {
      const sorted =  [...products].sort((a, b) => b.price - a.price);
      setProducts(sorted);
    }
    else if (e.target.value === "default") {
      setProducts(allproducts);
    }

  };

  //search filter
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  

  const handlesearch = (e) => {
    setSearch(e.target.value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      ));
    console.log(search);
  }
  
  return (
    <>
      <div className=" mt-10">
        <h1 className="text-center text-4xl mb-10">
          Products | Stripe Payments
        </h1>
        <div className="flex justify-center  mb-16 ">
        <div className="w-1/2 flex justify-evenly items-center gap-20 drop-shadow-2xl    rounded-full mb-5">
        <SearchFilter search={search} handlesearch={handlesearch} />
        <SortFilter products={products} handlesort={handlesort} />
        </div>
        </div>
        {loading?<div className="container m-auto flex justify-center"><RoundedSpinner5 color={"black"} thickness={2} /></div> :<div>

        <div className="p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2  ">
        
          {products.map((product, index) => {
            return (
              <div
                key={product.id}
                className={selectedIndex===index ? "max-w-sm  z-10 rounded overflow-hidden shadow-lg " : "max-w-sm rounded overflow-hidden shadow-lg shadow-slate-200 m-8 border-1"}
              >
                <img
                  className=" h-40 m-auto"
                  src={product.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 pt-4  flex justify-between font-bold">
                  <span>Price:</span> <span>₹{product.price.toFixed(2)}</span>
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl">
                    {product.title}
                  </div>
                  <p className="text-gray-700 text-base  ">
                  {/* {showmore ? product?.description : product?.description.substr(0, 100)} */}
                  {selectedIndex === index ? product?.description : product?.description.substr(0, 100)+'.....'}
                    <button
                      className="text-blue-500"
                      onClick={() => handleShowmore(index)}
                    >
                      {selectedIndex === index ? "Show less" : "Show more"}
                    </button>
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #product
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #ecommerce
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #lifestyle
                  </span>
                </div>
                <div className="mt-3 px-10 mb-2 ">
                  <button
                    className="w-full h-10  bg-neutral-950 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => handlebuy(index)}
                  >
                    
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div> } : {loadfailed?<p className="text-center text-2xl">Something went wrong :( </p>:null}
        
      </div>
    </>
  );
}

const SearchFilter = ({handlesearch,search}) => {
  

  return (
    <div className="flex ">
      <div className="flex gap-3 ">
        
        <input
          type="text"
          value={search}
          className="w-80 h-12  rounded-full px-5 text-lg  py-1 pr-5 font-semibold text-black border-2 border-gray-300 focus:outline-none focus:border-gray-500  "
          placeholder="Search"
          onChange={handlesearch}
        />
      </div>
    </div>
  );
};

const SortFilter = ({handlesort}) => {
   
  return (
    <div className="flex justify-end  ">
        <div className="flex gap-3 justify-center items-center drop-shadow-lg  ">
        <label className="text-black font-semibold text-lg ">Sort By</label>
          <select className="  w-40  h-10  bg-neutral-950 rounded-full px-6 py-1 pr-5 text-md font-semibold text-white  "
          onChange={handlesort}
          > 
            <option value="default">All Products</option>
            <option value="lth">Low to High</option>
            <option value="htl">High to low</option>
          </select>
        </div>
        </div>
  )
};
