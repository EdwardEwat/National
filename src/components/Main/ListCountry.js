import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Country from "./Country";

const MainDiv = styled.div`
  margin: 20px;
`;

const SecondaryDiv = styled.div`
  display: flex;
  justify-items: center;
`;

const getAPI = () => {
  return axios
    .get(
      "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,name,population,continents,flags"
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const ListCountry = () => {
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

  const navigate = useNavigate();

  const UpdateDB = () => {
    const update1 = !update;
    setUpdate(update1);
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

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [key]: [value],
    }));
  };

  const reLoad = () => {
    getAPI().then((listCountry) => {
      setCountries(listCountry);
      setFilteredCountries(listCountry);
    });
  };

  useEffect(() => {
    getAPI().then((listCountry) => {
      setCountries(listCountry);
      setFilteredCountries(listCountry);
    });
  }, []);

  return (
    <div>
      <MainDiv>
        <div className="flex items-center">
          <div className="flex border border-solid border-black rounded">
            <input
              type="text"
              className="p-1"
              id="Search"
              placeholder="Input name of country"
            />
            <div className="cursor-pointer p-1" onClick={ClickSearch}>
              <i className="bi bi-search"></i>
            </div>
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
              <i class="bi bi-arrow-counterclockwise"></i> Reload API
            </button>
          </div>
        </div>
        {showAddForm && (
          <div className="mt-5 p-4 bg-gray-100 rounded-md w-64">
            <h2 className="font-semibold text-xl">Add New Country</h2>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Common Name:</span>
                </SecondaryDiv>
                <input
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
                <input
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
                <input
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
                <input
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
                <input
                  type="number"
                  name="population"
                  value={newCountry.population}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="my-2">
              <label>
                <SecondaryDiv className="inline w-44 mr-3">
                  <span>Continent:</span>
                </SecondaryDiv>
                <input
                  type="text"
                  name="continents"
                  value={newCountry.continents[0]}
                  onChange={(e) => handleArrayChange(e, "continents")}
                />
              </label>
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={AddCountry}
            >
              Add Country
            </button>
          </div>
        )}
        <div className="mt-5 rounded-md bg-gray-100">
          <div className="block bg-gray-400 font-semibold text-3xl pl-4 rounded-t-md pt-1 pb-2">
            Countries
          </div>
          <div className="m-4 mt-2">
            {filteredCountries
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
              .map((item, index) => (
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
        </div>
      </MainDiv>
    </div>
  );
};

export default ListCountry;
