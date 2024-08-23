import React from "react"
import "./homePage.scss";
import SearchBar from "../../components/SearchBar/searchBar";

export default function HomePage() {
    return (
        <div className="homepage">
            <div className="textContainer">
                <div className="wrapper">
                        <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis dolorum sequi sunt nulla voluptas error ducimus beatae. Qui odit ut id reiciendis iusto quae quas sit suscipit repellendus esse.</p>
                    
                    <SearchBar/>

                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png"></img>
            </div>
        </div>
    )
}