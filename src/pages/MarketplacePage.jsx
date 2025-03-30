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

function MarketplacePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/emprendimientos") // Ajusta la URL según tu backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los emprendimientos:", error);
      });
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Mercado Virtual Campesino
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.idemprendimiento} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${product.imagen_emprendimiento}`} // Si la imagen está en base64
                alt={product.nombre}
                sx={{ height: 200 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.descripcion}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Región ID:</strong> {product.idregiones}
                </Typography>
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
