import './MainCard.css'
import { useEffect, useState } from 'react';

export default function MainCard() {
    const objectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    
    
    const [objectIDs, setObjectIDs] = useState([])
    const [artwork, setArtwork] = useState(null)
    const [loading, setLoading] = useState(true)

    //fetch the list of objects available
    useEffect(() => {
        // fetch(objectsUrl)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.objectIDs && Array.isArray(data.objectIDs)) {
        //         setObjectIDs(data.objectIDs)
        //     } else {
        //       console.error("Invalid object IDs list:", data)
        //     }
        //   })
        //   .catch((error) => console.error("Error fetching object IDs:", error))
        const filterValidArtworks = async () => {
            try {
                console.log("Fetching object IDs...")
                const response = await fetch(objectsUrl)
                if (!response.ok) throw new Error("Failed to fetch object IDs.")

                const data = await response.json()
                if (!data.objectIDs || !Array.isArray(data.objectIDs)) {
                    console.error("Invalid object IDs list:", data)
                    return
                }

                let validIDs = []

                for (const id of data.objectIDs) {
                    const artworkUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                    
                    try {
                        const response = await fetch(artworkUrl)
                        if (!response.ok) continue

                        const artwork = await response.json()
                        console.log("Fetched: ", artwork.objectID)
                        if (artwork.primaryImage && artwork.title && artwork.department && artwork.period && artwork.artistNationality && artwork.classification) {
                            validIDs.push(artwork.objectID)
                            console.log("Finished: ", artwork.objectID)
                        }
                    } catch (error) {
                        console.error("Error fetching artwork:", error)
                    }
                }

                console.log("Valid artworks count:", validIDs.length);

                if (validIDs.length === 0) {
                    console.error("No valid artworks found.")
                } else {
                    setObjectIDs(validIDs)
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching and filtering artworks:", error)
                setLoading(false)
            }
        };

        filterValidArtworks();
    }, [])

    //fetch the artwork to be displayed
    const fetchArtwork = async () => {
        if (loading) {
            console.warn("Still loading valid artworks...");
            return;
        }

        if (objectIDs.length === 0) {
            console.error("No object IDs available.")
            return
        }

        const randomID = objectIDs[Math.floor(Math.random() * objectIDs.length)]
        const artworkUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`

        try {
            const response = await fetch(artworkUrl)
            if (!response.ok) throw new Error(`Failed to fetch artwork. Status: ${response.status}`)
            const data = await response.json()
            console.log("Fetched artwork:", data)
            setArtwork(data);
        } catch (error) {
            console.error("Error fetching artwork:", error)
        }   
    }

    //department objectName period artistDisplayName artistNationality classification
    return (
        <>
            <div className='maincard'>
                <h1>Explore the MET</h1>
                <h2>What is there in the MET?</h2>
                {artwork && (
                    <>
                        <img src={artwork.primaryImage} alt={artwork.title} className='image'/>
                        <h3>{artwork.title}</h3>
                        <h4>Artist: {artwork.artistDisplayName}</h4>
                        <div className='buttonGroups'>
                            <button type='attribute' className='attribute' onClick={null}>Dept: {artwork.department || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={null}>Period: {artwork.period || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={null}>Nationality: {artwork.artistNationality || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={null}>Classification: {artwork.classification || "N/A"}</button>
                        </div>

                    </>
                )}
                <button onClick={fetchArtwork} className='button'>Discover</button>
            </div>
        </>
    )
}