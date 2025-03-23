// src/pages/MarketplacePage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { productsData } from "../data/productoData"; // Asegúrate que la ruta sea correcta

function MarketplacePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulación de carga de productos.
    setProducts(productsData);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Mercado Virtual Campesino
      </Typography>

      {/* Aquí podrías agregar una barra de búsqueda o filtros */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {/* Ejemplo: <TextField label="Buscar producto" variant="outlined" /> */}
      </Box>
      {/* Botón para volver al inicio */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="secondary" size="large">
            Volver al Inicio
          </Button>
        </Link>
      </Box>
      //SALTO DE LINEA
      <br></br>
      

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 200 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Región:</strong> {product.region}
                </Typography>
                {product.offer ? (
                  <Typography variant="body1" color="green">
                    <strong>Oferta:</strong> {product.offer}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    <strong>Precio:</strong> ${product.price}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small">
                  Contactar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón para volver al inicio */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="secondary" size="large">
            Volver al Inicio
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default MarketplacePage;



// Esta parte del codigo nos puede servi para agregar productos a la base de datos
// una vez que el backend este listo
/* 
// src/pages/Marketplace.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
} from "@mui/material";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // PLACEHOLDER: Petición al backend
    // Cuando tu backend esté listo, reemplaza la URL con la real:
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        setProducts(response.data); // asumiendo que response.data es un array de productos
      })
      .catch((error) => {
        console.error("Error al obtener productos del backend:", error);
      });
  }, []);

  // Filtra según el texto de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Mercado Virtual Campesino
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <TextField
          label="Buscar producto"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Región:</strong> {product.region}
                </Typography>
                {product.offer ? (
                  <Typography variant="body1" color="green">
                    <strong>Oferta:</strong> {product.offer}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    <strong>Precio:</strong> ${product.price}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Contactar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Marketplace;

*/