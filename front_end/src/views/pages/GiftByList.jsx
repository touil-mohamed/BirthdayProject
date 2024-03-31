import { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Navbar, Button } from "react-bootstrap";
import { CountContext } from "../../Provider";

const GiftList = () => {
  const [state, dispatch] = useContext(CountContext);
  const { listId } = useParams(); 

  useEffect(() => {
    const fetchGift = async () => {
      dispatch({ type: "Request" });
      try {
        const response = await axios.get(`http://localhost:3001/Gifts/List/${listId}`);
        console.log("requete apres api :",response);
        console.log("ListId",listId);
        dispatch({
          type: "giftSuccess",
          payload: response.data.gift,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération d'une List de cadeaux:", error);
        dispatch({
          type: "giftError",
          payload: error.message,
        });
      }
    };

    fetchGift();
  }, [dispatch, listId]);

  const handleDeleteGift = async (listId) => {
    try {
      await axios.delete(`http://localhost:3001/Gifts/${listId}`);
      dispatch({ type: "deleteGift", payload: listId });
    } catch (error) {
      console.error("Erreur lors de la suppression du cadeau:", error);
    }
  };

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Container>
</Navbar>
<h2>Gifts :</h2>
{state.loading ? (
  <p>Loading gifts...</p>
) : state.error ? (
  <p>Error: {state.error}</p>
) : (
  <div>
    {state.gifts.map((gift, index) => (
      <div key={gift.id} className="gift-summary" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <h3>Cadeau n° {index}</h3>
        <ul>
          <li><strong>Nom:</strong> {gift.name}</li>
          <li><strong>Prix:</strong> {gift.price} €</li>
          <li><strong>Prix d&apos;origine:</strong> {gift.original_price} €</li>
          <li><strong>Réservé:</strong> {gift.reserved ? "Oui" : "Non"}</li>
        </ul>
        <Button variant="primary">Modifier</Button>
        <button onClick={() => handleDeleteGift(index)}>Supprimer</button>
      </div>
    ))}
  </div>
)}

    </>
  );
};

export default GiftList;
