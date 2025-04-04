import './MainCard.css'
import { useEffect, useState } from 'react';

export default function MainCard({ addToBanList, setSeenArtworks, banList }) {
    const objectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    
    
    const [objectIDs, setObjectIDs] = useState([])
    const [artwork, setArtwork] = useState(null)

    //fetch the list of objects available
    useEffect(() => {
        fetch(objectsUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.objectIDs && Array.isArray(data.objectIDs)) {
                setObjectIDs(data.objectIDs)
            } else {
              console.error("Invalid object IDs list:", data)
            }
          })
          .catch((error) => console.error("Error fetching object IDs:", error))
    }, [])

    //fetch the artwork to be displayed
    const fetchArtwork = async () => {
        if (objectIDs.length === 0) {
            console.error("No object IDs available.")
            return
        }

        let validArtwork = null

        while (!validArtwork) {
            const randomID = objectIDs[Math.floor(Math.random() * objectIDs.length)]
            const artworkUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`

            try {
                const response = await fetch(artworkUrl)
                if (!response.ok) throw new Error(`Failed to fetch artwork. Status: ${response.status}`)
                
                const data = await response.json()
                console.log("Fetched artwork:", data)
                if (
                    data.primaryImage &&
                    data.title &&
                    data.department &&
                    data.period &&
                    data.artistNationality &&
                    data.classification &&
                    !banList.includes(data.department) &&
                    !banList.includes(data.period) &&
                    !banList.includes(data.artistNationality) &&
                    !banList.includes(data.classification)
                ) {
                    validArtwork = data
                    setArtwork(data);
                    setSeenArtworks((prev) => [...prev, validArtwork]);
                } else {
                    console.warn("Invalid artwork - skipping:", data)
                }
            } catch (error) {
                console.error("Error fetching artwork:", error)
            }
        }   
    }

    //department objectName period artistDisplayName artistNationality classification
    return (
        <>
            <div className='maincard'>
                <h1 className='webtitle'>Explore the MET</h1>
                <h2>What is there in the MET?</h2>
                {artwork && (
                    <>
                        <img src={artwork.primaryImage} alt={artwork.title} className='image'/>
                        <h3 className='artworkTitle'>{artwork.title}</h3>
                        <h4>Artist: {artwork.artistDisplayName}</h4>
                        <div className='buttonGroup'>
                            <button type='attribute' className='attribute' onClick={() => addToBanList(artwork.department)}>Dept: {artwork.department || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={() => addToBanList(artwork.period)}>Period: {artwork.period || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={() => addToBanList(artwork.artistNationality)}>Nationality: {artwork.artistNationality || "N/A"}</button>
                            <button type='attribute' className='attribute' onClick={() => addToBanList(artwork.classification)}>Classification: {artwork.classification || "N/A"}</button>
                        </div>

                    </>
                )}
                <button onClick={fetchArtwork} className='button'>Discover</button>
            </div>
        </>
    )
}