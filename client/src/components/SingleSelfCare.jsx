
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SingleSelfCare() {
    const [selfCare, setSelfCare] = useState({})
    const { selfCare_id } = useParams()
    
    useEffect(() => {
        async function fetchSingleSelfCareIdea() {
            try {
                const response = await fetch(`http://localhost:8080/api/selfCare/${selfCare_id}`);
                const selfCare = await response.json();
                setSelfCare(selfCare)
            } catch (error) {
                console.error('Uh oh, trouble fetching single self care idea!', error);
            }
        }
        fetchSingleSelfCareIdea()
    }, [])

    return (
        <div>
            <h2>{selfCare.name}</h2>
            <p>Description: {selfCare.description}</p>
            {/* <p >Link to article: {selfCare.article_url}</p>  */}
            {/* <Link to={selfCare.article_url}>Click here for an aritcle to learn more</Link> */}
            <br />
            <Link to={'/selfCare'}>Back to all Self Care Ideas</Link>
            <br />
        </div>
    );
}
