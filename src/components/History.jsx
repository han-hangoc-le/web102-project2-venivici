import './History.css'

const History = ({ seenArtworks }) => {
  return (
    <div className="historyContainer">
      <h2>Artwork History</h2>
      {seenArtworks.length > 0 ? (
        seenArtworks.map((artwork, index) => (
          <div key={index} className='entry'>
            <h3>{artwork.classification}</h3>
            <img src={artwork.primaryImage} alt={artwork.title} className='img'/>
            <p>Artist: {artwork.artistDisplayName}</p>
          </div>
        ))
      ) : (
        <p>No artworks viewed yet.</p>
      )}
    </div>
  );
};

export default History;