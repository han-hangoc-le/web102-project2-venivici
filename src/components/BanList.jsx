import './BanList.css'

export default function BanList ({ banList, removeFromBanList }) {
    return (
      <div className="banContainer">
        <h2>Banned Attributes</h2>
        {banList.length > 0 ? (
          banList.map((item, index) => (
            <button
              key={index}
              onClick={() => removeFromBanList(item)}
              className="banItemButton"
            >
              Unban: {item}
            </button>
          ))
        ) : (
          <p>No banned attributes.</p>
        )}
      </div>
    );
  };