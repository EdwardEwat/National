import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import Country from "./Country";
import { useSelector, useDispatch } from "react-redux";
import { fetchNations } from "../../redux/apiNation/apiNations";
import { Input, Pagination, Modal, InputNumber } from "antd";

const MainDiv = styled.div`
  margin: 20px;
`;

const SecondaryDiv = styled.div`
  display: flex;
  justify-items: center;
`;

const ListCountry = () => {
  const dispatch = useDispatch();
  const { nations, loading } = useSelector((state) => state.nation);

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCountry, setNewCountry] = useState({
    name: {
      common: "",
      official: "",
      nativeName: {},
    },
    flags: {
      svg: "",
      png: "",
      alt: "",
    },
    capital: [""],
    languages: {},
    population: 0,
    continents: [""],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        await dispatch(fetchNations());
      } catch (error) {
        console.error("Failed to fetch nations:", error);
      }
    };
    getList();
  }, [dispatch]);

  useEffect(() => {
    if (nations) {
      setCountries(nations);
      setFilteredCountries(nations);
    }
  }, [nations]);

  const reLoad = () => {
    dispatch(fetchNations());
  };

  const ClickSearch = () => {
    const searchValue = document.getElementById("Search").value.trim();
    if (searchValue) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredCountries(countries);
    }
    setCurrentPage(1);
  };

  const deleteCountry = (countryName) => {
    setCountries((prevCountries) =>
      prevCountries.filter((country) => country.name.common !== countryName)
    );
    setFilteredCountries((prevFiltered) =>
      prevFiltered.filter((country) => country.name.common !== countryName)
    );
  };

  const accessCountry = (country) => {
    navigate("/info", { state: { country } });
  };

  const AddCountry = () => {
    setCountries([...countries, newCountry]);
    console.log(newCountry);
    setFilteredCountries([...filteredCountries, newCountry]);
    setShowAddForm(false);
    setNewCountry({
      name: {
        common: "",
        official: "",
        nativeName: {},
      },
      flags: {
        svg: "",
        png: "",
        alt: "",
      },
      capital: [""],
      languages: {},
      population: 0,
      continents: [""],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [section]: {
        ...prevCountry[section],
        [field]: value,
      },
    }));
  };

  const handleNumberChange = (value) => {
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      population: value,
    }));
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [key]: [value],
    }));
  };

  const UpdateDB = () => {
    setUpdate((prev) => !prev);
  };

  const { Search } = Input;

  const sortedCountries = [...filteredCountries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  const currentItems = sortedCountries.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainDiv>
        <div className="flex items-center">
          <div className="flex border border-solid border-black rounded">
            <Search
              id="Search"
              placeholder="Nhập vào tên quốc gia"
              onSearch={ClickSearch}
              enterButton
            />
          </div>
          <div className="ml-3">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-md bg-green-300 p-2 w-20 font-medium"
            >
              <i className="bi bi-plus-lg"></i> Add
            </button>
            <button
              type="button"
              className=" rounded-md bg-blue-200 p-2 w-24 font-medium ml-3"
              onClick={UpdateDB}
            >
              <i className="bi bi-clipboard-fill"></i> Update
            </button>
            <button
              type="button"
              className=" rounded-md border-solid border border-green-300 p-2 w-32 font-medium ml-3"
              onClick={reLoad}
            >
              <i className="bi bi-arrow-counterclockwise"></i> Reload API
            </button>
          </div>
        </div>
        {showAddForm && (
          <Modal
            title="Add New Country"
            open={showAddForm}
            onOk={AddCountry}
            onCancel={() => setShowAddForm(false)}
          >
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Common Name:</span>
                </SecondaryDiv>
                <Input
                  type="text"
                  name="name.common"
                  value={newCountry.name.common}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Official Name:</span>
                </SecondaryDiv>
                <Input
                  type="text"
                  name="name.official"
                  value={newCountry.name.official}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Flag SVG URL:</span>
                </SecondaryDiv>
                <Input
                  type="text"
                  name="flags.svg"
                  value={newCountry.flags.svg}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Capital:</span>
                </SecondaryDiv>
                <Input
                  type="text"
                  name="capital"
                  value={newCountry.capital[0]}
                  onChange={(e) => handleArrayChange(e, "capital")}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Population:</span>
                </SecondaryDiv>
                <InputNumber
                  min={0}
                  value={newCountry.population}
                  style={{ width: "100%" }}
                  onChange={handleNumberChange}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Continents:</span>
                </SecondaryDiv>
                <Input
                  type="text"
                  name="continents"
                  value={newCountry.continents[0]}
                  onChange={(e) => handleArrayChange(e, "continents")}
                />
              </label>
            </div>
          </Modal>
        )}
        <div className="mt-5 rounded-md bg-gray-100">
          <div className="block bg-gray-400 font-semibold text-3xl pl-4 rounded-t-md pt-1 pb-2">
            Countries
          </div>
          <div className="m-4 mt-2">
            {currentItems.length !== 0 &&
              currentItems.map((item, index) => (
                <Country
                  acceptUpdate={update}
                  key={index}
                  onDelete={() => deleteCountry(item.name.common)}
                  onClick={() => accessCountry(item)}
                >
                  {item.name.common}
                </Country>
              ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredCountries.length}
            onChange={handlePageChange}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
      </MainDiv>
    </div>
  );
};

export default ListCountry;
