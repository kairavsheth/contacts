import React, { useState } from "react";
import ListView from "./components/list-view";
import SingleView from "./components/single-view";

export default function App() {
    const [contact, setContact] = useState(null);
    const [list, setList] = useState([]);

    return (
        <div className="max-h-screen min-h-screen flex flex-row justify-between">
            <ListView setContact={setContact} list={list} setList={setList}/>
            <SingleView contact={contact} setContact={setContact} setList={setList} />
        </div>
    );
}
