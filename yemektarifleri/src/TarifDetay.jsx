
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./TarifDetay.css";

const TarifDetay = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(res.data);
      setComments(res.data.comments || []);
      setLoading(false);
    } catch {
      setRecipe(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/recipes/${id}/comments`, newComment);
      setNewComment({ name: "", comment: "" });
      fetchRecipe();
    } catch (err) {
      console.error("Yorum gönderme hatası:", err);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!recipe) return <p>Tarif bulunamadı!</p>;

  return (
    <div className="tarif-detay-container">
      <div className="tarif-detay-header">
        <img src={recipe.imgUrl} alt={recipe.name} className="tarif-detay-img" />
        <h1>{recipe.name}</h1>
      </div>

      <div className="tarif-detay-content">
        <h2>Malzemeler</h2>
        <ul>{recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>

        <h2>Yapılışı</h2>
        <p>{Array.isArray(recipe.instructions) ? recipe.instructions.join(" ") : recipe.instructions}</p>
      </div>
         
      <br />
      <br />

      <div style={{ marginBottom: '10px' , color: "purple" }}> <h2>YORUM YAP</h2> </div>

      <div className="comment-section">
        <div className="comments-and-form">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Adınız"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Yorumunuz"
              value={newComment.comment}
              onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
              required
            />
            <button type="submit">Yorum Yap</button>
          </form>

          <ul className="comments-list">
            {comments.map((c, idx) => (
              <li key={idx}>
                <strong>{c.user}:</strong> {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tarif-detay-footer" style={{ marginTop: "30px" }}>
        <Link to="/tarifler" className="back-button">← Geri Dön</Link>
      </div>
    </div>
  );
};

export default TarifDetay;






