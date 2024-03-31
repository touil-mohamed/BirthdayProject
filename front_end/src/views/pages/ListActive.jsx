import { useEffect, useContext } from "react";
import axios from "axios";
import { Container, Navbar, Button } from "react-bootstrap";
import { CountContext } from "../../Provider";

const GiftListActive = () => {
  const [state, dispatch] = useContext(CountContext);

  useEffect(() => {
    const fetchLists = async () => {
      dispatch({ type: "Request" });
      try {
        const response = await axios.get("http://localhost:3001/GiftsList/active");
        dispatch({
          type: "giftsListSuccess",
          payload: response.data.giftList,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des cadeaux:", error);
        dispatch({
          type: "giftsListError",
          payload: error.message,
        });
      }
    };

    fetchLists();
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "long" });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
          <Navbar.Brand href="/Gifts/create">Ajouter un Cadeaux</Navbar.Brand>
          <Navbar.Brand href="/Gifts/reserved">Reserver un Cadeaux</Navbar.Brand>
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
          {state.giftList.map((gift, index) => (
            <div key={gift.id} className="gift-summary" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <h3>Cadeau n° {index}</h3>
              <ul>
                <li><strong>Titre : </strong> {gift.title}</li>
                <li><strong>Auteur : </strong> {gift.owner} </li>
                <li><strong>Créé le : </strong> {formatDate(gift.created_at)} </li>
                <li><strong>En cours : </strong> {gift.is_active ? "Oui" : "Non"}</li>
              </ul>
              <Button variant="primary">Modifier</Button>
              <Button variant="secondary">Supprimer</Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GiftListActive;
