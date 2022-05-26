import React, { useState } from 'react';
import Axios from 'axios';
import '../css/home.css'

const Home = () => {
    const [tripList, setTripList] = useState([]);
    const [query, setQuery] = useState("");

    //Axios to get response from api-gateway
    const search = () => {
        Axios.get(`http://localhost:5000/api/trips?keyword=${query}`).then((res) => {
            if (res.status === 200) {
                setTripList(res.data);
                console.log(res.data);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <h1>เที่ยวไหนดี</h1>
            <form>
                <input
                    className='searchbox'
                    type="text"
                    placeholder="หาที่เที่ยวแล้วไปกัน..."
                    onChange={(event) => { setQuery(event.target.value); }}
                    onKeyPress={search}
                    value={query}>
                </input>
            </form>
            <div>
                {/* Map search results into the webpage*/}
                {tripList.map((trip, index) => {
                    return (
                        <div className='triplist'>
                            <img className='mainimg' src={tripList[index].photos[0]} />
                            <h2 className='title'>
                                <a href={tripList[index].url}>
                                    {tripList[index].title}
                                </a>
                            </h2>
                            <p className='description'>
                                {tripList[index].description.substring(0, 180)} ...
                                <a href={tripList[index].url}>
                                    อ่านต่อ
                                </a>
                            </p>
                            <p className='tags'>หมวด
                                <ul>
                                    {
                                        tripList.map((tag, id) => {
                                            return (
                                                <li>
                                                    {/* When click down the mouse, set the tag as query. And when release, search by that query */}
                                                    <a className='tagslist' onMouseDown={() => setQuery(tripList[index].tags[id])} onClick={search}>
                                                        {tripList[index].tags[id]}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </p>
                            <img className='subimg' src={tripList[index].photos[1]} />
                            <img className='subimg' src={tripList[index].photos[2]} />
                            <img className='subimg' src={tripList[index].photos[3]} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;