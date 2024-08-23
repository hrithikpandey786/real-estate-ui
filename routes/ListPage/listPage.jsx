import {React, Suspense} from "react"
import {listData} from "../../lib/dummydata";
import "./listPage.scss"
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter"
import Map from "../../components/Map/Map";
import { useLoaderData,Await } from "react-router-dom";

export default function Listpage(){
    const items = useLoaderData();
    
    return( 
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                        <Filter/>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={items.postResponse}
                            errorElement = {<p>Error Loading Posts</p>}
                        >
                        {({postResponse})=>(
                            items.postResponse._data.data.map(post=>(
                                <Card key={post.id} item={post}></Card>
                            ))
                        )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={items.postResponse}
                            errorElement = {<p>Error Loading Posts</p>}
                        >
                        {({postResponse})=>(
                            <Map items={items.postResponse._data.data}></Map>
                        )}
                        </Await>
                    </Suspense>
            </div>
        </div>
    )
}