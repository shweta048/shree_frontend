import { useEffect, useState } from "react";
import "../styles/news.css";
import { getNews, getNewsById } from "../services/newsServices";

function News() {
  const [news, setNews] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Fetch all news
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNews(res.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // ✅ Fetch single news
  const handleReadMore = async (id) => {
    try {
      const res = await getNewsById(id);
      setSelectedItem(res.data);
    } catch (error) {
      console.error("Error fetching news by ID:", error);
    }
  };

  return (
    <>
      <section className="news" data-aos="fade-up">
        <h1 data-aos="fade-up">Latest News</h1>

        <div className="news-grid">
          {news.map((item, index) => (
            <div
              className="news-card"
              key={item._id || index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {/* <img
                src={item.image || "https://via.placeholder.com/400x200"}
                alt={item.title}
              /> */}

              <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "/no-image.png"
                }
                alt="project"
                onError={(e) => {
                  e.target.src = "/no-image.png";
                }}
              />

              <div className="news-content">
                <h3>{item.title}</h3>
                <p>
                  {item.shortDesc || item.description?.slice(0, 80) + "..."}
                </p>

                <button onClick={() => handleReadMore(item._id)}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FIXED MODAL */}
      {selectedItem && (
        <div
          className="news-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="news-close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>

            <h2>{selectedItem.title}</h2>

            {/* <img
                src={selectedItem.image || "https://via.placeholder.com/400x200"}
                alt={selectedItem.title}
              /> */}
            <img
              src={
                selectedItem.image
                  ? `http://localhost:5000/uploads/${selectedItem.image}`
                  : "/no-image.png"
              }
              alt="project"
              onError={(e) => {
                e.target.src = "/no-image.png";
              }}
            />

            <div className="news-modal-content">
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default News;
