const request = require('supertest');
const { app } = require('../index'); // Assurez-vous d'importer votre application Express

describe('Gift Routes Tests', () => {
  test('GET /api/gifts - Status 200', async () => {
    const response = await request(app).get('/Gifts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.gift)).toBe(true);
    // Ajoutez d'autres assertions selon vos besoins
  });

  test('GET /api/gifts/:id - Status 200', async () => {
    const response = await request(app).get('/Gifts/1'); // Remplacez 1 par un ID valide
    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions selon vos besoins
  });

  test('GET /api/gifts/:id - Status 404', async () => {
    const response = await request(app).get('/Gifts/999'); // Fournissez un ID invalide
    expect(response.status).toBe(404);
    // Ajoutez d'autres assertions selon vos besoins
  });

  test('PATCH /api/gifts/update/:id - Status 200', async () => {
    const response = await request(app)
      .patch('/Gifts/update/1') // Remplacez 1 par un ID valide
      .send({ "name": "Montre", });
    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions selon vos besoins
  });

  test('PATCH /api/gifts/update/:id - Status 404', async () => {
    const response = await request(app)
      .patch('/Gifts/update/999') // Fournissez un ID invalide
      .send({ "name": "Téléphone", });
    expect(response.status).toBe(404);
    // Ajoutez d'autres assertions selon vos besoins
  });

  test('PATCH /api/gifts/reserved/:id - Status 200', async () => {
    const response = await request(app)
      .patch('/Gifts/reserved/8') // Remplacez 1 par un ID valide
      .send({  "reserved": 1 });
    expect(response.status).toBe(200);
    // Ajoutez d'autres assertions selon vos besoins
  });

  describe('Gift Routes Tests', () => {
    let giftIdToDelete; // Variable pour stocker l'ID du cadeau à supprimer
  
    beforeAll(async () => {
      // Créez une entrée de cadeau dans la base de données
      const createdGiftResponse = await request(app)
        .post('/Gifts/create')
        .send({
          "list_id": 3,
          "name": "Cadeau de test",
          "price": "50",
          "original_price": "70.00",
          "reserved": 0
        });
      giftIdToDelete = createdGiftResponse.body.id; // Récupérez l'ID du cadeau créé
    });
  
    afterAll(async () => {
      // Supprimez le cadeau créé après les tests
      await request(app).delete(`/Gifts/${giftIdToDelete}`);
    });
  
    test('DELETE /api/gifts/:id - Status 200', async () => {
      const response = await request(app)
        .delete(`/Gifts/${giftIdToDelete}`);
      expect(response.status).toBe(200);
      // Ajoutez d'autres assertions selon vos besoins
    });
  
    // Ajoutez d'autres tests pour les autres routes
  });

  test('DELETE /api/gifts/:id - Status 404', async () => {
    const response = await request(app)
      .delete('/Gifts/70'); // Fournissez un ID invalide
    expect(response.status).toBe(404);
    // Ajoutez d'autres assertions selon vos besoins
  });

  // Ajoutez d'autres tests pour les autres routes

});
