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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Rating
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/navBar/Navbar";
import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import FooterPage from "../components/footer/Footer";
import authService from "../services/authService";

function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idusuarios, setIdusuarios] = useState(null);

  useEffect(() => {
    // Verificar autenticación usando el servicio
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsLoggedIn(authenticated);
      
      // Obtener usuario actual
      if (authenticated) {
        const user = authService.getCurrentUser();
        if (user && user.idUsuario) {
          setIdusuarios(user.idUsuario);
        }
      }
    };
    
    checkAuth();
    
    // Volver a verificar cuando el localStorage cambie
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/emprendimientos")
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

  const handleOpen = (product) => {
    // Verificar si el usuario está autenticado antes de permitir comentar
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }
    
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment("");
    setRating(0);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim() || !rating || !idusuarios) {
      console.error("Faltan datos para enviar el comentario", { comment, rating, idusuarios });
      return;
    }

    const currentDate = new Date().toISOString();

    const newComment = {
      idemprendimiento: selectedProduct?.idemprendimiento,
      comentario: comment,
      calificacion: rating,
      fecha_comentario: currentDate,
      fecha_registro: currentDate,
      idusuarios: idusuarios
    };

    fetch("http://localhost:8080/comentariosYCalificaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el comentario");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Comentario guardado:", data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error al guardar el comentario:", error);
      });
  };

  return (
    <div>
      {/* Mostramos la barra correspondiente */}
      {isLoggedIn ? <NavBarUsuario /> : <NavBar />}
      
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
                  image={product.imagen_emprendimiento ? `data:image/jpeg;base64,${product.imagen_emprendimiento}` : "https://via.placeholder.com/200"}
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
                  <Button variant="contained" color="primary" size="small" onClick={() => handleOpen(product)}>
                    Añadir comentario
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" size="large">
              Volver al Inicio
            </Button>
          </Link>
        </Box>

        {/* Modal para añadir comentario */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Añadir Comentario</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedProduct?.nombre}</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Comentario"
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Rating
              name="calificacion"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCommentSubmit} color="primary" variant="contained">
              Enviar Comentario
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      
      <FooterPage />
    </div>
  );
}

export default MarketplacePage;