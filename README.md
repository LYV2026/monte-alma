# 🌿 Monte Alma — Tienda Online

> Tu dosis diaria de pura vida  
> Productos macrobióticos y suplementos naturales · Costa Rica

---

## 🚀 Cómo correr el proyecto localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Abrir en el navegador
http://localhost:3000
```

---

## ☁️ Cómo desplegar en Vercel

1. Subí el proyecto a **GitHub** (podés usar GitHub Desktop o la CLI)
2. Andá a [vercel.com](https://vercel.com) → **Add New Project**
3. Importá tu repositorio de GitHub
4. Vercel detecta automáticamente Next.js — no cambiés nada
5. Clic en **Deploy** ✓

¡Listo! Tu sitio estará en línea en minutos.

---

## 📁 Estructura del proyecto

```
monte-alma/
├── app/
│   ├── page.tsx              # Página de inicio (Home)
│   ├── tienda/page.tsx       # Tienda con filtros
│   ├── tienda/[slug]/page.tsx # Detalle de producto
│   ├── carrito/page.tsx      # Carrito + pedido WhatsApp
│   ├── nosotros/page.tsx     # Página nosotros
│   └── contacto/page.tsx     # Contacto
├── components/
│   ├── Header.tsx            # Header fijo con carrito
│   ├── Footer.tsx            # Footer completo
│   ├── CartProvider.tsx      # Context del carrito (localStorage)
│   ├── CartDrawer.tsx        # Panel lateral del carrito
│   ├── ProductCard.tsx       # Tarjeta de producto
│   ├── ProductFilters.tsx    # Filtros (marca, categoría, precio, necesidad)
│   ├── AddToCartButton.tsx   # Botón agregar al carrito
│   └── WhatsAppButton.tsx    # Botón flotante WhatsApp
├── data/
│   └── products.ts           # ← AQUÍ SE EDITAN LOS PRODUCTOS
├── lib/
│   ├── cart.ts               # Lógica del carrito (localStorage)
│   ├── whatsapp.ts           # Generación de mensajes WhatsApp
│   ├── filters.ts            # Lógica de filtros
│   └── utils.ts              # Utilidades (formatCRC, etc.)
└── public/
    ├── brand/                # Logos y brand assets
    └── products/             # Imágenes de productos
```

---

## ✏️ Cómo editar productos

Abrí el archivo **`/data/products.ts`** y editá cualquier producto:

```typescript
{
  id: 'ajo-negro',            // ID único (sin espacios ni tildes)
  slug: 'ajo-negro',          // URL: /tienda/ajo-negro
  name: 'Ajo Negro',          // Nombre visible
  brand: 'Green Labs',        // Marca (Green Labs | Dr. Vek | Best Life)
  category: 'Bienestar diario', // Categoría principal
  needs: ['Bienestar diario', 'Antioxidantes'], // Para filtro "¿Qué buscás?"
  priceCRC: 12900,            // Precio en colones (número sin ₡ ni puntos)
  shortDescription: '...',    // Descripción corta (tarjeta)
  longDescription: '...',     // Descripción larga (página de detalle)
  benefits: ['...', '...'],   // Lista de beneficios
  usage: '...',               // Modo de uso
  warnings: '...',            // Advertencias
  image: '/products/ajo-negro.jpg', // Ruta de imagen en /public/products/
  featured: true,             // ¿Aparece en destacados del home?
}
```

### Para agregar un nuevo producto:
1. Copiá y pegá un objeto producto existente
2. Cambiá todos los campos
3. Agregá la imagen en `/public/products/nombre-producto.jpg`
4. Guardá — ¡aparece automáticamente en la tienda!

---

## 🖼️ Cómo cambiar imágenes

Todas las imágenes van en:
- `/public/brand/` → logos y branding
- `/public/products/` → imágenes de productos

**Tamaño recomendado:** 800×800 px mínimo, formato `.jpg` o `.webp`

Para cambiar la imagen de un producto:
1. Copiá tu imagen nueva a `/public/products/`
2. Actualizá el campo `image: '/products/tu-imagen.jpg'` en `data/products.ts`

---

## 📱 Carrito y WhatsApp

El carrito funciona con `localStorage` (persiste al refrescar).

Al hacer clic en "Enviar pedido por WhatsApp", genera un mensaje como:

```
¡Hola Monte Alma! 🌿 Quiero realizar este pedido:

• Ajo Negro x2 — ₡25.800
• Moringa x1 — ₡8.500

*Subtotal: ₡34.300*

👤 Nombre: María García
📍 Ubicación: San José
📝 Observaciones: Alergias a la soya

Quedo pendiente para coordinar entrega y pago. ¡Gracias!
```

Y redirige a: `https://wa.me/50672952666?text=[mensaje_codificado]`

Para cambiar el número de WhatsApp, editá `/lib/whatsapp.ts`:
```typescript
const WA_NUMBER = '50672952666' // ← cambiá aquí
```

---

## 🎨 Colores de la marca

Editá los colores en `tailwind.config.js`:

```js
colors: {
  brand: {
    green: '#2F5D3A',      // Verde profundo
    sage: '#91A68A',       // Verde salvia
    beige: '#F4EFE6',      // Beige claro
    ivory: '#FAF8F2',      // Marfil
    charcoal: '#1A1A1A',   // Carbón
    gold: '#C6A25A',       // Dorado suave
  }
}
```

---

## 🔧 Para agregar nuevas marcas (Dr. Clark, Best Life, etc.)

En `/data/products.ts`:

```typescript
// 1. Agregá la marca al array de BRANDS:
export const BRANDS = ['Green Labs', 'Dr. Vek', 'Best Life', 'Dr. Clark'] as const

// 2. Usá la marca en tus productos:
brand: 'Dr. Clark',
```

---

## 📞 Contacto del proyecto

- **Propietaria:** Yuliana Mora Jaen  
- **WhatsApp:** +506 7295-2666  
- **Correo:** montealma.cr@gmail.com  
- **Ubicación:** Tibás, San José, Costa Rica
