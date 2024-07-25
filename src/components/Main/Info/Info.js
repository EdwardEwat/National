import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  height: 791px;
  margin: 10px;
`;
const SpanTag = styled.span`
  font-family: PonPips;
  font-size: 20px;
  width: 200px;
  font-weight: 700;
`;
const Span = styled.span`
  font-family: PonPips;
  font-size: 20px;
`;
const SecondaryDiv = styled.div`
  margin-left: 20px;
  display: flex;
  justify-items: center;
`;

const Info = () => {
  document.title = "Mô tả quốc gia";
  const location = useLocation();
  const navigate = useNavigate();
  const { country } = location.state || {};

  if (!country) {
    navigate("/");
    return null;
  }
  const renderNativeNames = () => {
    if (!country.name.nativeName) return null;

    return Object.keys(country.name.nativeName).map((langCode) => (
      <div key={langCode}>
        <SpanTag>{country.languages[langCode]}: </SpanTag>
        <Span>
          <strong>Official:</strong>{" "}
          {country.name.nativeName[langCode].official}
          <br />
          <strong>Common:</strong> {country.name.nativeName[langCode].common}
        </Span>
      </div>
    ));
  };
  return (
    <MainDiv>
      <div className="block font-['PonPips'] font-medium text-4xl">
        Information about {country.name.common}
      </div>
      <div>
        <div>
          <SecondaryDiv>
            <SpanTag>National flag: </SpanTag>
            <img
              className="border border-solid border-black rounded object-cover"
              src={country.flags.svg}
              alt={country.name.common}
              style={{ width: "150px" }}
            />
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Full country name: </SpanTag>
            <Span>{country.name.official}</Span>
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Native name: </SpanTag>
            <Span>{renderNativeNames()}</Span>
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Capital: </SpanTag>
            <Span>{country.capital}</Span>
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Population: </SpanTag>
            <Span>{country.population} people</Span>
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Continent: </SpanTag>
            <Span>{country.continents.join(", ")}</Span>
          </SecondaryDiv>
          <SecondaryDiv>
            <SpanTag>Languages: </SpanTag>
            <Span>{Object.values(country.languages).join(", ")}</Span>
          </SecondaryDiv>
        </div>
      </div>

      <button
        className="m-4 bg-blue-200 p-2 rounded-md"
        onClick={() => navigate(-1)}
      >
        <i class="bi bi-arrow-bar-left"></i> Back to List
      </button>
    </MainDiv>
  );
};

export default Info;
